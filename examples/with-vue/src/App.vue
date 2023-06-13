<script lang="ts" setup>
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { useSocialPlayer } from "@socialplayer/vue"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { ref } from "vue"

useSocialPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})

useSocialPlayer.use(youtubePlugin)

const id = "video"
type ButtonItem = {
  name: string
  source: string
}
const buttons: ButtonItem[] = [
  {
    name: "facebook",
    source: "https://www.facebook.com/facebook/videos/3138286969730016",
  },
  {
    name: "youtube",
    source: "WZKW2Hq2fks",
  },
]
const { playbackActions } = useSocialPlayer({ id })
const container = ref<HTMLElement>()

function handleButtonClick(item: ButtonItem) {
  const containerElement = container.value as HTMLElement
  containerElement.innerHTML = `<div class="h-full w-full" id=${id}></div>`

  if (item.name === "facebook") {
    playbackActions.loadFacebookUrl({
      source: item.source,
    })
  } else if (item.name === "youtube") {
    playbackActions.loadYoutubeUrl({ source: item.source })
  }
}
</script>

<template>
  <div class="space-y-4 p-4">
    <div class="h-[400px] w-[600px]" ref="container"></div>

    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        v-for="item in buttons"
        :key="item.name"
        @click="handleButtonClick(item)"
      >
        {{ item.name }}
      </button>
    </span>
  </div>
</template>
