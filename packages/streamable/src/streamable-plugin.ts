/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadStreamableUrl: LoadFunction
  }
}

declare global {
  interface Window {
    playerjs: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Player: any
    }
  }
}

export const streamablePlugin: Plugin = {
  install() {
    const loadStreamableUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://cdn.embed.ly/player-0.1.0.min.js")

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.src = `https://streamable.com/o/${source}`
      videoContainer.replaceChildren(iframe)
    }

    return {
      loadStreamableUrl,
    }
  },
}
