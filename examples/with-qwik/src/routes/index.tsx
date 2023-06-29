import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { hlsPlaybackPlugin } from "@socialplayer/plugins"
import { useSocialPlayer } from "@socialplayer/qwik"

const source1 = "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8"
const source2 = "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8"

const Duration = component$(() => {
  const { playbackState } = useSocialPlayer({
    id: "video",
  })

  return <p>Duration: {playbackState.duration}</p>
})

const CurrentTime = component$(() => {
  const { playbackState } = useSocialPlayer({
    id: "video",
  })

  return <p>Current time: {playbackState.currentTime}</p>
})

const Resolutions = component$(() => {
  const { playbackState } = useSocialPlayer({
    id: "video",
  })

  // Plugin will inject extra state to playbackState
  return <strong>Levels: {playbackState.levels?.map((level) => level.height).join(", ")}</strong>
})

const App = component$(() => {
  const { playbackActions, playbackState, use } = useSocialPlayer({
    id: "video",
  })
  const showDuration = useSignal(true)
  const source = useSignal(source1)

  useVisibleTask$(async () => {
    await use(hlsPlaybackPlugin)
  })

  useVisibleTask$(({ track }) => {
    track(() => source.value)
    playbackActions.load?.({
      source: source.value,
    })
  })

  const jumpNext5s = $(() => {
    playbackActions.setCurrentTime(playbackState.currentTime + 5)
  })

  const jumpPrev5s = $(() => {
    playbackActions.setCurrentTime(playbackState.currentTime - 5)
  })

  const toggleStreamSource = $(() => {
    if (source.value === source1) {
      source.value = source2
    } else {
      source.value = source1
    }
  })

  return (
    <div class="p-4">
      <div class="border-emerald border-1 h-[400px] w-[600px]">
        <video
          // src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          class="h-full w-full"
          id="video"
          controls
        ></video>
      </div>

      <CurrentTime />
      {showDuration.value && <Duration />}
      <Resolutions />

      <div class="flex flex-col items-start ">
        <button onClick$={toggleStreamSource}>Switch stream</button>

        <button onClick$={jumpNext5s}>Next 5s</button>
        <button onClick$={jumpPrev5s}>Prev 5s</button>
        <button
          onClick$={() => {
            showDuration.value = !showDuration.value
          }}
        >
          Toggle show duration
        </button>
      </div>
    </div>
  )
})

export default App
