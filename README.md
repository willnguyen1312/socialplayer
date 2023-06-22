# Socialplayer

A simple yet complete playback library designed for UI frameworks or even without

## Architecture

- Bridge design pattern
- Plugin-based system
- Minimal API surface to avoid breaking changes
- Embrace the web platform APIs
- Avoid framework-specific locked-in APIs

## Technology decisions

- [Changesets](https://github.com/changesets/changesets) - for versioning
- [Happy-dom](https://github.com/capricorn86/happy-dom) - for node-based browser testing environment
- [Tsup](https://tsup.egoist.dev/) - for bundling libraries
- [Turbo](https://turbo.build/repo) - for remote-caching build system
- [Github Actions](https://github.com/features/actions) - for CI/CD
- [Netlify](https://www.netlify.com/) - for hosting
- [TypeScript](https://www.typescriptlang.org/) - for type safety
- [Vite](https://vitejs.dev/) - for examples application
- [Vitepress](https://vitepress.dev/) - for documentation
- [Vitest](https://vitest.dev/) - for unit and integration testing

## Roadmap

- ✅ Add examples
- ✅ Implement core logic
- ✅ Implement framework adapters
- ✅ Implement some common use plugins such as data streaming
- [] Write documentation

## Supported framework adapters

- ✅ Vue
- ✅ Preact
- ✅ Svelte
- ✅ Solid
- ✅ React
- ✅ Qwik

## Supported social media players

- [YouTube](https://developers.google.com/youtube/iframe_api_reference)
- [Facebook](https://developers.facebook.com/docs/plugins/embedded-video-player/api)
- [SoundCloud](https://developers.soundcloud.com/docs/api/html5-widget)
- [Vimeo](https://developer.vimeo.com/player/sdk/basics)
- [Wistia](https://wistia.com/doc/player-api)
- [Twitch](https://dev.twitch.tv/docs/embed/video-and-clips/)
- [DailyMotion](https://developers.dailymotion.com/player/#player-library-script)
- [Vidyard](https://knowledge.vidyard.com/hc/en-us/articles/360019034753-Using-the-Vidyard-Player-API)
- [Mixcloud](https://www.mixcloud.com/developers/widget/#getting-started)
- [Streamable](https://streamable.com) player is powered by [Player.js](https://github.com/embedly/player.js)

## Inspiration

- [Tanstack](https://tanstack.com) - A collection of high-quality open source libraries for web developers
- [Zag](https://zagjs.com) - A collection of framework-agnostic UI component patterns
- [Day.js](https://day.js.org/docs/en/plugin/plugin) - A modern JavaScript date utility library
- [VueUse](https://vueuse.org) - Collection of Essential Vue Composition Utilities
- [Radix UI](https://www.radix-ui.com) - A collection of open source UI components
- [Building a modern design system in layers](https://blog.almaer.com/building-a-modern-design-system-in-layers/?ck_subscriber_id=1238259209)
- [UI frameworks and Media Elements 🎧](https://medium.com/axon-enterprise/ui-frameworks-and-media-elements-c0c6832528e5)

## Sponsor

<a href="https://www.buymeacoffee.com/namnguyenle" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

MIT © [Nam Nguyen](https://github.com/willnguyen1312)
