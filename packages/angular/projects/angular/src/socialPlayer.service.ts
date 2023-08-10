import { Injectable } from "@angular/core"
import { createSocialPlayer } from "@socialplayer/core"

@Injectable()
export class ZoomImageClickService {
  static use = createSocialPlayer.use

  private playbackInstance?: ReturnType<typeof createSocialPlayer>

  createSocialPlayer = (arg: Parameters<typeof createSocialPlayer>[0]) => {
    this.playbackInstance = this.playbackInstance ?? createSocialPlayer(arg)

    return this.createSocialPlayer
  }
}
