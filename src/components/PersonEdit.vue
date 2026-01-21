<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '@/store';
import InputNumber from './InputNumber.vue';

const route = useRoute();

const inputFocused = ref(false);

const person = computed(() => {
    const id = Number(route.params.id);
    return store.people.find((p) => p.id === id);
});
</script>

<template>
    <div v-if="person" class="flex flex-col gap-4">
        <router-link to="/" class="text-violet-600 hover:underline text-sm"
            >&larr; Back</router-link
        >

        <div class="flex items-center gap-[16px]">
            <div class="relative w-20 h-20">
                <img
                    src="/cat.png"
                    :alt="person.name"
                    class="w-20 h-20 rounded-full object-cover"
                />
                <div
                    class="pointer-events-none absolute -inset-0.75 rounded-full border border-primary"
                    :class="{
                        'opacity-100 scale-100': inputFocused,
                        'opacity-0 scale-95': !inputFocused,
                    }"
                ></div>
            </div>

            <InputNumber
                v-model="person.ageInHours"
                v-model:isFocused="inputFocused"
                :label="person.name + ' is'"
                label-color="text-dark"
                active-label-color="text-primary"
                caption="hours old"
            />
        </div>
    </div>

    <div v-else>
        <p class="text-gray-600">Person not found</p>
        <router-link to="/" class="text-violet-600 hover:underline text-sm"
            >Back to list</router-link
        >
    </div>
</template>
