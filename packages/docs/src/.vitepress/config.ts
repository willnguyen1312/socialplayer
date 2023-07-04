import pkg from "@socialplayer/core/package.json"
import Unocss from "unocss/vite"
import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Social Player",
  description: "A simple yet complete playback library designed for UI frameworks or even without",
  base: "/socialplayer/",
  head: [["link", { rel: "shortcut icon", href: "/socialplayer/favicon.ico", type: "image/x-icon" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: pkg.version,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/willnguyen1312/socialplayer/blob/main/packages/core/CHANGELOG.md",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/willnguyen1312/socialplayer" }],

    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Get started", link: "/guide" }],
      },
      {
        text: "Examples",
        items: [
          {
            text: "Vanilla JS",
            link: "/examples/vanilla",
          },
          {
            text: "Vue",
            link: "/examples/vue",
          },
          {
            text: "React",
            link: "/examples/react",
          },
          {
            text: "Preact",
            link: "/examples/preact",
          },
          {
            text: "Svelte",
            link: "/examples/svelte",
          },
          {
            text: "Solid",
            link: "/examples/solid",
          },
          {
            text: "Qwik",
            link: "/examples/qwik",
          },
        ],
      },
      {
        text: "Core API",
        link: "/api/",
        items: [{ text: "createSocialPlayer", link: "/api/createSocialPlayer" }],
      },
      {
        text: "Core Plugins",
        link: "/plugins/",
        items: [
          { text: "dash", link: "/plugins/dash" },
          { text: "hijack", link: "/plugins/hijack" },
          { text: "hls", link: "/plugins/hls" },
        ],
      },
      {
        text: "Vue Adapter",
        link: "/api/adapters/vue",
      },
      {
        text: "React Adapter",
        link: "/api/adapters/react",
      },
      {
        text: "Preact Adapter",
        link: "/api/adapters/preact",
      },
      {
        text: "Svelte Adapter",
        link: "/api/adapters/svelte",
      },
      {
        text: "Solid Adapter",
        link: "/api/adapters/solid",
      },
      {
        text: "Qwik Adapter",
        link: "/api/adapters/qwik",
      },
    ],

    search: {
      provider: "algolia",
      options: {
        appId: "1DHLJZLW5E",
        apiKey: "615f43332887295e4a2f5775cdef735a",
        indexName: "socialplayer",
      },
    },
  },
  vite: {
    plugins: [
      Unocss({
        theme: {
          breakpoints: {
            xs: "320px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
          },
        },
      }),
    ],
  },
})
