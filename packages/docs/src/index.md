---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Social Player"
  tagline: "A simple yet powerful library to playback social media video for the web"
  actions:
    - theme: brand
      text: Get Started
      link: /guide
    - theme: alt
      text: View on GitHub
      link: https://github.com/willnguyen1312/socialplayer

features:
  - title: Social player 💅
    details: Support major social media platforms
  - title: Plugins ⚙︎
    details: The core library is extensible with plugins
  - title: Performance 🚀
    details: The bundle size is small < 1KB
---

<script setup>
import HomePageShow from './components/HomePageShow.vue'
import Footer from './components/FooterComp.vue'
</script>

<HomePageShow />
<Footer />
