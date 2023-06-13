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

async function loadScript(url: string) {
  return new Promise<void>(function (resolve, reject) {
    const scriptElement = document.createElement("script")
    scriptElement.src = url

    scriptElement.onload = function () {
      resolve()
    }

    scriptElement.onerror = function () {
      reject(new Error("Failed to loadYoutubeUrl script: " + url))
    }

    document.head.appendChild(scriptElement)
  })
}

export const youtubePlugin: Plugin<YoutubePluginConfig> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  install({ store, onCleanup }) {
    store.setState(createDefaultState())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadYoutubeUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())

      await loadScript("https://www.youtube.com/iframe_api")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let player: any
      window.onYouTubeIframeAPIReady = function () {
        player = new window.YT.Player(id, {
          videoId: source,
          playerVars: {
            playsinline: 1,
          },
        })
      }

      onCleanup(id, () => {
        player.destroy()
      })
    }

    onCleanup

    return {
      loadYoutubeUrl,
    }
  },
}
