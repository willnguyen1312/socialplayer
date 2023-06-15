import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface _CustomSocialPlayerState {
  // Nothing yet
}

declare module "@socialplayer/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomSocialPlayerState {}

  export interface CustomSocialPlayerActions {
    loadTwitchUrl: LoadFunction
  }
}

declare global {
  interface Window {
    Twitch: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Player: any
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type TwitchPluginConfig = {
  // Nothing yet
}

export const twitchPlugin: Plugin<TwitchPluginConfig> = {
  install({ store }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadTwitchUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
      // const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://player.twitch.tv/js/embed/v1.js")

      const isVideo = source.includes("videos")
      const url = source.split("/")[source.split("/").length - 1]

      // const player = new window.Twitch.Player(id, {
      new window.Twitch.Player(id, {
        video: isVideo ? url : "",
        channel: isVideo ? "" : url,
        height: "100%",
        width: "100%",
        controls: true,
        autoplay: false,
      })

      // const { READY, PLAYING, PAUSE, ENDED, ONLINE, OFFLINE, SEEK, PLAY } = window.Twitch.Player

      // ;(window as any).player = player

      // player.addEventListener(READY, async () => {
      //   console.log("READY")
      //   await sleep(0)
      //   console.log(player.getDuration())
      // })
    }

    return {
      loadTwitchUrl,
    }
  },
}
