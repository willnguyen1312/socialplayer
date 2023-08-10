import { Injectable } from "@angular/core"
import { createSocialPlayer } from "@socialplayer/core"

@Injectable()
export class SocialPlayerService {
  static use = createSocialPlayer.use

  private playbackInstanceLookup = new Map<string, ReturnType<typeof createSocialPlayer>>()

  createSocialPlayer = (arg: Parameters<typeof createSocialPlayer>[0]) => {
    const playbackInstance = this.playbackInstanceLookup.get(arg.id) ?? createSocialPlayer(arg)
    this.playbackInstanceLookup.set(arg.id, playbackInstance)
    return playbackInstance
  }
}
