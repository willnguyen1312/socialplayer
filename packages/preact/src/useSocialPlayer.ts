import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { useEffect } from "preact/hooks"
import { proxy, useSnapshot } from "valtio"

type CreatePlayer = typeof createPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: SocialPlayerState
    playbackActions: SocialPlayerActions
    activate: () => void
  }
  use: PluginFunc
}

const playbackStateMaster = new Map<string, SocialPlayerState>()
const playbackInstanceMap = new Map<string, ReturnType<CreatePlayer>>()

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  if (!playbackInstanceMap.has(arg.id)) {
    const playbackInstance = createPlayer(arg)
    playbackInstanceMap.set(arg.id, playbackInstance)
    playbackStateMaster.set(arg.id, proxy(playbackInstance.getState()))

    playbackInstance.subscribe(({ updatedProperties }) => {
      const playbackState = playbackStateMaster.get(arg.id) as SocialPlayerState
      for (const key in updatedProperties) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        playbackState[key] = updatedProperties[key]
      }
    })
  }

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

  useEffect(() => {
    return () => {
      playbackInstanceMap.get(arg.id)?.cleanup()
    }
  }, [])

  const playbackState = useSnapshot(playbackStateMaster.get(arg.id) as SocialPlayerState)

  return {
    playbackState,
    activate,
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
