<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import { navigateToExternal } from "@/util/navigation";
import { getLocalStorage, setLocalStorage } from "@/util/local-storage";

const GITHUB_PROJECT_URL = "https://github.com/dominique-boerner/node-i18n";
const FIRST_TIME_STORAGE_KEY = "first_time";

const isFirstTime = ref(getLocalStorage(FIRST_TIME_STORAGE_KEY, true));
</script>

<template>
  <header class="window-width">
    <q-banner
      v-if="isFirstTime"
      inline-actions
      class="bg-primary text-white window-width"
    >
      Thank you for using i18n-studio! This project is currently a WIP, so don't
      be afraid to give feedback on GitHub.

      <template v-slot:action>
        <q-btn
          flat
          label="GitHub"
          @click="navigateToExternal(GITHUB_PROJECT_URL, true)"
        />
        <q-btn
          flat
          label="I Understand"
          @click="setLocalStorage(FIRST_TIME_STORAGE_KEY, false)"
        />
      </template>
    </q-banner>
  </header>

  <RouterView />
</template>
