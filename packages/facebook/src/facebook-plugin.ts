/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadScript } from "@namnode/utils"
import { Plugin } from "@socialplayer/core"

type LoadFunction = (arg: { source: string }) => void

declare module "@socialplayer/core" {
  export interface CustomSocialPlayerActions {
    loadFacebookUrl: LoadFunction
  }
}

declare global {
  interface Window {
    FB: {
      init(arg: { appId: string; xfbml: boolean; version: string }): void
    }
  }
}

export type FacebookPluginConfig = {
  appId: string
}

export const facebookPlugin: Plugin<FacebookPluginConfig> = {
  // eslint-disable-next-line no-empty-pattern
  install({}, config) {
    const loadFacebookUrl: any = async ({ id, source }: { id: string; source: string }) => {
      const socialPlayerContainer = document.getElementById(id) as HTMLElement
      socialPlayerContainer.classList.add("fb-video")
      socialPlayerContainer.dataset.href = source

      await loadScript("https://connect.facebook.net/en_US/sdk.js")
      window.FB.init({
        appId: config.appId,
        xfbml: true,
        version: "v3.3",
      })
    }

    return {
      loadFacebookUrl,
    }
  },
}
