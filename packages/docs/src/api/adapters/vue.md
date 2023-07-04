<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Vue

The @socialplayer/vue adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/vue" />

### Basic Usage

```ts
import { useSocialPlayer } from "@socialplayer/vue"
useSocialPlayer.use(plugin)

const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
