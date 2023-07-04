<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `streamable` - <BundleSize func="streamablePlugin" pkg="@socialplayer/streamable-plugin" />

### Basic Usage

```ts
import { streamablePlugin } from "@socialplayer/streamable-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(streamablePlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadStreamableUrl({ source })
```
