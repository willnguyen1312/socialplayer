/* eslint-disable @typescript-eslint/no-explicit-any */
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
    loadMixcloudUrl: LoadFunction
  }
}

declare global {
  interface Window {
    Mixcloud: {
      PlayerWidget: any
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type MixcloudPluginConfig = {
  // Nothing yet
}

export const mixcloudPlugin: Plugin<MixcloudPluginConfig> = {
  install({ store }) {
    const loadMixcloudUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())
      const videoContainer = document.getElementById(id) as HTMLDivElement

      await loadScript("https://widget.mixcloud.com/media/js/widgetApi.js")

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      const videoId = source.split("mixcloud.com")[1]

      iframe.src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${videoId}`
      videoContainer.replaceChildren(iframe)

      // const player = window.Mixcloud.PlayerWidget(iframe)
      // player.ready.then(() => {
      //   console.log("player ready")
      //   player.getDuration().then((duration: number) => {
      //     console.log("duration", duration)
      //   })
      // })
    }

    return {
      loadMixcloudUrl,
    }
  },
}
