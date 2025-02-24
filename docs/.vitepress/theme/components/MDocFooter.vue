<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'
//环境变量
const DEV = inject('DEV') as Ref<boolean>
// const route = useRoute()

// const pageId = computed(() => route.path.replace('/mm-notes', ''))
</script>

<template>
  <div class="copyright">
    <!-- <img
      class="visitor"
      :src="`https://visitor-badge.laobi.icu/badge?page_id=maomao1996.notes.${pageId}`"
      title="当前页面累计访问数"
      onerror="this.style.display='none'"
    /> -->
    ©️ Copyright (c) 2024 wenhao
  </div>
  <p class="notice">
    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
      👮备案号:
      <span>蜀ICP备2024061733号-2</span>
    </a>
  </p>
</template>

<style scoped lang="scss">
.copyright {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}
.notice {
  text-align: center;
}

.visitor {
  margin-right: 8px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }
}
</style>
