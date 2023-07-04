<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Svelte

The @socialplayer/svelte adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/svelte" />

### Basic Usage

```ts
import { useSocialPlayer } from "@socialplayer/svelte"
useSocialPlayer.use(plugin)

const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
