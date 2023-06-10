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
    load: LoadFunction
  }
}

declare global {
  interface Window {
    FB: {
      init(arg: { appId: string; xfbml: boolean; version: string }): void
      Event: {
        subscribe: any
      }
    }
  }
}

// const activeHlsMap = new Map<string, Hls>()
const activeIdSourceMap = new Map<string, string>()

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

async function loadScript(url: string) {
  return new Promise<void>(function (resolve, reject) {
    const scriptElement = document.createElement("script")
    scriptElement.src = url

    scriptElement.onload = function () {
      resolve()
    }

    scriptElement.onerror = function () {
      reject(new Error("Failed to load script: " + url))
    }

    document.head.appendChild(scriptElement)
  })
}

export const facebookPlugin: Plugin<FacebookPluginConfig> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  install({ store, onCleanup }, config) {
    store.setState(createDefaultState())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const load: any = async ({ id, source }: { id: string; source: string }) => {
      if (activeIdSourceMap.get(id) === source) {
        return
      }

      const socialPlayerContainer = document.getElementById(id) as HTMLElement
      socialPlayerContainer.classList.add("fb-video")
      socialPlayerContainer.dataset.href = source

      store.setState(createDefaultState())

      await loadScript("https://connect.facebook.net/en_US/sdk.js")
      window.FB.init({
        appId: config.appId,
        xfbml: true,
        version: "v3.3",
      })

      window.FB.Event.subscribe("xfbml.ready", (msg: any) => {
        const player = msg.instance
      })

      activeIdSourceMap.set(id, source)

      onCleanup(id, () => {
        activeIdSourceMap.delete(id)
      })
    }

    return {
      load,
    }
  },
}
