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

type CreateSocialPlayerFunc = {
  (arg: { id: string }): {
    playbackActions: CustomSocialPlayerActions
    use: PluginFunc
  }
  use: PluginFunc
  $pluginsQueue: (() => CustomSocialPlayerActions)[]
}

export const createSocialPlayer: CreateSocialPlayerFunc = ({ id }) => {
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

  for (const pluginQueueItem of createSocialPlayer.$pluginsQueue) {
    const actions = pluginQueueItem()
    processActions(actions)
    Object.assign(result.playbackActions, actions)
  }

  return result
}

createSocialPlayer.$pluginsQueue = []
createSocialPlayer.use = <T>(plugin: Plugin<T>, options: T) => {
  createSocialPlayer.$pluginsQueue.push(() => {
    return plugin.install({}, options)
  })
}
