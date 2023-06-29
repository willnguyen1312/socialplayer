import { $ } from "@builder.io/qwik"
import { Plugin, PluginFunc, SocialPlayerActions, createPlayer } from "@socialplayer/core"

type CreatePlayer = typeof createPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackActions: SocialPlayerActions

    use: PluginFunc
  }
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const playbackActionsRef: { value: SocialPlayerActions } = { value: {} as SocialPlayerActions }

  const use: PluginFunc = $((plugin: Plugin) => {
    const { use } = createPlayer(arg)
    const result = use(plugin)
    Object.assign(playbackActionsRef.value, result)
  })

  return {
    playbackActions: playbackActionsRef.value,
    use,
  }
}
