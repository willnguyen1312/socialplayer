import { StoreListener, createStore } from "@namnode/store"

export type CustomSocialPlayerAction<T> = (arg: T & { id: string }) => void

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomSocialPlayerState {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomSocialPlayerActions {}

export type SocialPlayerState = CustomSocialPlayerState

export type SocialPlayerActions = CustomSocialPlayerActions

export type PlaybackStore = ReturnType<typeof createStore<CustomSocialPlayerState>>

type CleanupFunc = () => void

type OnCleanupHook = (id: string, cb: CleanupFunc) => void

export type Plugin<T = unknown> = {
  install: (
    arg: {
      store: ReturnType<typeof createStore<CustomSocialPlayerState>>
      onCleanup: OnCleanupHook
    },
    options: T,
  ) => CustomSocialPlayerActions
}

export type PluginFunc = <T>(plugin: Plugin<T>, ...options: T[]) => void

type CreatePlayerFunc = {
  (arg: { id: string }): {
    cleanup: () => void
    subscribe: (listener: StoreListener<CustomSocialPlayerState>) => () => void
    activate: () => boolean
    getState: () => CustomSocialPlayerState
    playbackActions: CustomSocialPlayerActions
    onCleanup: (cb: CleanupFunc) => void
    use: PluginFunc
  }
  use: PluginFunc
  $pluginsQueue: ((arg: {
    store: ReturnType<typeof createStore<CustomSocialPlayerState>>
    onCleanup: OnCleanupHook
  }) => CustomSocialPlayerActions)[]
}

const cleanupCallbackMap = new Map<string, Set<CleanupFunc>>()
const socialPlayerContainerActivatedSet = new WeakSet<HTMLElement>()

export const createPlayer: CreatePlayerFunc = ({ id }) => {
  const store = createStore<CustomSocialPlayerState>({})

  let socialPlayerContainer: HTMLElement | undefined

  const addCleanupCallback = (cb: CleanupFunc) => {
    cleanupCallbackMap.set(id, (cleanupCallbackMap.get(id) || new Set()).add(cb))
  }

  const onCleanup: OnCleanupHook = (id: string, cb) => {
    cleanupCallbackMap.set(id, (cleanupCallbackMap.get(id) || new Set()).add(cb))
  }

  function activate() {
    const socialPlayerContainer = document.getElementById(id) as HTMLElement | null

    if (!socialPlayerContainer) {
      throw new Error(`Playback container with id ${id} not found`)
    }

    if (socialPlayerContainerActivatedSet.has(socialPlayerContainer)) {
      return false
    }

    socialPlayerContainerActivatedSet.add(socialPlayerContainer)
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processActions = (actions: any) => {
    for (const key in actions) {
      const originalAction = actions[key]
      const wrappedAction = <T extends object>(arg: T) => {
        originalAction({ ...arg, id })
      }

      actions[key] = wrappedAction
    }
  }

  const playbackActions = {}

  const result = {
    cleanup() {
      if (document.body.contains(socialPlayerContainer as HTMLElement)) {
        return
      }

      store.cleanup()
      socialPlayerContainer && socialPlayerContainerActivatedSet.delete(socialPlayerContainer)
      if (cleanupCallbackMap.has(id)) {
        const cbs = cleanupCallbackMap.get(id) as Set<CleanupFunc>

        for (const cb of cbs) {
          cb()
        }

        cleanupCallbackMap.delete(id)
      }

      socialPlayerContainer = undefined
    },
    onCleanup: addCleanupCallback,
    activate,
    subscribe: store.subscribe,
    getState: store.getState,
    playbackActions,
    use: <T>(plugin: Plugin<T>, options: T) => {
      const actions = plugin.install(
        {
          store,
          onCleanup,
        },
        options,
      )
      processActions(actions)
      Object.assign(result.playbackActions, actions)
      return actions
    },
  }

  for (const pluginQueueItem of createPlayer.$pluginsQueue) {
    const actions = pluginQueueItem({ store, onCleanup })
    processActions(actions)
    Object.assign(result.playbackActions, actions)
  }

  return result
}

createPlayer.$pluginsQueue = []
createPlayer.use = <T>(plugin: Plugin<T>, options: T) => {
  createPlayer.$pluginsQueue.push(({ store, onCleanup }) => {
    return plugin.install({ store, onCleanup }, options)
  })
}
