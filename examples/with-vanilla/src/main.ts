import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import { createPlayer } from "@socialplayer/core"
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { youtubePlugin } from "@socialplayer/youtube-plugin"

createPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})
createPlayer.use(youtubePlugin)

const id = "video"
const result = createPlayer({ id })

const container = document.querySelector("#container") as HTMLDivElement
const buttons = document.querySelectorAll("#list-of-social-player button") as NodeListOf<HTMLButtonElement>

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    container.innerHTML = `<div class="h-full w-full" id=${id}></div>`
    const source = button.dataset.source as string
    const name = button.dataset.name

    if (name === "facebook") {
      result.playbackActions.loadFacebookUrl({
        source,
      })
    } else if (name === "youtube") {
      result.playbackActions.loadYoutubeUrl({ source })
    }
  })
})
