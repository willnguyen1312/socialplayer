<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `dailymotion` - <BundleSize func="dailymotionPlugin" pkg="@socialplayer/dailymotion-plugin" />

### Basic Usage

```ts
import { dailymotionPlugin } from "@socialplayer/dailymotion-plugin"
import { createSocialPlayer } from "@socialplayer/core"

// Please refer to the Dailymotion doc for more information on playerId
// https://developers.dailymotion.com/player/#player-library-script
createSocialPlayer.use(dailymotionPlugin, { playerId: "playerId" })

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadDailymotionUrl({ source })
```
