<template>
    <Box>
        <div class="columns">
            <div class="column is-3">
                {{ task.title || 'Tarefa sem título' }}
            </div>
            <div class="column is-3">
                {{ task.description || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-2">
                <Stopwatch :time="task.durationInSeconds" />
            </div>
            <div class="column is-2 is-flex-direction-column">
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
import Stopwatch from '../components/Stopwatch.vue'
import Box from '../components/Box.vue'
import ITasks from '../interfaces/ITasks';

export default defineComponent({
    name: "Todolist",
    emits: ['deleteBtn', 'editBtn'],
    components: {
        Stopwatch,
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

        gethour() {
            // Here a date has been assigned 
            // while creating Date object 
            let A = new Date();

            // hour from above is being 
            // extracted using getHours() 
            let B = A.getHours();

            // Printing hour. 
            console.log(B);

        }

    },
})
</script>
