<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSocketIO } from "@/hooks/useSocketIO";

const { socket } = useSocketIO();
const files = ref<string[]>([]);
const selectedFile = ref<string>();

onMounted(() => {
  socket.emit("getFiles");

  socket.on("sendFiles", (res: string[]) => {
    files.value = res;
  });
});
</script>

<template>
  <section>
    <q-select
      filled
      v-model="selectedFile"
      :options="files"
      :label="`${files.length} translations found`"
    >
      <template v-slot:prepend>
        <q-icon name="language" />
      </template>
    </q-select>
  </section>
</template>
