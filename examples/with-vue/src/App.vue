<script lang="ts" setup>
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
import { streamablePlugin } from "@socialplayer/streamable-plugin"
import { twitchPlugin } from "@socialplayer/twitch-plugin"
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { useSocialPlayer } from "@socialplayer/vue"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { ref, watchEffect } from "vue"

useSocialPlayer.use(facebookPlugin, {
  appId: "1309697205772819",
})
useSocialPlayer.use(youtubePlugin)
useSocialPlayer.use(vimeoPlugin)
useSocialPlayer.use(soundcloudPlugin)
useSocialPlayer.use(streamablePlugin)
useSocialPlayer.use(twitchPlugin)

type SocialPlayerName = "facebook" | "youtube" | "vimeo" | "soundcloud" | "streamable" | "twitch"

type SourceItem = {
  name: SocialPlayerName
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
  {
    name: "soundcloud",
    source: "https://soundcloud.com/kainalu-woodhall/see-you-again-tyler-the-creator",
  },
  {
    name: "streamable",
    source: "4h1i2",
  },
  {
    name: "twitch",
    source: "https://m.twitch.tv/videos/1619751464",
  },
]

const buttonNames = sources.map((item) => item.name)

const { playbackActions: facebookPlaybackActions } = useSocialPlayer({ id: "facebook" })
const { playbackActions: youtubePlaybackActions } = useSocialPlayer({ id: "youtube" })
const { playbackActions: vimeoPlaybackActions } = useSocialPlayer({ id: "vimeo" })
const { playbackActions: soundcloudPlaybackActions } = useSocialPlayer({ id: "soundcloud" })
const { playbackActions: streamablePlaybackActions } = useSocialPlayer({ id: "streamable" })
const { playbackActions: twitchPlaybackActions } = useSocialPlayer({ id: "twitch" })

const currentSocialPlayerName = ref<SocialPlayerName>(sources[0].name)

async function handleButtonClick(name: SocialPlayerName) {
  currentSocialPlayerName.value = name
}

watchEffect(
  () => {
    const source = sources.find((item) => item.name === currentSocialPlayerName.value)?.source as string

    const handlers: Record<SocialPlayerName, () => void> = {
      facebook: () => {
        facebookPlaybackActions.loadFacebookUrl({
          source,
        })
      },
      youtube: () => {
        youtubePlaybackActions.loadYoutubeUrl({ source })
      },
      vimeo: () => {
        vimeoPlaybackActions.loadVimeoUrl({ source })
      },
      soundcloud: () => {
        soundcloudPlaybackActions.loadSoundcloudUrl({ source })
      },
      streamable: () => {
        streamablePlaybackActions.loadStreamableUrl({ source })
      },
      twitch: () => {
        twitchPlaybackActions.loadTwitchUrl({ source })
      },
    }

    const handler = handlers[currentSocialPlayerName.value as keyof typeof handlers]
    handler()
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

      <div class="h-full w-full" v-show="currentSocialPlayerName === 'soundcloud'">
        <div class="h-full w-full" id="soundcloud"></div>
      </div>

      <div class="h-full w-full" v-show="currentSocialPlayerName === 'streamable'">
        <div class="h-full w-full" id="streamable"></div>
      </div>

      <div class="h-full w-full" v-show="currentSocialPlayerName === 'twitch'">
        <div class="h-full w-full" id="twitch"></div>
      </div>
    </div>

    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        v-for="name in buttonNames"
        :key="name"
        @click="handleButtonClick(name)"
      >
        {{ name.slice(0, 1).toUpperCase() + name.slice(1) }}
      </button>
    </span>
  </div>
</template>
