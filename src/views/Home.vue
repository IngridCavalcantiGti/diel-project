<template>
    <div>
        <Modal @saveModal="saveModal" v-show="isModalVisible" @cancelModal="cancelModal" @saveTask="saveTask" />
        <div class="list">
            <Button @onClickRegister="onClickRegister" class="mb-5 h-button" />
            <div class="is-flex  mt-5 flex-container h-task-view">
                <input type="text" class="input column is-8 mb-6 mr-5 " placeholder="Buscar tarefa" v-model="searchValue">
                <Taskview :options="options" @updateValue="updateValueSelect" />

            </div>
            <div class="table-wrapper columns table-heading header-mobile">
                <div class="column is-3 fl-custom">Título:</div>
                <div class="column is-3 fl-custom">Descrição:</div>
                <div class="column is-2 fl-custom">Tempo gasto:</div>
                <div class="column is-2 fl-custom">Data / Horário:</div>
                <div class="column is-2 fl-custom">Ações:</div>
            </div>
            <Todolist v-for="task in filteredTask" :key="task.id" :task="task" @deleteBtn="deleteBtn(task.id)"
                @editBtn="editBtn" class="todolist-mobile" />
            <Box v-if="emptyList" class="todolist-mobile">
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
import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'

export default defineComponent({
    name: "App",
    components: {
        Form,
        Todolist,
        Box,
        Taskview,
        Modal,
        Button
    },

    data() {
        return {
            // tasks: [{ title: 'Maria' }, { title: 'Pedro', }, { title: 'joão', }] as ITasks[],
            tasks: [] as ITasks[],
            searchValue: '',
            options: ['Visualização de tarefas', 'Dia', 'Semana', 'Mês'],
            isModalVisible: false,
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
            this.isModalVisible = true
        },
        updateValueSelect(value: string) {
            console.log('updateValueSelect', value)
        },
        saveModal() {
            this.isModalVisible = false
        },
        cancelModal() {
            this.isModalVisible = false
        },
        onClickRegister() {
            this.isModalVisible = true
        }

    }
});
</script>
<style scoped>
/* .table-heading {
    background: #a0aeee;
} */

.list {
    padding: 2rem;
}

.table-heading {
    display: flex;
    flex-wrap: wrap;
    font-weight: bold;
    padding: 12px;
}

.h-task-view {
    margin-bottom: 50px;
}

.fl-custom {
    color: #ffffff;
    background: #a0aeee;
}

.fl-custom:nth-child(odd) {
    color: #ffffff;
    background: #7283cc;
}

@media (max-width: 800px) {
    .flex-container {
        flex-direction: column;
    }
}

@media (max-width: 535px) {
    .header-mobile {
        display: none;
    }

    .todolist-mobile {
        margin-top: 100px;
    }
}
</style>