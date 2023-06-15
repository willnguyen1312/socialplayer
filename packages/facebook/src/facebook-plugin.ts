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
    loadFacebookUrl: LoadFunction
  }
}

declare global {
  interface Window {
    FB: {
      init(arg: { appId: string; xfbml: boolean; version: string }): void
      Event: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        subscribe: any
      }
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

export type FacebookPluginConfig = {
  appId: string
}

export const facebookPlugin: Plugin<FacebookPluginConfig> = {
  install({ store }, config) {
    store.setState(createDefaultState())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadFacebookUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const socialPlayerContainer = document.getElementById(id) as HTMLElement
      socialPlayerContainer.classList.add("fb-video")
      socialPlayerContainer.dataset.href = source
      // socialPlayerContainer.dataset.width = "100%"
      // socialPlayerContainer.dataset.height = "100%"

      store.setState(createDefaultState())

      await loadScript("https://connect.facebook.net/en_US/sdk.js")
      window.FB.init({
        appId: config.appId,
        xfbml: true,
        version: "v3.3",
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      window.FB.Event.subscribe("xfbml.ready", (msg: any) => {
        // const player = msg.instance
      })
    }

    return {
      loadFacebookUrl,
    }
  },
}
