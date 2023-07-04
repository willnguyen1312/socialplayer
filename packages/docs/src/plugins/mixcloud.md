<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `mixcloud` - <BundleSize func="mixcloudPlugin" pkg="@socialplayer/mixcloud-plugin" />

### Basic Usage

```ts
import { mixcloudPlugin } from "@socialplayer/mixcloud-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(mixcloudPlugin)

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadMixcloudUrl({ source })
```
