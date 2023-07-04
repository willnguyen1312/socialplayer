import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import { createSocialPlayer } from "@socialplayer/core"
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

createSocialPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})
createSocialPlayer.use(youtubePlugin)
createSocialPlayer.use(soundcloudPlugin)
createSocialPlayer.use(vimeoPlugin)
createSocialPlayer.use(streamablePlugin)
createSocialPlayer.use(wistiaPlugin)
createSocialPlayer.use(twitchPlugin)
createSocialPlayer.use(vidyardPlugin)
createSocialPlayer.use(mixcloudPlugin)
createSocialPlayer.use(dailymotionPlugin, { playerId: "xfpfw" })

const id = "video"
const result = createSocialPlayer({ id })

const getTemplate = (id: string) => {
  const template = document.getElementById(id) as HTMLTemplateElement

  return {
    source: template.dataset.source as string,
    template: template.content.cloneNode(true),
  }
}

const container = document.querySelector("#container") as HTMLDivElement
const buttons = document.querySelectorAll("#list-of-social-player button") as NodeListOf<HTMLButtonElement>

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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name as string
    const { source, template } = getTemplate(name)
    container.replaceChildren(template)

    const handlers: Record<SocialPlayerName, () => void> = {
      facebook: () => {
        result.playbackActions.loadFacebookUrl({
          source,
        })
      },
      youtube: () => {
        result.playbackActions.loadYoutubeUrl({ source })
      },
      vimeo: () => {
        result.playbackActions.loadVimeoUrl({ source })
      },
      soundcloud: () => {
        result.playbackActions.loadSoundcloudUrl({ source })
      },
      streamable: () => {
        result.playbackActions.loadStreamableUrl({ source })
      },
      twitch: () => {
        result.playbackActions.loadTwitchUrl({ source })
      },
      wistia: () => {
        result.playbackActions.loadWistiaUrl({ source })
      },
      vidyard: () => {
        result.playbackActions.loadVidyardUrl({ source })
      },
      mixcloud: () => {
        result.playbackActions.loadMixcloudUrl({ source })
      },
      dailymotion: () => {
        result.playbackActions.loadDailymotionUrl({ videoId: source })
      },
    }

    const handler = handlers[name as keyof typeof handlers]
    handler()
  })
})

buttons[0].click()
