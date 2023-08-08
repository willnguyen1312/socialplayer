/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { videoId: string }) => void

declare module "@socialplayer/core" {
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

export type DailymotionPluginConfig = {
  playerId: string
}

export const dailymotionPlugin: Plugin<DailymotionPluginConfig> = {
  // eslint-disable-next-line no-empty-pattern
  install({}, config) {
    const loadDailymotionUrl: any = async ({ id, videoId }: { id: string; videoId: string }) => {
      await loadScript(`https://geo.dailymotion.com/libs/player/${config.playerId}.js`)

      window.dailymotion.createPlayer(id, {
        video: videoId,
      })
    }

    return {
      loadDailymotionUrl,
    }
  },
}
