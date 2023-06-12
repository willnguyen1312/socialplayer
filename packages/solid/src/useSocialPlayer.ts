import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { onCleanup } from "solid-js"
import { createStore, produce } from "solid-js/store"

type CreatePlayer = typeof createPlayer

type UsePlaybackFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: SocialPlayerState
    playbackActions: SocialPlayerActions
    activate: () => void
  }
  use: PluginFunc
}

const playbackStateMaster = new Map<string, SocialPlayerState>()
const playbackInstanceMap = new Map<string, ReturnType<CreatePlayer>>()

export const usePlayback: UsePlaybackFunc = (arg) => {
  if (!playbackInstanceMap.has(arg.id)) {
    const playbackInstance = createPlayer(arg)
    playbackInstanceMap.set(arg.id, playbackInstance)

    const [playbackState, setPlaybackState] = createStore(playbackInstance.getState())
    playbackStateMaster.set(arg.id, playbackState)

    playbackInstance.subscribe(({ updatedProperties }) => {
      setPlaybackState(
        produce((currentPlaybackState) => {
          for (const key in updatedProperties) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            currentPlaybackState[key] = updatedProperties[key]
          }
        }),
      )
    })
  }

  onCleanup(() => {
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
    playbackState: playbackStateMaster.get(arg.id) as SocialPlayerState,
    activate,
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

usePlayback.use = createPlayer.use
