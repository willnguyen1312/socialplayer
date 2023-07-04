<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `youtube` - <BundleSize func="youtubePlugin" pkg="@socialplayer/youtube-plugin" />

### Basic Usage

```ts
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(youtubePlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadYoutubeUrl({ source })
```
