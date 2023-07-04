import { PluginFunc, SocialPlayerActions, createSocialPlayer } from "@socialplayer/core"
import { useRef } from "preact/hooks"

type CreateSocialPlayer = typeof createSocialPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreateSocialPlayer>[0]): {
    playbackActions: SocialPlayerActions
  }
  use: PluginFunc
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const playbackInstanceRef = useRef<ReturnType<CreateSocialPlayer>>()

  if (!playbackInstanceRef.current) {
    playbackInstanceRef.current = createSocialPlayer(arg)
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    playbackActions: playbackInstanceRef.current!.playbackActions,
  }
}

useSocialPlayer.use = createSocialPlayer.use
