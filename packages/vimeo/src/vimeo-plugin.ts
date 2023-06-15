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
    loadVimeoUrl: LoadFunction
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Vimeo: any
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

export type vimeoPluginConfig = {
  // appId: string
}

export const vimeoPlugin: Plugin<vimeoPluginConfig> = {
  install({ store, onCleanup }) {
    store.setState(createDefaultState())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadVimeoUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
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

    onCleanup

    return {
      loadVimeoUrl,
    }
  },
}
