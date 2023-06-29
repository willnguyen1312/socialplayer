/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadSoundcloudUrl: LoadFunction
  }
}

declare global {
  interface Window {
    SC: {
      Widget: any
    }
  }
}

export const soundcloudPlugin: Plugin = {
  install() {
    const loadSoundcloudUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://w.soundcloud.com/player/api.js")

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}`
      videoContainer.replaceChildren(iframe)
    }

    return {
      loadSoundcloudUrl,
    }
  },
}
