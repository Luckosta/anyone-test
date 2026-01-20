<script setup lang="ts">
import { store } from '@/store';
import InputNumber from './InputNumber.vue';
import { ref } from 'vue';

function updateMinimumAge(value: string) {
    store.minimumAgeInMonths = Number(value) || 0;
}

const inputFocused = ref(false);
</script>

<template>
    <div class="flex flex-col gap-4">
        <router-link to="/" class="text-violet-600 hover:underline text-sm"
            >&larr; Back</router-link
        >

        <h1 class="text-xl font-bold text-gray-700">Settings</h1>

        <InputNumber
            id="min-age-input"
            v-model="store.minimumAgeInMonths"
            v-model:isFocused="inputFocused"
            :label="'MINIMUM AGE'"
            caption="months"
            @input="updateMinimumAge"
        />
    </div>
</template>
