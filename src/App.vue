<script setup lang="ts">
import { RouterView } from "vue-router";
import { navigateToExternal } from "@/util/navigation";
import { useLocalStorage } from "vue-composable";
import { onMounted, ref, watch } from "vue";
import { useSocketIO } from "@/hooks/useSocketIO";
import Bar from "@/components/Bar.vue";

const GITHUB_PROJECT_URL = "https://github.com/dominique-boerner/node-i18n";
const firstTimeStoryKey = "first_time";

const { socket } = useSocketIO();
const tabSync = ref(false);
const { supported, storage, setSync } = useLocalStorage<boolean>(
  firstTimeStoryKey,
  true
);

const files = ref<string[]>([]);
const selectedFile = ref<string>();

onMounted(() => {
  socket.emit("getFiles");

  socket.on("sendFiles", (res: string[]) => {
    files.value = res;
  });
});

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
    <q-select
      filled
      v-model="selectedFile"
      :options="files"
      :label="`${files.length} files found`"
    >
      <template v-slot:prepend>
        <q-icon name="language" />
      </template>
    </q-select>
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
