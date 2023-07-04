<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `soundcloud` - <BundleSize func="soundcloudPlugin" pkg="@socialplayer/soundcloud-plugin" />

### Basic Usage

```ts
import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(soundcloudPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadSoundcloudUrl({ source })
```
