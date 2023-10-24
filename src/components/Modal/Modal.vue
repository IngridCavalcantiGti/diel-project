<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ titleModal }}</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <label class="label">Título</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Título" v-model="title" maxlength="25">
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
                <div class="mt-5">
                    <input class="input" v-model="newTag" @keyup.enter="addTag" placeholder="Adicione tag" maxlength="10" />
                    <div class="flex items-center flex-wrap">
                        <span v-for="(tag, index) in tags" class="tag is-warning is-medium mr-2 mt-4" :key="index">
                            {{ tag }}
                            <button @click="deleteTag(tag)" class="delete is-small"></button>
                        </span>
                    </div>
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
import { defineComponent, PropType } from 'vue';
import ITasks from '../../interfaces/ITasks';
export default defineComponent({
    name: 'Modal',
    props: {
        titleModal: { type: String },
        formData: { type: Object as PropType<ITasks> }
    },
    emits: ['cancelModal', 'saveTask'],
    data() {
        return {
            id: '',
            title: '',
            description: '',
            time: '',
            date: '',
            newTag: '',
            tags: [] as string[],
        };
    },
    created() {
        this.title = this.formData?.title ?? ''
        this.description = this.formData?.description ?? ''
        this.time = this.formData?.time ?? ''
        this.date = this.formData?.date ? this.formData?.date.split('/').reverse().join('-') : ''
        this.tags = this.formData?.tags ?? []
        this.id = this.formData?.id ?? new Date().toISOString()
    },
    methods: {
        close() {
            this.$emit('cancelModal');
        },
        addTag(tags: ITasks) {
            if (!this.newTag) return;
            this.tags.push(this.newTag);
            this.newTag = '';
        },
        deleteTag(tags: ITasks) {
            this.tags.splice(this.tags.indexOf(tags), 1);
        },

        finishTask() {
            this.$emit('saveTask', {
                task: {
                    description: this.description,
                    date: this.date.split('-').reverse().join('/'),
                    title: this.title,
                    time: this.time,
                    id: this.id,
                    tags: this.tags
                },
                edit: this.formData?.id
            })
            this.description = ''
            this.title = ''
            this.date = ''
            this.time = ''
            this.tags = []
            this.id = ''
        },

    },
})
</script>

<style scoped>
@import './Modal.css';
</style>