<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSocketIO } from "@/hooks/useSocketIO";

const { socket } = useSocketIO();
const files = ref<string[]>([]);
const selectedFile = ref<string>();
const fileContent = ref<object | null>(null);

onMounted(() => {
  socket.emit("getFiles");

  socket.on("sendFiles", (res: string[]) => {
    files.value = res;
  });

  socket.on("sendFileContent", (res: object) => {
    fileContent.value = res;
  });
});

const getTranslation = (file: string) => {
  socket.emit("getFileContent", { file });
};
</script>

<template>
  <section>
    <q-select
      filled
      v-model="selectedFile"
      :options="files"
      :label="`${files.length} translations found`"
      @update:modelValue="getTranslation($event)"
    >
      <template v-slot:prepend>
        <q-icon name="language" />
      </template>
    </q-select>
  </section>
  <section>
    <pre v-if="fileContent">
      {{ fileContent }}
    </pre>
    <article v-if="!fileContent">
      <h2 class="text-h4 text-grey-9">Please select the i18n file to view.</h2>
    </article>
  </section>
</template>
