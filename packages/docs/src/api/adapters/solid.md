<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Solid

The @socialplayer/solid adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/solid" />

### Basic Usage

```ts
useSocialPlayer.use(plugin)
const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
