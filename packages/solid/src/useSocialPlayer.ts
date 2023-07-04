import { PluginFunc, SocialPlayerActions, createSocialPlayer } from "@socialplayer/core"

type CreateSocialPlayer = typeof createSocialPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreateSocialPlayer>[0]): {
    playbackActions: SocialPlayerActions
  }
  use: PluginFunc
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const { playbackActions } = createSocialPlayer(arg)
  return {
    playbackActions,
  }
}

useSocialPlayer.use = createSocialPlayer.use
