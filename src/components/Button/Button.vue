<template>
    <div class="back-css">
        <button class="button is-info is-light is-medium" @click="() => $emit('onClickRegister')">
            Cadastrar tarefa
            <span class="icon is-small mx-1">
                <i class="fas fa-plus"></i>
            </span>
        </button>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Button',
})
</script>

<style>
@import './Button.css';
</style>