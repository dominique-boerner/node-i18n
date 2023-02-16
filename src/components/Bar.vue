<script setup lang="ts">
import { matLanguage } from "@quasar/extras/material-icons";
</script>

<template>
  <div class="window-width bg-primary text-white">
    <q-bar>
      <q-btn dense flat :icon="matLanguage" />
      <div class="cursor-pointer non-selectable">
        Translation
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section inline>New translation</q-item-section>
              <q-item-section side>
                <q-icon name="add" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        Settings
        <q-menu auto-close>
          <q-list dense style="min-width: 100px">
            <q-item clickable>
              <q-item-section>Configure...</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <q-space />

      <q-btn dense flat icon="minimize" />
      <q-btn dense flat icon="crop_square" />
      <q-btn dense flat icon="close" />
    </q-bar>
  </div>
</template>
