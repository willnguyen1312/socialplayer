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
    loadSoundcloudUrl: LoadFunction
  }
}

declare global {
  interface Window {
    SC: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Widget: any
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type SoundcloudPluginConfig = {
  // Nothing yet
}

export const soundcloudPlugin: Plugin<SoundcloudPluginConfig> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  install({ store }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadSoundcloudUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://w.soundcloud.com/player/api.js")

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}`
      iframe.allow = "autoplay"
      videoContainer.replaceChildren(iframe)

      // const player = window.SC.Widget(iframe)
      // player.load(source, {
      //   callback: () => {
      //     player.getDuration((duration: number) => {
      //       console.log("duration", duration)
      //     })
      //   },
      // })
    }

    return {
      loadSoundcloudUrl,
    }
  },
}
