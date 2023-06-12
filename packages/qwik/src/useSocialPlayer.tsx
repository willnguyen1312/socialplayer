import { $, noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik"
import { Plugin, PluginFunc, SocialPlayerActions, SocialPlayerState, createPlayer } from "@socialplayer/core"

type CreatePlayer = typeof createPlayer

type UsePlaybackFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackState: SocialPlayerState
    playbackActions: SocialPlayerActions
    activate: () => void
    use: PluginFunc
  }
}

const playbackInstanceMap = new Map<string, ReturnType<CreatePlayer>>()

export const usePlayback: UsePlaybackFunc = (arg) => {
  const playbackState = useStore<SocialPlayerState>({} as SocialPlayerState)
  const playbackActionsRef: { value: SocialPlayerActions } = { value: {} as SocialPlayerActions }

  const activate = $(() => {
    const playbackInstance = playbackInstanceMap.get(arg.id) ?? createPlayer(arg)
    playbackInstance.activate()
    playbackInstance.onCleanup(() => {
      playbackInstanceMap.delete(arg.id)
    })
    Object.assign(playbackActionsRef.value, playbackInstance.playbackActions)

    playbackInstance.onCleanup(() => {
      playbackInstanceMap.delete(arg.id)
    })

    const currentState = playbackInstance.getState()
    for (const key in currentState) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      playbackState[key] = currentState[key]
    }

    playbackInstance.subscribe(({ updatedProperties }) => {
      for (const key in updatedProperties) {
        // These two are special cases because they are objects that are not serializable
        if (["textTracks", "buffered", "levels"].includes(key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          playbackState[key] = noSerialize(updatedProperties[key])
          continue
        }

        if (["subtitleTracks", "audioTracks"].includes(key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          playbackState[key] = updatedProperties[key].map((track) => ({
            id: track.id,
            lang: track.lang,
          }))
          continue
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        playbackState[key] = updatedProperties[key]
      }
    })

    if (!playbackInstanceMap.has(arg.id)) {
      playbackInstanceMap.set(arg.id, playbackInstance)
    }
  })

  const use: PluginFunc = $((plugin: Plugin) => {
    const playbackInstance = playbackInstanceMap.get(arg.id) ?? createPlayer(arg)
    const result = playbackInstance.use(plugin)
    Object.assign(playbackActionsRef.value, result)
  })

  useVisibleTask$(() => {
    activate()
  })

  return {
    playbackState,
    activate,
    playbackActions: playbackActionsRef.value,
    use,
  }
}
