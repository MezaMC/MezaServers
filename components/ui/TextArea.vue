<script setup lang="ts">
const textArea = ref<HTMLTextAreaElement>()
const wrapper = ref<HTMLDivElement>()
const content = defineModel<string>()

const updateHeight = () => {
  if (!wrapper.value?.dataset || !textArea.value) return
  wrapper.value.dataset.replicatedValue = textArea.value.value
}

onMounted(updateHeight)
</script>

<template>
  <div class="grow-wrap" ref="wrapper">
    <textarea
        v-bind="$attrs" ref="textArea" v-model="content"
        @input="updateHeight" @focus="updateHeight" @blur="updateHeight" />
  </div>
</template>

<style scoped lang="scss">
.grow-wrap {
  display: grid;
  position: relative;
  width: 100%;
  min-height: 2.5rem;

  &::after {
    content: attr(data-replicated-value) " ";
    white-space: pre-wrap;
    visibility: hidden;
    padding: 10px 12px;
    line-height: 1.5;
    grid-area: 1 / 1 / 2 / 2;
    word-wrap: break-word;
    box-sizing: border-box;
    overflow-wrap: anywhere;
  }

  > textarea {
    grid-area: 1 / 1 / 2 / 2;
    resize: none;
    overflow: hidden;
    padding: 10px 12px;
    line-height: 1.5;
    box-sizing: border-box;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
}
</style>