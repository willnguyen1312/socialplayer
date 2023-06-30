/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomSocialPlayerState {}

  export interface CustomSocialPlayerActions {
    loadWistiaUrl: LoadFunction
  }
}

declare global {
  interface Window {
    _wq: {
      push: (arg: any) => void
    }
  }
}

export const wistiaPlugin: Plugin = {
  install() {
    const loadWistiaUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const videoContainer = document.getElementById(id) as HTMLDivElement
      await loadScript("https://fast.wistia.com/assets/external/E-v1.js")
      const videoId = source.split("/")[source.split("/").length - 1]
      const className = `wistia_embed wistia_async_${videoId}`
      videoContainer.classList.add(...className.split(" "))
      window._wq.push({
        id,
      })
    }

    return {
      loadWistiaUrl,
    }
  },
}
