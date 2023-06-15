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

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type StreamablePluginConfig = {
  // Nothing yet
}

export const streamablePlugin: Plugin<StreamablePluginConfig> = {
  install({ store }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadStreamableUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://cdn.embed.ly/player-0.1.0.min.js")

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.src = `https://streamable.com/o/${source}`
      videoContainer.replaceChildren(iframe)

      // const player = new window.playerjs.Player(iframe)

      // player.on("ready", () => {
      //   player.on("play", () => {
      //     player.getDuration((duration: number) => console.log(duration))
      //     console.log("play")
      //   })
      // })
    }

    return {
      loadStreamableUrl,
    }
  },
}
