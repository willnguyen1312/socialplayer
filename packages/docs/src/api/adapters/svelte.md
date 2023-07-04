<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Svelte

The @socialplayer/svelte adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/svelte" />

### Basic Usage

```ts
useSocialPlayer.use(plugin)
const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
