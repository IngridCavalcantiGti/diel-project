<template>
    <div>
        <Modal :titleModal="titleModal" v-if="isModalVisible" @cancelModal="cancelModal" @saveTask="saveTask"
            :formData="currentTask" />
        <div class="list">
            <Button @onClickRegister="onClickRegister" class="mb-5 h-button" />
            <div class="is-flex  mt-5 flex-container h-task-view">
                <input type="text" class="input column is-8 mb-6 mr-5 " placeholder="Buscar tarefa" v-model="searchValue">
                <Taskview :options="options" @updateValue="updateValueSelect" />

            </div>
            <div class="table-wrapper columns table-heading header-mobile">
                <div class="column is-3 fl-custom">Título:</div>
                <div class="column is-3 fl-custom">Descrição:</div>
                <div class="column is-2 fl-custom">Tags:</div>
                <div class="column is-2 fl-custom">Data | Horário:</div>
                <div class="column is-2 fl-custom">Ações:</div>
            </div>
            <Todolist v-for="(task, id) in filteredTask" :key="id" :task="task" @deleteBtn="deleteBtn(task)"
                @editBtn="editBtn(task)" class="todolist-mobile" />
            <Box v-if="emptyList" class="todolist-mobile">
                Você não está produtivo hoje :(
            </Box>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Todolist from '../../components/Todolist/Todolist.vue';
import ITasks from '../../interfaces/ITasks'
import Box from '../../components/Box/Box.vue'
import Taskview from '../../components/Taskview/Taskview.vue'
import Modal from '../../components/Modal/Modal.vue'
import Button from '../../components/Button/Button.vue'

export default defineComponent({
    name: "App",
    components: {
        Todolist,
        Box,
        Taskview,
        Modal,
        Button
    },

    data() {
        return {
            tasks: [] as ITasks[],
            searchValue: '',
            options: ['Visualização de tarefas', 'Dia', 'Semana', 'Mês'],
            isModalVisible: false,
            isEdit: false,
            currentTask: {} as ITasks
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

        },
        titleModal() {
            return Object.keys(this.currentTask).length === 0 ? "Criar nova tarefa" : "Editar tarefa"
        }
    },

    methods: {
        saveTask({ task, edit }: { task: ITasks, edit: boolean }) {
            if (edit) {
                const taskIndex = this.tasks.findIndex((item) => {
                    return item.id === task.id
                })
                this.tasks[taskIndex] = { ...task }
            } else {
                this.tasks.push(task)
            }
            this.isModalVisible = false
            this.currentTask = {} as ITasks
        },
        deleteBtn(id: ITasks) {
            this.tasks.splice(this.tasks.indexOf(id), 1);
        },
        editBtn(task: ITasks) {
            this.isModalVisible = true
            this.currentTask = task
        },
        updateValueSelect(value: string) {
            console.log('updateValueSelect', value)
        },

        cancelModal() {
            this.isModalVisible = false
            this.currentTask = {} as ITasks
        },
        onClickRegister() {
            this.isEdit = false
            this.isModalVisible = true
        }

    },
});
</script>
<style scoped>
@import "./Home.css";
</style>