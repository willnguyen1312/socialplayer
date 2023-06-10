import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import { createPlayer } from "@socialplayer/core"
import { facebookPlugin } from "@socialplayer/facebook-plugin"

createPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})

const id = "video"

const result = createPlayer({ id })

result.activate()

result.playbackActions.load({ source: "https://www.facebook.com/facebook/videos/10153231379946729/" })
