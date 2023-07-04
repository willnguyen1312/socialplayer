<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `twitch` - <BundleSize func="twitchPlugin" pkg="@socialplayer/twitch-plugin" />

### Basic Usage

```ts
import { twitchPlugin } from "@socialplayer/twitch-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(twitchPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadTwitchUrl({ source })
```
