<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `facebook` - <BundleSize func="facebookPlugin" pkg="@socialplayer/facebook-plugin" />

### Basic Usage

```ts
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { createSocialPlayer } from "@socialplayer/core"

createSocialPlayer.use(facebookPlugin, {
  appId: "appId",
})

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadFacebookUrl({ source })
```
