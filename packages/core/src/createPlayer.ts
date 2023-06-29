/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomSocialPlayerActions {}

export type SocialPlayerActions = CustomSocialPlayerActions

export type Plugin<T = unknown> = {
  install: (
    arg: {
      // Nothing yet
    },
    options: T,
  ) => CustomSocialPlayerActions
}

export type PluginFunc = <T>(plugin: Plugin<T>, ...options: T[]) => void

type CreatePlayerFunc = {
  (arg: { id: string }): {
    playbackActions: CustomSocialPlayerActions
    use: PluginFunc
  }
  use: PluginFunc
  $pluginsQueue: (() => CustomSocialPlayerActions)[]
}

export const createPlayer: CreatePlayerFunc = ({ id }) => {
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
    playbackActions,
    use: <T>(plugin: Plugin<T>, options: T) => {
      const actions = plugin.install({}, options)
      processActions(actions)
      Object.assign(result.playbackActions, actions)
      return actions
    },
  }

  for (const pluginQueueItem of createPlayer.$pluginsQueue) {
    const actions = pluginQueueItem()
    processActions(actions)
    Object.assign(result.playbackActions, actions)
  }

  return result
}

createPlayer.$pluginsQueue = []
createPlayer.use = <T>(plugin: Plugin<T>, options: T) => {
  createPlayer.$pluginsQueue.push(() => {
    return plugin.install({}, options)
  })
}
