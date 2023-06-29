/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadMixcloudUrl: LoadFunction
  }
}

declare global {
  interface Window {
    Mixcloud: {
      PlayerWidget: any
    }
  }
}

export const mixcloudPlugin: Plugin = {
  install() {
    const loadMixcloudUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const videoContainer = document.getElementById(id) as HTMLDivElement
      await loadScript("https://widget.mixcloud.com/media/js/widgetApi.js")
      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      const videoId = source.split("mixcloud.com")[1]
      iframe.src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${videoId}`
      videoContainer.replaceChildren(iframe)
    }

    return {
      loadMixcloudUrl,
    }
  },
}
