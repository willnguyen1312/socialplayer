<script setup>
import BundleSize from '../components/BundleSize.vue'
</script>

## `facebook` - <BundleSize func="facebookPlugin" pkg="@socialplayer/facebook-plugin" />

### Basic Usage

```ts
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { createSocialPlayer } from "@socialplayer/core"

// Please refer to the Facebook doc for more information on appId
// https://developers.facebook.com/docs/development/create-an-app/
createSocialPlayer.use(facebookPlugin, {
  appId: "appId",
})

const { playbackActions } = createSocialPlayer({
  { id: "video-id" },
})

playbackActions.loadFacebookUrl({ source })
```
