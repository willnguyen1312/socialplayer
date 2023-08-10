import { AfterViewInit, Component } from "@angular/core"
import { SocialPlayerService } from "@socialplayer/angular-plugin"
import { dailymotionPlugin } from "@socialplayer/dailymotion-plugin"
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { mixcloudPlugin } from "@socialplayer/mixcloud-plugin"
import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
import { streamablePlugin } from "@socialplayer/streamable-plugin"
import { twitchPlugin } from "@socialplayer/twitch-plugin"
import { vidyardPlugin } from "@socialplayer/vidyard-plugin"
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { wistiaPlugin } from "@socialplayer/wistia-plugin"
import { youtubePlugin } from "@socialplayer/youtube-plugin"

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

SocialPlayerService.use(facebookPlugin, {
  appId: "1309697205772819",
})
SocialPlayerService.use(youtubePlugin)
SocialPlayerService.use(vimeoPlugin)
SocialPlayerService.use(soundcloudPlugin)
SocialPlayerService.use(streamablePlugin)
SocialPlayerService.use(twitchPlugin)
SocialPlayerService.use(vidyardPlugin)
SocialPlayerService.use(mixcloudPlugin)
SocialPlayerService.use(wistiaPlugin)
SocialPlayerService.use(dailymotionPlugin, { playerId: "xfpfw" })

type SocialPlayerName =
  | "facebook"
  | "youtube"
  | "vimeo"
  | "soundcloud"
  | "streamable"
  | "twitch"
  | "wistia"
  | "vidyard"
  | "mixcloud"
  | "dailymotion"

type SourceItem = {
  name: SocialPlayerName
  source: string
}

const sources: SourceItem[] = [
  {
    name: "facebook",
    source: "https://www.facebook.com/facebook/videos/3138286969730016",
  },
  {
    name: "youtube",
    source: "https://www.youtube.com/watch?v=WZKW2Hq2fks",
  },
  {
    name: "vimeo",
    source: "https://vimeo.com/365531165",
  },
  {
    name: "soundcloud",
    source: "https://soundcloud.com/ahmed-gado-1/im-coming-home-skylar-grey",
  },
  {
    name: "streamable",
    source: "4h1i2",
  },
  {
    name: "twitch",
    source: "https://m.twitch.tv/videos/1619751464",
  },
  {
    name: "wistia",
    source: "https://home.wistia.com/medias/zs8hlyi5xz",
  },
  {
    name: "vidyard",
    source: "https://video.vidyard.com/watch/4Z3JEiuHGCbGWAhith9GpS",
  },
  {
    name: "mixcloud",
    source: "https://www.mixcloud.com/lBOSS/demost92-deejayboss/",
  },
  {
    name: "dailymotion",
    source: "x7tgad0",
  },
]

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [SocialPlayerService],
})
export class AppComponent implements AfterViewInit {
  buttonNames = sources.map((item) => item.name)
  currentSocialPlayerName: SocialPlayerName = this.buttonNames[0]

  facebookPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "facebook" }).playbackActions
  youtubePlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "youtube" }).playbackActions
  vimeoPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "vimeo" }).playbackActions
  soundcloudPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "soundcloud" }).playbackActions
  streamablePlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "streamable" }).playbackActions
  twitchPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "twitch" }).playbackActions
  wistiaPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "wistia" }).playbackActions
  vidyardPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "vidyard" }).playbackActions
  mixcloudPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "mixcloud" }).playbackActions
  dailymotionPlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "dailymotion" }).playbackActions

  constructor(private socialPlayerService: SocialPlayerService) {}

  ngAfterViewInit() {
    this.handleButtonClick(this.currentSocialPlayerName)
  }

  async handleButtonClick(name: SocialPlayerName) {
    this.currentSocialPlayerName = name

    await sleep(0)

    const source = sources.find((item) => item.name === name)?.source as string

    const handlers: Record<SocialPlayerName, () => void> = {
      facebook: () => {
        this.facebookPlaybackActions.loadFacebookUrl({
          source,
        })
      },
      youtube: () => {
        this.youtubePlaybackActions.loadYoutubeUrl({ source })
      },
      vimeo: () => {
        this.vimeoPlaybackActions.loadVimeoUrl({ source })
      },
      soundcloud: () => {
        this.soundcloudPlaybackActions.loadSoundcloudUrl({ source })
      },
      streamable: () => {
        this.streamablePlaybackActions.loadStreamableUrl({ source })
      },
      twitch: () => {
        this.twitchPlaybackActions.loadTwitchUrl({ source })
      },
      wistia: () => {
        this.wistiaPlaybackActions.loadWistiaUrl({ source })
      },
      vidyard: () => {
        this.vidyardPlaybackActions.loadVidyardUrl({ source })
      },
      mixcloud: () => {
        this.mixcloudPlaybackActions.loadMixcloudUrl({ source })
      },
      dailymotion: () => {
        this.dailymotionPlaybackActions.loadDailymotionUrl({ videoId: source })
      },
    }

    const handler = handlers[this.currentSocialPlayerName as keyof typeof handlers]
    handler()
  }
}
