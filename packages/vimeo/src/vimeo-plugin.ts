/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadVimeoUrl: LoadFunction
  }
}

declare global {
  interface Window {
    Vimeo: any
  }
}

export const vimeoPlugin: Plugin = {
  install() {
    const loadVimeoUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const container = document.getElementById(id) as HTMLElement
      await loadScript("https://player.vimeo.com/api/player.js")

      const player = new window.Vimeo.Player(container, {
        url: source,
        playsinline: true,
      })

      player.ready().then(() => {
        const iframe = container.querySelector("iframe") as HTMLIFrameElement
        iframe.style.width = "100%"
        iframe.style.height = "100%"
      })
    }

    return {
      loadVimeoUrl,
    }
  },
}
