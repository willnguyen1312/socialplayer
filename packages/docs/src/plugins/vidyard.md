<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `vidyard` - <BundleSize func="vidyardPlugin" pkg="@socialplayer/vidyard-plugin" />

### Basic Usage

```ts
import { vidyardPlugin } from "@socialplayer/vidyard-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(vidyardPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadVidyardUrl({ source })
```
