<script setup lang="ts">
import { RouterView } from "vue-router";
import { navigateToExternal } from "@/util/navigation";
import { useLocalStorage } from "vue-composable";
import { ref, watch } from "vue";
import Bar from "@/components/Bar.vue";

const GITHUB_PROJECT_URL = "https://github.com/dominique-boerner/node-i18n";
const firstTimeStoryKey = "first_time";

const tabSync = ref(false);
const { supported, storage, setSync } = useLocalStorage<boolean>(
  firstTimeStoryKey,
  true
);

watch(tabSync, setSync);
</script>

<template>
  <header class="window-width">
    <Bar />
    <q-banner
      v-if="storage"
      inline-actions
      class="bg-primary text-white window-width"
    >
      Thank you for using i18n Studio! This project is currently a WIP, so don't
      be afraid to give feedback on GitHub.

      <template v-slot:action>
        <q-btn
          flat
          label="GitHub"
          @click="navigateToExternal(GITHUB_PROJECT_URL, true)"
        />
        <q-btn flat label="I Understand" @click="storage = false" />
      </template>
    </q-banner>
  </header>

  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped>
.content {
  padding: 0.5rem;
}
</style>
