<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";

const isFirstTime = ref(true);

function navigateToGitHub() {
  const GITHUB_PROJECT_URL = "https://github.com/dominique-boerner/node-i18n";
  window.open(GITHUB_PROJECT_URL, "_blank");
}

function dismissBanner() {
  isFirstTime.value = false;
}
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
        <q-btn flat label="GitHub" @click="navigateToGitHub()" />
        <q-btn flat label="I Understand" @click="dismissBanner()" />
      </template>
    </q-banner>
  </header>

  <RouterView />
</template>
