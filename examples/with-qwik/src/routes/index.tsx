import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { dailymotionPlugin } from "@socialplayer/dailymotion-plugin"
import { facebookPlugin } from "@socialplayer/facebook-plugin"
import { mixcloudPlugin } from "@socialplayer/mixcloud-plugin"
import { useSocialPlayer } from "@socialplayer/qwik"
import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
import { streamablePlugin } from "@socialplayer/streamable-plugin"
import { twitchPlugin } from "@socialplayer/twitch-plugin"
import { vidyardPlugin } from "@socialplayer/vidyard-plugin"
import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
import { wistiaPlugin } from "@socialplayer/wistia-plugin"
import { youtubePlugin } from "@socialplayer/youtube-plugin"

type SocialPlayerName =
  | "facebook"
  | "youtube"
  | "vimeo"
  | "soundcloud"
  | "streamable"
  | "twitch"
  | "wistia"
  | "vidyard"
  | "mixcloud"
  | "dailymotion"

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
    source: "https://www.youtube.com/watch?v=WZKW2Hq2fks",
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
  {
    name: "wistia",
    source: "https://home.wistia.com/medias/zs8hlyi5xz",
  },
  {
    name: "vidyard",
    source: "https://video.vidyard.com/watch/4Z3JEiuHGCbGWAhith9GpS",
  },
  {
    name: "mixcloud",
    source: "https://www.mixcloud.com/lBOSS/demost92-deejayboss/",
  },
  {
    name: "dailymotion",
    source: "x7tgad0",
  },
]

const buttonNames = sources.map((item) => item.name)

const App = component$(() => {
  const { playbackActions: facebookPlaybackActions, use: useFacebookPlugin } = useSocialPlayer({
    id: "facebook",
  })
  const { playbackActions: youtubePlaybackActions, use: useYoutubePlugin } = useSocialPlayer({ id: "youtube" })
  const { playbackActions: vimeoPlaybackActions, use: useVimeoPlugin } = useSocialPlayer({ id: "vimeo" })
  const { playbackActions: soundcloudPlaybackActions, use: useSoundcloudPlugin } = useSocialPlayer({ id: "soundcloud" })
  const { playbackActions: streamablePlaybackActions, use: useStreamablePlugin } = useSocialPlayer({ id: "streamable" })
  const { playbackActions: twitchPlaybackActions, use: useTwitchPlugin } = useSocialPlayer({ id: "twitch" })
  const { playbackActions: wistiaPlaybackActions, use: useWistiaPlugin } = useSocialPlayer({ id: "wistia" })
  const { playbackActions: vidyardPlaybackActions, use: useVidyardPlugin } = useSocialPlayer({ id: "vidyard" })
  const { playbackActions: mixcloudPlaybackActions, use: useMixcloudPlugin } = useSocialPlayer({ id: "mixcloud" })
  const { playbackActions: dailymotionPlaybackActions, use: useDailymotionPlugin } = useSocialPlayer({
    id: "dailymotion",
  })

  const currentSource = useSignal<SocialPlayerName>(sources[0].name)

  const handleClick = $((name: SocialPlayerName) => {
    currentSource.value = name as SocialPlayerName
  })

  useVisibleTask$(({ track }) => {
    track(() => currentSource.value)

    const source = sources.find((item) => item.name === currentSource.value)?.source as string

    const handlers: Record<SocialPlayerName, () => Promise<void>> = {
      facebook: async () => {
        await useFacebookPlugin(facebookPlugin, {
          appId: "1309697205772819",
        })
        facebookPlaybackActions.loadFacebookUrl({
          source,
        })
      },
      youtube: async () => {
        await useYoutubePlugin(youtubePlugin)
        youtubePlaybackActions.loadYoutubeUrl({ source })
      },
      vimeo: async () => {
        await useVimeoPlugin(vimeoPlugin)
        vimeoPlaybackActions.loadVimeoUrl({ source })
      },
      soundcloud: async () => {
        await useSoundcloudPlugin(soundcloudPlugin)
        soundcloudPlaybackActions.loadSoundcloudUrl({ source })
      },
      streamable: async () => {
        await useStreamablePlugin(streamablePlugin)
        streamablePlaybackActions.loadStreamableUrl({ source })
      },
      twitch: async () => {
        await useTwitchPlugin(twitchPlugin)
        twitchPlaybackActions.loadTwitchUrl({ source })
      },
      wistia: async () => {
        await useWistiaPlugin(wistiaPlugin)
        wistiaPlaybackActions.loadWistiaUrl({ source })
      },
      vidyard: async () => {
        await useVidyardPlugin(vidyardPlugin)
        vidyardPlaybackActions.loadVidyardUrl({ source })
      },
      mixcloud: async () => {
        await useMixcloudPlugin(mixcloudPlugin)
        mixcloudPlaybackActions.loadMixcloudUrl({ source })
      },
      dailymotion: async () => {
        await useDailymotionPlugin(dailymotionPlugin, { playerId: "xfpfw" })
        dailymotionPlaybackActions.loadDailymotionUrl({ videoId: source })
      },
    }

    const handler = handlers[currentSource.value as SocialPlayerName]
    handler && handler()
  })

  return (
    <div class="space-y-4 p-4">
      <div class="h-[600px] w-[600px]">
        {currentSource.value === "facebook" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="facebook"></div>
          </div>
        )}

        {currentSource.value === "youtube" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="youtube"></div>
          </div>
        )}

        {currentSource.value === "vimeo" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="vimeo"></div>
          </div>
        )}

        {currentSource.value === "soundcloud" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="soundcloud"></div>
          </div>
        )}

        {currentSource.value === "streamable" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="streamable"></div>
          </div>
        )}

        {currentSource.value === "twitch" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="twitch"></div>
          </div>
        )}

        {currentSource.value === "wistia" && (
          <div class="h-full w-full">
            <div class="h-full w-full" id="wistia"></div>
          </div>
        )}

        {currentSource.value === "mixcloud" && (
          <div class="h-full w-full">
            <div class="flex h-full w-full" id="mixcloud"></div>
          </div>
        )}

        {currentSource.value === "dailymotion" && (
          <div class="h-full w-full">
            <div class="flex h-full w-full" id="dailymotion"></div>
          </div>
        )}

        {currentSource.value === "vidyard" && (
          <div class="h-full w-full">
            <div class="flex h-full w-full items-center justify-center" id="vidyard"></div>
          </div>
        )}
      </div>

      <div class="flex flex-wrap gap-2">
        {buttonNames.map((name) => {
          return (
            <button
              onClick$={() => handleClick(name)}
              class="relative -ml-px inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              key={name}
            >
              {name.slice(0, 1).toUpperCase() + name.slice(1)}
            </button>
          )
        })}
      </div>
    </div>
  )
})

export default App
