<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Qwik

The @socialplayer/qwik adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/qwik" />

### Basic Usage

```ts
import { useSocialPlayer } from "@socialplayer/qwik"

const { playbackActions, use } = useSocialPlayer({
  id: "video-id",
})

await use(plugin)
```
