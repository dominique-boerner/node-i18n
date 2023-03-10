<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSocketIO } from "@/hooks/useSocketIO";

import VueJsonPretty from "vue-json-pretty";
import internal from "stream";

const { socket } = useSocketIO();
const files = ref<string[]>([]);
const selectedFile = ref<string>();
const fileContent = ref<object | null>(null);

interface I18nFile {
  [key: string]: string;
}

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

const createTreeNode = (object: any): any => {
  return Object.keys(object).map((value: string) => {
    if (typeof object[value] === "object") {
      return {
        label: value,
        children: createTreeNode(object[value]),
      };
    }
    return { label: value };
  });
};

const generateTree = (content: I18nFile) => {
  return [
    {
      label: selectedFile.value,
      header: "root",
      children: createTreeNode(content),
    },
  ];
};
</script>

<template>
  <section>
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <q-select
            v-model="selectedFile"
            :options="files"
            :label="`${files.length} translations found`"
            @update:modelValue="getTranslation($event)"
            style="width: 300px"
          >
            <template v-slot:prepend>
              <q-icon name="language" />
            </template>
          </q-select>
          <q-btn
            v-if="fileContent"
            primary
            color="primary"
            label="add translation"
            icon="add"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </section>
  <section>
    <article v-if="fileContent">
      <h1 class="text-h5">{{ selectedFile }}</h1>
      <q-card>
        <q-card-section>
          <vue-json-pretty :data="fileContent" :showLineNumber="true">
            <template #renderNodeKey="{ node, defaultKey }">
              <span class="text-grey-9 text-bold">{{ defaultKey }}</span>
            </template>
            <template #renderNodeValue="{ node, defaultValue }">
              <span class="text-secondary text-bolder">{{ defaultValue }}</span>
            </template>
          </vue-json-pretty>
        </q-card-section>
      </q-card>

      <q-tree
        :accordion="true"
        :default-expand-all="true"
        :nodes="generateTree(fileContent)"
        node-key="label"
      >
        <template v-slot:header-root="prop">
          <div class="row items-center">
            <h2 class="text-h4">
              {{ prop.node.label }}
            </h2>
          </div>
        </template>
        <template v-slot:default-header="prop">
          <div v-if="prop.node.header !== 'root' && !prop.node.children">
            <q-input filled :label="prop.node.label"></q-input>
          </div>
        </template>
      </q-tree>
    </article>
    <article class="empty-state" v-if="!fileContent">
      <img
        class="translate-icon"
        src="@/assets/img/language.png"
        alt="translation"
      />
      <h2 class="text-h5 text-grey-9">Please select the i18n file to view.</h2>
    </article>
  </section>
</template>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  .translate-icon {
    width: 200px;
  }
}
</style>
