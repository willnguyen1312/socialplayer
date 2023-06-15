import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

interface _CustomSocialPlayerState {
  paused: HTMLVideoElement["paused"]
  currentTime: HTMLVideoElement["currentTime"]
  muted: HTMLVideoElement["muted"]
  volume: HTMLVideoElement["volume"]
  duration: HTMLVideoElement["duration"]
}

declare module "@socialplayer/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomSocialPlayerState {}

  export interface CustomSocialPlayerActions {
    loadYoutubeUrl: LoadFunction
  }
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Player: any
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {
    paused: true,
    currentTime: 0,
    muted: false,
    volume: 1,
    duration: 0,
  }
}

export type YoutubePluginConfig = {
  // appId: string
}

export const youtubePlugin: Plugin<YoutubePluginConfig> = {
  install({ store, onCleanup }) {
    store.setState(createDefaultState())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadYoutubeUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())

      await loadScript("https://www.youtube.com/iframe_api")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      // let player: any

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = function () {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const player = new window.YT.Player(id, {
            videoId: source,
            playerVars: {
              playsinline: 1,
            },
          })
        }
      } else {
        window.onYouTubeIframeAPIReady()
      }

      onCleanup(id, () => {
        // player.destroy()
      })
    }

    onCleanup

    return {
      loadYoutubeUrl,
    }
  },
}
