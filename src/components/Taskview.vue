<template>
    <div class="select is-normal">
        <select name="taskview" class="custom-select" @change="updateSelect">
            <option v-for="(item, index) in options" :key="index" :value="item"> {{ item }} </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Taskview',
    emits: ['updateValue'],
    props: {
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: String,
        },
    },
    methods: {
        updateSelect(event: Event) {
            this.$emit("updateValue", event.target.value)
        }
    }

});
</script>

