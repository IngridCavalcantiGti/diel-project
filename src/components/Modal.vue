<template>
    <div class="modal is-active" v-show="showModal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Tarefa</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <label class="label">Título</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Título" v-model="title">
                </div>
                <label class=" label mt-2">Descrição</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Descrição" maxlength="100" v-model="description"></textarea>
                </div>
                <div class="is-flex  mt-4">
                    <label class="label mr-3">Data</label>
                    <input class="input" type="date" placeholder="Text input" v-model="date">
                    <label class="label mx-3">Hora</label>
                    <input class="input" type="time" placeholder="Text input" v-model="time">
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-link" @click="finishTask">Salvar</button>
                <button class="button is-link is-light" @click="close">Cancelar</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Modal',
    emits: ['saveModal', 'cancelModal', 'saveTask'],
    data() {
        return {
            showModal: false,
            title: '',
            description: '',
            time: '',
            date: ''
        };
    },
    methods: {
        save() {
            this.$emit('saveModal', this.showModal = false);
            console.log('save');
        },
        close() {
            this.showModal = false;
            this.$emit('cancelModal', this.showModal = false);
        },

        finishTask() {
            this.$emit('saveTask', {
                // durationInSeconds: elapsedTime,
                description: this.description,
                date: this.date.split('-').reverse().join('/'),
                title: this.title,
                time: this.time,
                id: new Date().toISOString()
            })
            this.$emit('saveModal', this.showModal = false);
            this.description = ''
            this.title = ''
            this.date = ''
            this.time = ''
        }
    },
})
</script>

<style scoped>
textarea {
    resize: none;
}

.modal-card-head {
    background: #d1d7f3;
}
</style>