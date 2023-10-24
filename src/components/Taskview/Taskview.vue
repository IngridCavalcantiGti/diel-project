<template>
    <div class=" is-normal is-link control has-icons-left">
        <div class="control has-icons-left">
            <div class="select is-link">
                <select name="taskview" @change="updateSelect">
                    <option v-for="(item, index) in options" :key="index" :value="item"> {{ item }} </option>
                </select>
            </div>
            <div class="icon is-left">
                <i class="fa-solid fa-list-check " style="color: #5766b2;"></i>
            </div>
        </div>
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

