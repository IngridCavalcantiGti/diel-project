<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Stopwatch :time="timeInSeconds" />
        <button class="button" @click="start" :disabled="stopwatchRunning">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
        </button>
        <button class="button" @click="finish" :disabled="!stopwatchRunning">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Stopwatch from '../components/Stopwatch.vue'


export default defineComponent({
    name: 'Timer',
    emits: ['finishedTimer'],
    components: {
        Stopwatch
    },
    data() {
        return {
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchRunning: false
        };
    },
    methods: {
        start() {
            this.stopwatchRunning = true
            this.stopwatch = setInterval(() => {
                this.timeInSeconds++;
            }, 1000);
        },
        finish() {
            this.stopwatchRunning = false
            clearInterval(this.stopwatch)
            this.$emit('finishedTimer', this.timeInSeconds)
            this.timeInSeconds = 0
        }
    },
})
</script>