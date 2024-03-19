<script setup lang="ts">
import { inject, Ref } from 'vue'

const DEV = inject('DEV') as Ref<boolean>
</script>

<template>
  <div></div>
  <!-- <img
    class="visitor"
    src="https://komarev.com/ghpvc/?username=wenhaohub&label=views&color=0e75b6&style=flat"
    alt="wenhaohub"
  /> -->
  <!-- <img
    v-if="!DEV"
    class="visitor"
    src="https://visitor-badge.laobi.icu/badge?page_id=maomao1996.notes"
    onerror="this.style.display='none'"
  /> -->
</template>

<style scoped>
.visitor {
  margin-left: 10px;
}
@media (min-width: 768px) and (max-width: 920px) {
  .visitor {
    display: none;
  }
}
</style>
