/* eslint-disable @typescript-eslint/no-explicit-any */
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
    loadVidyardUrl: LoadFunction
  }
}

declare global {
  interface Window {
    onVidyardAPI: any
    Vidyard: any
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

export type VidyardPluginConfig = {
  // appId: string
}

export const vidyardPlugin: Plugin<VidyardPluginConfig> = {
  install({ store, onCleanup }) {
    store.setState(createDefaultState())

    const loadVidyardUrl: any = async ({ id, source }: { id: string; source: string }) => {
      store.setState(createDefaultState())

      const videoId = source.split("/")[source.split("/").length - 1]

      const container = document.getElementById(id) as HTMLElement

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let player: any

      window.onVidyardAPI = (Vidyard: any) => {
        Vidyard.api.addReadyListener((_: any, _player: any) => {
          player = _player
        }, videoId)

        Vidyard.api.renderPlayer({
          uuid: videoId,
          container,
        })
      }

      await loadScript("https://play.vidyard.com/embed/v4.js")

      onCleanup(id, () => {
        // Nothing yet
      })
    }

    return {
      loadVidyardUrl,
    }
  },
}
