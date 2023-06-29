import { PluginFunc, SocialPlayerActions, createPlayer } from "@socialplayer/core"

type CreatePlayer = typeof createPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackActions: SocialPlayerActions
  }
  use: PluginFunc
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const { playbackActions } = createPlayer(arg)

  return {
    playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
