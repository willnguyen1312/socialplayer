import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { onDestroy } from "svelte"
import { writable } from "svelte/store"

type CreatePlayer = typeof createPlayer

type PlaybackStateSubscriber = ReturnType<typeof writable>["subscribe"]

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: {
      subscribe: PlaybackStateSubscriber
    }
    playbackActions: SocialPlayerActions
  }
  use: PluginFunc
}

const playbackStateMaster = new Map<string, PlaybackStateSubscriber>()
const playbackInstanceMap = new Map<string, ReturnType<CreatePlayer>>()

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  if (!playbackInstanceMap.has(arg.id)) {
    const playbackInstance = createPlayer(arg)
    playbackInstanceMap.set(arg.id, playbackInstance)

    const { subscribe, set } = writable<SocialPlayerState>(playbackInstance.getState())
    playbackStateMaster.set(arg.id, subscribe)

    playbackInstance.subscribe(({ state }) => {
      set(state)
    })
  }

  onDestroy(() => {
    playbackInstanceMap.get(arg.id)?.cleanup()
  })

  return {
    playbackState: {
      subscribe: playbackStateMaster.get(arg.id) as PlaybackStateSubscriber,
    },
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
