import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import { createPlayer } from "@socialplayer/core"
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
import { streamablePlugin } from "@socialplayer/streamable-plugin"
import { twitchPlugin } from "@socialplayer/twitch-plugin"
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { youtubePlugin } from "@socialplayer/youtube-plugin"

createPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})
createPlayer.use(youtubePlugin)
createPlayer.use(soundcloudPlugin)
createPlayer.use(vimeoPlugin)
createPlayer.use(streamablePlugin)
createPlayer.use(twitchPlugin)

const id = "video"
const result = createPlayer({ id })

const getTemplate = (id: string) => {
  const template = document.getElementById(id) as HTMLTemplateElement

  return {
    source: template.dataset.source as string,
    template: template.content.cloneNode(true),
  }
}

const container = document.querySelector("#container") as HTMLDivElement
const buttons = document.querySelectorAll("#list-of-social-player button") as NodeListOf<HTMLButtonElement>

type SocialPlayerName = "facebook" | "youtube" | "vimeo" | "soundcloud" | "streamable" | "twitch"

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
    }

    const handler = handlers[name as keyof typeof handlers]
    handler()
  })
})

buttons[0].click()
