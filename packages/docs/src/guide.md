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
import { createPlayer } from "@socialplayer/core"
import { youtubePlugin } from "@socialplayer/youtube-plugin"
createPlayer.use(youtubePlugin)

const result = createPlayer({ id: "youtube-video" })
result.playbackActions.loadYoutubeUrl({ source })
```

Refer to [Core API section](/api/) for more details

## Example with React Adapter

Simply importing the utilities you need from `@zoom-image/react`

```tsx

```

Refer to [React Adapter section](/api/adapters/react) for more details

## Example with Preact Adapter

Simply importing the utilities you need from `@zoom-image/preact`

```tsx

```

Refer to [Preact Adapter section](/api/adapters/preact) for more details

## Example with Qwik Adapter

Simply importing the utilities you need from `@zoom-image/qwik`

```tsx

```

Refer to [Qwik Adapter section](/api/adapters/qwik) for more details

## Example with Solid Adapter

Simply importing the utilities you need from `@zoom-image/qwik`

```tsx

```

Refer to [Solid Adapter section](/api/adapters/solid) for more details

## Example with Svelte Adapter

Simply importing the utilities you need from `@zoom-image/svelte`

```svelte
<script lang="ts">
</script>

<div class="imageContainer" bind:this={imageWheelContainer}>
  <img class="image" alt="Large Pic" src="/image.webp" />
</div>
```

Refer to [Svelte Adapter section](/api/adapters/svelte) for more details

## Example with Vue Adapter

Simply importing the utilities you need from `@zoom-image/vue`

```vue
<script lang="ts" setup>
import { onMounted } from "vue"
import { useZoomImageWheel } from "@zoom-image/vue"

const imageWheelContainerRef = ref<HTMLDivElement>()
const { createZoomImage } = useZoomImageWheel()

onMounted(() => {
  createZoomImage(imageWheelContainerRef.value)
})
</script>

<template>
  <div class="imageContainer" ref="imageWheelContainerRef">
    <img class="image" alt="Large Pic" src="/image.webp" />
  </div>
</template>
```

Refer to [Svelte Adapter section](/api/adapters/vue) for more details

## Demos

- [Vanilla JS](/examples/vanilla)
- [Vue](/examples/vue)
- [React](/examples/react)
- [Preact](/examples/preact)
- [Svelte](/examples/svelte)
- [Solid](/examples/solid)
- [Qwik](/examples/qwik)
