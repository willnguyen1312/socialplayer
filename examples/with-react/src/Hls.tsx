import { hlsPlaybackPlugin } from "@socialplayer/hls-plugin"
import { useSocialPlayer } from "@socialplayer/react"
import React, { useEffect, useState } from "react"
useSocialPlayer.use(hlsPlaybackPlugin)

const source1 = "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8"
const source2 = "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8"
const id = "hls"

function CurrentTime() {
  const playback = useSocialPlayer({
    id,
  })

  return <p>Current time: {playback.playbackState.currentTime}</p>
}

const Duration = React.memo(() => {
  const { playbackState } = useSocialPlayer({
    id,
  })

  return <p>Duration: {playbackState.duration}</p>
})

const Resolutions = React.memo(() => {
  const { playbackState } = useSocialPlayer({
    id,
  })

  // Plugin might inject extra state to playbackState
  return <strong>Levels: {playbackState.levels.map((level) => level.height).join(", ")}</strong>
})

function App() {
  const { activate, playbackActions, playbackState } = useSocialPlayer({
    id,
  })
  const [showDuration, setShowDuration] = useState(true)
  const [source, setSource] = useState(source1)

  useEffect(() => {
    // Activate when playback element is accessible from the DOM
    activate()
  }, [])

  useEffect(() => {
    // Plugin can also inject extra actions to playbackActions
    playbackActions.load({
      source,
    })
  }, [source])

  function jumpNext5s() {
    // Core actions and state are always available
    playbackActions.setCurrentTime(playbackState.currentTime + 5)
  }

  function jumpPrev5s() {
    playbackActions.setCurrentTime(playbackState.currentTime - 5)
  }

  function toggleStreamSource() {
    if (source === source1) {
      setSource(source2)
    } else {
      setSource(source1)
    }
  }

  return (
    <div className="p-4">
      <div className="border-emerald border-1 h-[400px] w-[600px]">
        <video className="h-full w-full" id={id} controls></video>
      </div>

      <CurrentTime />
      {showDuration && <Duration />}
      <Resolutions />

      <div className="flex flex-col items-start ">
        <button onClick={toggleStreamSource}>Switch stream</button>

        <button onClick={jumpNext5s}>Next 5s</button>
        <button onClick={jumpPrev5s}>Prev 5s</button>
        <button
          onClick={() => {
            setShowDuration(!showDuration)
          }}
        >
          Toggle show duration
        </button>
      </div>
    </div>
  )
}

export default App
