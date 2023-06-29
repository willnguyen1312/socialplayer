/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
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

export const youtubePlugin: Plugin = {
  install() {
    const loadYoutubeUrl: any = async ({ id, source }: { id: string; source: string }) => {
      await loadScript("https://www.youtube.com/iframe_api")

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = function () {
          const videoMatch = source.match(/(youtu\.be\/|\/v\/|v=|embed\/|watch\?v=|&v=)([^#&?]*)/)

          if (!videoMatch) return

          const videoId = videoMatch[2]

          new window.YT.Player(id, {
            videoId,
            playerVars: {
              playsinline: 1,
            },
          })
        }
      } else {
        window.onYouTubeIframeAPIReady()
      }
    }

    return {
      loadYoutubeUrl,
    }
  },
}
