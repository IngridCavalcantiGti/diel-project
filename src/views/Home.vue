<template>
    <div>
        <Form @saveTask="saveTask" />
        <div class="list">
            <div class="is-flex">
                <input type="text" class="input column is-8 mb-6 mr-5" placeholder="Buscar tarefa" v-model="searchValue">
                <Taskview :options="options" @updateValue="updateValueSelect" />

            </div>

            <Todolist v-for="task in filteredTask" :key="task.id" :task="task" @deleteBtn="deleteBtn(task.id)"
                @editBtn="editBtn" />
            <Box v-if="emptyList">
                Você não está produtivo hoje :(
            </Box>
        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Form from '../components/Form.vue'
import Todolist from '../components/Todolist.vue';
import ITasks from '../interfaces/ITasks'
import Box from '../components/Box.vue'
import Taskview from '../components/Taskview.vue'

export default defineComponent({
    name: "App",
    components: {
        Form,
        Todolist,
        Box,
        Taskview
    },

    data() {
        return {
            // tasks: [{ title: 'Maria' }, { title: 'Pedro', }, { title: 'joão', }] as ITasks[],
            tasks: [] as ITasks[],
            searchValue: '',
            options: ['Visualização de tarefas', 'Dia', 'Semana', 'Mês']
        }
    },
    computed: {
        emptyList(): boolean {
            return this.tasks.length === 0
        },
        filteredTask() {
            return !this.searchValue.length
                ? this.tasks
                : this.tasks.filter(item => item.title.toLowerCase().includes(this.searchValue.toLowerCase().trim()));

        }
    },
    methods: {
        saveTask(task: ITasks) {
            this.tasks.push(task)
        },
        deleteBtn(id: string) {
            this.tasks.splice(id, 1)
            // console.log('position', position)
            // console.log('id', id)
            // this.tasks.splice(+id, 1).toString();

        },
        editBtn() {
            console.log('edit')
        },
        updateValueSelect(value: string) {
            console.log(value)
        }

    }
});
</script>
<style scoped>
.list {
    padding: 2rem;
}
</style>