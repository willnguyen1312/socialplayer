<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback React

The @socialplayer/react adapter is a wrapper around the core API.

## `useSocialPlayer` - <BundleSize func="useSocialPlayer" pkg="@socialplayer/react" />

### Basic Usage

```ts
useSocialPlayer.use(plugin)
const { playbackActions } = useSocialPlayer({
  id: "video-id",
})
```
