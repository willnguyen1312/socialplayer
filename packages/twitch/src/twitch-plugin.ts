/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadTwitchUrl: LoadFunction
  }
}

declare global {
  interface Window {
    Twitch: {
      Player: any
    }
  }
}

export const twitchPlugin: Plugin = {
  install() {
    const loadTwitchUrl: any = async ({ id, source }: { id: string; source: string }) => {
      await loadScript("https://player.twitch.tv/js/embed/v1.js")

      const isVideo = source.includes("videos")
      const url = source.split("/")[source.split("/").length - 1]

      new window.Twitch.Player(id, {
        video: isVideo ? url : "",
        channel: isVideo ? "" : url,
        height: "100%",
        width: "100%",
        controls: true,
        autoplay: false,
      })
    }

    return {
      loadTwitchUrl,
    }
  },
}
