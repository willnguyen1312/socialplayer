import { PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"
import { onUnmounted, reactive } from "vue"

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

    const playbackState = reactive(playbackInstance.getState())
    playbackStateMaster.set(arg.id, playbackState)

    playbackInstance.subscribe(({ updatedProperties }) => {
      for (const key in updatedProperties) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        playbackState[key] = updatedProperties[key]
      }
    })
  }

  onUnmounted(() => {
    playbackInstanceMap.get(arg.id)?.cleanup()
  })

  return {
    playbackState: playbackStateMaster.get(arg.id) as SocialPlayerState,
    playbackActions: (playbackInstanceMap.get(arg.id) as ReturnType<CreatePlayer>).playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
