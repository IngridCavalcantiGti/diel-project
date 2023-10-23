<template>
    <Box>
        <div class="columns">
            <div class="column is-3">
                {{ task.title || 'Tarefa sem título' }}
            </div>
            <div class="column is-3">
                {{ task.description || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-2 is-flex-direction-column">
                <span class="tag is-warning is-medium mr-2 mt-4">
                    {{ task.tags || "sem tags" }}
                </span>
            </div>
            <div class="column is-2">
                <span class="mr-2">{{ task.date || 'sem data' }}</span>
                <span>{{ task.time }}</span>
            </div>
            <div class="column is-2 is-flex is-justify-content-space-around">
                <button class="button is-link " @click="editBtn">
                    <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                    </span>
                </button>
                <button class="button is-danger" @click="deleteBtn">
                    <span class="icon is-small">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Box from '../components/Box.vue'
import ITasks from '../interfaces/ITasks';

export default defineComponent({
    name: "Todolist",
    emits: ['deleteBtn', 'editBtn'],
    components: {
        Box
    },
    props: {
        task: { type: Object as PropType<ITasks>, required: true }
    },
    data() {
        return {
            date: '',
        }
    },
    methods: {
        deleteBtn() {
            this.$emit('deleteBtn', this.task)
        },
        editBtn() {
            this.$emit('editBtn', this.task)
        },
    },
})
</script>
