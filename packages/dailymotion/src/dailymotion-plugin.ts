/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { videoId: string }) => void

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface _CustomSocialPlayerState {
  // Nothing yet
}

declare module "@socialplayer/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomSocialPlayerState {}

  export interface CustomSocialPlayerActions {
    loadDailymotionUrl: LoadFunction
  }
}

declare global {
  interface Window {
    dailymotion: {
      createPlayer: any
    }
  }
}

const createDefaultState = (): _CustomSocialPlayerState => {
  return {}
}

export type DailymotionPluginConfig = {
  playerId: string
}

export const dailymotionPlugin: Plugin<DailymotionPluginConfig> = {
  install({ store }, config) {
    store.setState(createDefaultState())

    const loadDailymotionUrl: any = async ({ id, videoId }: { id: string; videoId: string }) => {
      await loadScript(`https://geo.dailymotion.com/libs/player/${config.playerId}.js`)

      // let player: any

      window.dailymotion.createPlayer(id, {
        video: videoId,
      })
      //   .then((_player: any) => {
      //     console.log(_player)
      //     player = _player
      //     ;(window as any).player = player
      //   })
    }

    return {
      loadDailymotionUrl,
    }
  },
}
