<script lang="ts">
  import { dailymotionPlugin } from "@socialplayer/dailymotion-plugin"
  import { facebookPlugin } from "@socialplayer/facebook-plugin"
  import { mixcloudPlugin } from "@socialplayer/mixcloud-plugin"
  import { soundcloudPlugin } from "@socialplayer/soundcloud-plugin"
  import { streamablePlugin } from "@socialplayer/streamable-plugin"
  import { useSocialPlayer } from "@socialplayer/svelte"
  import { twitchPlugin } from "@socialplayer/twitch-plugin"
  import { vidyardPlugin } from "@socialplayer/vidyard-plugin"
  import { vimeoPlugin } from "@socialplayer/vimeo-plugin"
  import { wistiaPlugin } from "@socialplayer/wistia-plugin"
  import { youtubePlugin } from "@socialplayer/youtube-plugin"
  import { tick } from "svelte"

  useSocialPlayer.use(facebookPlugin, {
    appId: "1309697205772819",
  })
  useSocialPlayer.use(youtubePlugin)
  useSocialPlayer.use(vimeoPlugin)
  useSocialPlayer.use(soundcloudPlugin)
  useSocialPlayer.use(streamablePlugin)
  useSocialPlayer.use(twitchPlugin)
  useSocialPlayer.use(vidyardPlugin)
  useSocialPlayer.use(mixcloudPlugin)
  useSocialPlayer.use(wistiaPlugin)
  useSocialPlayer.use(dailymotionPlugin, { playerId: "xfpfw" })

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
      source: "https://soundcloud.com/ahmed-gado-1/im-coming-home-skylar-grey",
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
  let currentSocialPlayerName = sources[0].name

  const { playbackActions: facebookPlaybackActions } = useSocialPlayer({ id: "facebook" })
  const { playbackActions: youtubePlaybackActions } = useSocialPlayer({ id: "youtube" })
  const { playbackActions: vimeoPlaybackActions } = useSocialPlayer({ id: "vimeo" })
  const { playbackActions: soundcloudPlaybackActions } = useSocialPlayer({ id: "soundcloud" })
  const { playbackActions: streamablePlaybackActions } = useSocialPlayer({ id: "streamable" })
  const { playbackActions: twitchPlaybackActions } = useSocialPlayer({ id: "twitch" })
  const { playbackActions: wistiaPlaybackActions } = useSocialPlayer({ id: "wistia" })
  const { playbackActions: vidyardPlaybackActions } = useSocialPlayer({ id: "vidyard" })
  const { playbackActions: mixcloudPlaybackActions } = useSocialPlayer({ id: "mixcloud" })
  const { playbackActions: dailymotionPlaybackActions } = useSocialPlayer({ id: "dailymotion" })

  const handleCurrentSocialPlayerNameChanged = async (currentSocialPlayerName: SocialPlayerName) => {
    await tick()
    const source = sources.find((item) => item.name === currentSocialPlayerName).source as string

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
      wistia: () => {
        wistiaPlaybackActions.loadWistiaUrl({ source })
      },
      vidyard: () => {
        vidyardPlaybackActions.loadVidyardUrl({ source })
      },
      mixcloud: () => {
        mixcloudPlaybackActions.loadMixcloudUrl({ source })
      },
      dailymotion: () => {
        dailymotionPlaybackActions.loadDailymotionUrl({ videoId: source })
      },
    }

    const handler = handlers[currentSocialPlayerName]
    handler()
  }

  $: handleCurrentSocialPlayerNameChanged(currentSocialPlayerName)
</script>

<div class="space-y-4 p-4">
  <div class="h-[600px] w-[600px]">
    {#if currentSocialPlayerName === "facebook"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="facebook" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "youtube"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="youtube" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "vimeo"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="vimeo" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "soundcloud"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="soundcloud" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "streamable"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="streamable" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "twitch"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="twitch" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "wistia"}
      <div class="h-full w-full">
        <div class="h-full w-full" id="wistia" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "mixcloud"}
      <div class="h-full w-full">
        <div class="flex h-full w-full" id="mixcloud" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "dailymotion"}
      <div class="h-full w-full">
        <div class="flex h-full w-full" id="dailymotion" />
      </div>
    {/if}

    {#if currentSocialPlayerName === "vidyard"}
      <div class="h-full w-full">
        <div class="flex h-full w-full items-center justify-center" id="vidyard" />
      </div>
    {/if}
  </div>

  <div class="flex flex-wrap gap-2">
    {#each buttonNames as buttonName (buttonName)}
      <button
        class="relative -ml-px inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        on:click={() => {
          currentSocialPlayerName = buttonName
        }}
      >
        {buttonName.slice(0, 1).toUpperCase() + buttonName.slice(1)}
      </button>
    {/each}
  </div>
</div>
