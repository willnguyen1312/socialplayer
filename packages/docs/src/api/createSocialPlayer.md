<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `createSocialPlayer` - <BundleSize func="createSocialPlayer" pkg="@socialplayer/core" />

### Basic Usage

```ts
import { createSocialPlayer } from "@socialplayer/core"
createSocialPlayer.use(plugin)

const { playbackActions } = createSocialPlayer({
  id: "video-id",
})
```
