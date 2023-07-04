<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Preact

The @socialplayer/preact adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/preact" />

### Basic Usage

```ts
useSocialPlayer.use(plugin)
const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
