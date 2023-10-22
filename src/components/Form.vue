<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input column is-7 mb-3" placeholder="Título" v-model="title" />
                <input type="text" class="input mb-3" placeholder="Descrição" v-model="description" />
                <div class="is-flex">
                    <input type="date" class="input  column is-5" v-model="date" />
                    <input type="time" class="input  column is-2 ml-3" v-model="time" />
                </div>

            </div>
            <div class="column">
                <Timer @finishedTimer="finishTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Timer from '../components/Timer.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Form',
    emits: ['saveTask'],
    components: {
        Timer
    },
    data() {
        return {
            description: '',
            date: '',
            title: '',
            time: '',
        }
    },
    methods: {
        finishTask(elapsedTime: number): void {
            this.$emit('saveTask', {
                durationInSeconds: elapsedTime,
                description: this.description,
                date: this.date.split('-').reverse().join('/'),
                title: this.title,
                time: this.time,
                id: new Date().toISOString()
            })

            this.description = ''
            this.title = ''
            this.date = ''
            this.time = ''
        }
    }

})
</script>
<style scoped>
.box {
    background: rgb(72, 143, 172);
}
</style>