import { $ } from "@builder.io/qwik"
import { Plugin, PluginFunc, SocialPlayerActions, createSocialPlayer } from "@socialplayer/core"

type CreateSocialPlayer = typeof createSocialPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreateSocialPlayer>[0]): {
    playbackActions: SocialPlayerActions
    use: PluginFunc
  }
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const playbackActionsRef: { value: SocialPlayerActions } = { value: {} as SocialPlayerActions }

  const use: PluginFunc = $((plugin: Plugin, options = {}) => {
    const { use } = createSocialPlayer(arg)
    const result = use(plugin, options)
    Object.assign(playbackActionsRef.value, result)
  })

  return {
    playbackActions: playbackActionsRef.value,
    use,
  }
}
