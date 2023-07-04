<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `wistia` - <BundleSize func="wistiaPlugin" pkg="@socialplayer/wistia-plugin" />

### Basic Usage

```ts
import { wistiaPlugin } from "@socialplayer/wistia-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(wistiaPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadWistiaUrl({ source })
```
