<script lang="ts" setup>
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { useSocialPlayer } from "@socialplayer/vue"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { ref, watchEffect } from "vue"

useSocialPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})
useSocialPlayer.use(youtubePlugin)
useSocialPlayer.use(vimeoPlugin)

type SocialPlayerNames = "facebook" | "youtube" | "vimeo"

type SourceItem = {
  name: SocialPlayerNames
  source: string
}

const sources: SourceItem[] = [
  {
    name: "facebook",
    source: "https://www.facebook.com/facebook/videos/3138286969730016",
  },
  {
    name: "youtube",
    source: "WZKW2Hq2fks",
  },
  {
    name: "vimeo",
    source: "https://vimeo.com/365531165",
  },
]

const buttonNames = sources.map((item) => item.name)

const { playbackActions: facebookPlaybackActions } = useSocialPlayer({ id: "facebook" })
const { playbackActions: youtubePlaybackActions } = useSocialPlayer({ id: "youtube" })
const { playbackActions: vimeoPlaybackActions } = useSocialPlayer({ id: "vimeo" })

const currentSocialPlayerName = ref<SocialPlayerNames>(sources[0].name)

async function handleButtonClick(name: SocialPlayerNames) {
  currentSocialPlayerName.value = name
}

watchEffect(
  () => {
    const source = sources.find((item) => item.name === currentSocialPlayerName.value)?.source as string
    if (currentSocialPlayerName.value === "facebook") {
      facebookPlaybackActions.loadFacebookUrl({
        source,
      })
    } else if (currentSocialPlayerName.value === "youtube") {
      youtubePlaybackActions.loadYoutubeUrl({ source })
    } else if (currentSocialPlayerName.value === "vimeo") {
      vimeoPlaybackActions.loadVimeoUrl({ source })
    }
  },
  { flush: "post" },
)
</script>

<template>
  <div class="space-y-4 p-4">
    <div class="h-[400px] w-[600px]">
      <div class="h-full w-full" v-show="currentSocialPlayerName === 'facebook'">
        <div class="h-full w-full" id="facebook"></div>
      </div>
      <div class="h-full w-full" v-show="currentSocialPlayerName === 'youtube'">
        <div class="h-full w-full" id="youtube"></div>
      </div>

      <div class="h-full w-full" v-show="currentSocialPlayerName === 'vimeo'">
        <div class="h-full w-full" id="vimeo"></div>
      </div>
    </div>

    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        v-for="name in buttonNames"
        :key="name"
        @click="handleButtonClick(name)"
      >
        {{ name }}
      </button>
    </span>
  </div>
</template>
