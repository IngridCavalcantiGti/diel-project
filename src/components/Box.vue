<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Box"
})
</script>

<style scoped>
.box {
    background: transparent;
    border-left: 10px solid #a0aeee;
    border-right: 10px solid #a0aeee;
}
</style>