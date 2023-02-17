<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSocketIO } from "@/hooks/useSocketIO";

import VueJsonPretty from "vue-json-pretty";

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

const nodeClick = (node: any) => {
  console.log(node);
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
    <article v-if="fileContent">
      <h1 class="text-h5">{{ selectedFile }}</h1>
      <q-card class="my-card">
        <q-card-section>
          <vue-json-pretty
            :data="fileContent"
            :showLineNumber="true"
            @nodeClick="nodeClick($event)"
          >
            <template #renderNodeKey="{ node, defaultKey }">
              <span class="text-grey-9 text-weight-bolder">{{
                defaultKey
              }}</span>
            </template>
            <template #renderNodeValue="{ node, defaultValue }">
              <span class="text-primary">{{ defaultValue }}</span>
            </template>
          </vue-json-pretty>
        </q-card-section>
      </q-card>
    </article>
    <article v-if="!fileContent">
      <h2 class="text-h4 text-grey-9">Please select the i18n file to view.</h2>
    </article>
  </section>
</template>
