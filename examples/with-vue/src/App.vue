<script lang="ts" setup>
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { useSocialPlayer } from "@socialplayer/vue"
import { onMounted } from "vue"

useSocialPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})

const id = "video"
const { activate, playbackActions } = useSocialPlayer({ id: "video" })

onMounted(() => {
  activate()
  playbackActions.load({ source: "https://www.facebook.com/facebook/videos/10153231379946729/" })
})
</script>

<template>
  <div class="h-[400px] w-[600px] p-4">
    <div class="h-full w-full" :id="id"></div>
  </div>
</template>
