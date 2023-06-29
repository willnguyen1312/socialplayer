/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadVidyardUrl: LoadFunction
  }
}

declare global {
  interface Window {
    onVidyardAPI: any
    Vidyard: any
  }
}

export const vidyardPlugin: Plugin = {
  install() {
    const loadVidyardUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const videoId = source.split("/")[source.split("/").length - 1]
      const container = document.getElementById(id) as HTMLElement
      window.onVidyardAPI = (Vidyard: any) => {
        Vidyard.api.renderPlayer({
          uuid: videoId,
          container,
        })
      }

      await loadScript("https://play.vidyard.com/embed/v4.js")
    }

    return {
      loadVidyardUrl,
    }
  },
}
