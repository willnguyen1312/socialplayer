import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { useEffect } from "react"
import { proxy, useSnapshot } from "valtio"

type CreatePlayer = typeof createPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: SocialPlayerState
    playbackActions: SocialPlayerActions
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

  useEffect(() => {
    return () => {
      playbackInstanceMap.get(arg.id)?.cleanup()
    }
  }, [])

  const playbackState = useSnapshot(playbackStateMaster.get(arg.id) as SocialPlayerState)

  return {
    playbackState,
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
