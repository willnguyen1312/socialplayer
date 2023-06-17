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
    loadWistiaUrl: LoadFunction
  }
}

declare global {
  interface Window {
    _wq: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      push: (arg: any) => void
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type WistiaPluginConfig = {
  // Nothing yet
}

export const wistiaPlugin: Plugin<WistiaPluginConfig> = {
  install({ store }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadWistiaUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://fast.wistia.com/assets/external/E-v1.js")

      const videoId = source.split("/")[source.split("/").length - 1]

      const className = `wistia_embed wistia_async_${videoId}`
      videoContainer.classList.add(...className.split(" "))

      window._wq.push({
        id,
        onReady: (video: HTMLVideoElement) => {
          console.log("I got a handle to the video!", video)
        },
      })

      // const player = new window.playerjs.Player(iframe)

      // player.on("ready", () => {
      //   player.on("play", () => {
      //     player.getDuration((duration: number) => console.log(duration))
      //     console.log("play")
      //   })
      // })
    }

    return {
      loadWistiaUrl,
    }
  },
}
