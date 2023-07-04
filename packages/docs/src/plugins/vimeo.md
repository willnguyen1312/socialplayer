<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `vimeo` - <BundleSize func="vimeoPlugin" pkg="@socialplayer/vimeo-plugin" />

### Basic Usage

```ts
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(vimeoPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadVimeoUrl({ source })
```
