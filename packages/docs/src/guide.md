# Get Started

Socialplayer is a little yet powerful and extensive library for powering social media playback experience on the web. It
is written in pure TypeScript and has no dependencies. The library is built with framework agnostic in mind, so it can
be used with any framework adapters or even without

## Installation

::: code-group

```sh [pnpm]
$ pnpm add @socialplayer/core
```

```sh [npm]
$ npm install @socialplayer/core
```

```sh [yarn]
$ yarn add @socialplayer/core
```

:::

## Example with Vanilla JS

Simply importing the utilities you need from `@socialplayer/core` and social plugin for your platform

```html
<div id="youtube-video"></div>
```

```ts
import { createSocialPlayer } from "@socialplayer/core"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
createSocialPlayer.use(youtubePlugin)

const { playbackActions } = createSocialPlayer({ id: "youtube-video" })
playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
```

Refer to [Core API section](/api/) for more details

## Example with Angular

Simply importing the utilities you need from `@socialplayer/angular` and social plugin for your platform

```html
<div id="youtube-video"></div>
```

```ts
import { AfterViewInit, Component } from "@angular/core"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { SocialPlayerService } from "@socialplayer/angular"
SocialPlayerService.use(youtubePlugin)

@Component({
  selector: "custom-component",
  templateUrl: "./custom.component.html",
  providers: [ZoomImageWheelService],
})
export class AppComponent implements AfterViewInit {
  youtubePlaybackActions = this.socialPlayerService.createSocialPlayer({ id: "youtube" }).playbackActions

  constructor(private socialPlayerService: SocialPlayerService) {}

  ngAfterViewInit() {
    this.youtubePlaybackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  }
}
```

Refer to [Angular API section](/api/adapters/angular) for more details

## Example with React Adapter

Simply importing the utilities you need from `@socialplayer/react`

```tsx
import React from "react"
import { useSocialPlayer } from "@socialplayer/react"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
useSocialPlayer.use(youtubePlugin)

const App = () => {
  const { playbackActions } = useSocialPlayer({ id: "youtube-video" })

  React.useEffect(() => {
    playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  }, [])

  return <div id="youtube-video"></div>
}
```

Refer to [React Adapter section](/api/adapters/react) for more details

## Example with Preact Adapter

Simply importing the utilities you need from `@socialplayer/preact`

```tsx
import { useEffect } from "preact/hooks"
import { useSocialPlayer } from "@socialplayer/preact"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
useSocialPlayer.use(youtubePlugin)

const App = () => {
  const { playbackActions } = useSocialPlayer({ id: "youtube-video" })

  useEffect(() => {
    playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  }, [])

  return <div id="youtube-video"></div>
}
```

Refer to [Preact Adapter section](/api/adapters/preact) for more details

## Example with Qwik Adapter

Simply importing the utilities you need from `@socialplayer/qwik`

```tsx
import { useSocialPlayer } from "@socialplayer/qwik"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
import { useVisibleTask$ } from "@builder.io/qwik"

const App = () => {
  const { playbackActions, use } = useSocialPlayer({ id: "youtube" })

  useVisibleTask$(async () => {
    await use(youtubePlugin)
    playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  })

  return <div id="youtube-video"></div>
}
```

Refer to [Qwik Adapter section](/api/adapters/qwik) for more details

## Example with Solid Adapter

Simply importing the utilities you need from `@socialplayer/qwik`

```tsx
import { useSocialPlayer } from "@socialplayer/solid"
import { createEffect } from "solid-js"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
useSocialPlayer.use(youtubePlugin)

const App = () => {
  const { playbackActions } = useSocialPlayer({ id: "youtube-video" })

  createEffect(() => {
    playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  })

  return <div id="youtube-video"></div>
}
```

Refer to [Solid Adapter section](/api/adapters/solid) for more details

## Example with Svelte Adapter

Simply importing the utilities you need from `@socialplayer/svelte`

```svelte
<script lang="ts">
  import { useSocialPlayer } from "@socialplayer/svelte"
  import { onMount } from "svelte"
  import { youtubePlugin } from "@socialplayer/youtube-plugin"
  useSocialPlayer.use(youtubePlugin)

  const { playbackActions } = useSocialPlayer({ id: "youtube-video" })

  onMount(() => {
    playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
  })
</script>

<div id="youtube-video" />
```

Refer to [Svelte Adapter section](/api/adapters/svelte) for more details

## Example with Vue Adapter

Simply importing the utilities you need from `@socialplayer/vue`

```vue
<script lang="ts" setup>
import { onMounted } from "vue"
import { useSocialPlayer } from "@socialplayer/vue"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
useSocialPlayer.use(youtubePlugin)

const { playbackActions } = useSocialPlayer({ id: "youtube-video" })

onMounted(() => {
  playbackActions.loadYoutubeUrl({ source: "youtube-video-source" })
})
</script>

<template>
  <div id="youtube-video" />
</template>
```

Refer to [Vue Adapter section](/api/adapters/vue) for more details

## Demos

- [Vanilla JS](/examples/vanilla)
- [Angular](/examples/angular)
- [Vue](/examples/vue)
- [React](/examples/react)
- [Preact](/examples/preact)
- [Svelte](/examples/svelte)
- [Solid](/examples/solid)
- [Qwik](/examples/qwik)
