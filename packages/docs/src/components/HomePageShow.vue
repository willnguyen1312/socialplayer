<script lang="ts" setup>
import { defineAsyncComponent } from "vue"

const AsyncSocialPlayer = defineAsyncComponent(() => import("./SocialPlayer.vue"))
</script>

<template>
  <div
    class="min-h-xl m-x-auto rounded-4 container mt-4 flex h-[700px] flex-col space-y-4 bg-white p-4 p-4 font-sans text-black"
  >
    <ClientOnly>
      <AsyncSocialPlayer />
    </ClientOnly>
  </div>
</template>
