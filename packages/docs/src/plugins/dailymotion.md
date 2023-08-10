<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `dailymotion` - <BundleSize func="dailymotionPlugin" pkg="@socialplayer/dailymotion-plugin" />

### Basic Usage

```ts
import { dailymotionPlugin } from "@socialplayer/dailymotion-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(dailymotionPlugin, { playerId: "playerId" })

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadDailymotionUrl({ source })
```
