<script setup>
import BundleSize from '../../components/BundleSize.vue'
</script>

# Headless playback Vue

The @socialplayer/vue adapter is a wrapper around the core API.

## `SocialPlayerService` - <BundleSize func="SocialPlayerService" pkg="@socialplayer/angular" />

### Basic Usage

```ts
import { SocialPlayerService } from "@socialplayer/angular"
SocialPlayerService.use(plugin)

class AppComponent {
  playbackActions = this.socialPlayerService.createSocialPlayer({
    id: "video-id",
  })

  constructor(private socialPlayerService: SocialPlayerService) {}
}
```
