import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { onDestroy } from "svelte"
import { writable } from "svelte/store"

type CreatePlayer = typeof createPlayer

type PlaybackStateSubscriber = ReturnType<typeof writable>["subscribe"]

type UsePlaybackFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: {
      subscribe: PlaybackStateSubscriber
    }
    playbackActions: SocialPlayerActions
    activate: () => void
  }
  use: PluginFunc
}

const playbackStateMaster = new Map<string, PlaybackStateSubscriber>()
const playbackInstanceMap = new Map<string, ReturnType<CreatePlayer>>()

export const usePlayback: UsePlaybackFunc = (arg) => {
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

  const activate = () => {
    const playbackInstance = playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>
    const isActivated = playbackInstance.activate()
    if (isActivated) {
      playbackInstance.onCleanup(() => {
        playbackStateMaster.delete(arg.id)
        playbackInstanceMap.delete(arg.id)
      })
    }
  }

  return {
    playbackState: {
      subscribe: playbackStateMaster.get(arg.id) as PlaybackStateSubscriber,
    },
    activate,
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

usePlayback.use = createPlayer.use
