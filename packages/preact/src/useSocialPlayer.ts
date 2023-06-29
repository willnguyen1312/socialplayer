import { PluginFunc, SocialPlayerActions, createPlayer } from "@socialplayer/core"
import { useRef } from "preact/hooks"

type CreatePlayer = typeof createPlayer

type useSocialPlayerFunc = {
  (arg: Parameters<CreatePlayer>[0]): {
    playbackActions: SocialPlayerActions
  }
  use: PluginFunc
}

export const useSocialPlayer: useSocialPlayerFunc = (arg) => {
  const playbackInstanceRef = useRef<ReturnType<CreatePlayer>>()

  if (playbackInstanceRef.current) {
    playbackInstanceRef.current = createPlayer(arg)
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    playbackActions: playbackInstanceRef.current!.playbackActions,
  }
}

useSocialPlayer.use = createPlayer.use
