<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    modelValue: number;
    isFocused: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
    (e: 'update:isFocused', value: boolean): void;
}>();

const isFocused = ref(false);

const rawValue = ref(String(props.modelValue));

const formattedValue = computed(() => {
    if (!rawValue.value) return '';
    return rawValue.value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

const inputWidth = computed(() => {
    const len = formattedValue.value.length;
    return Math.max(72, len * 10);
});

function digitsOnly(value: string) {
    return value.replace(/\D+/g, '');
}

function handleInput(e: any) {
    const el = e.target as HTMLInputElement;
    const digits = digitsOnly(el.value).replace(/^0+/, '');

    rawValue.value = digits;
	emit("update:modelValue", digits ? Number(digits) : 0);
}

function handleBeforeInput(e: InputEvent) {
    if (e.data && !/^\d+$/.test(e.data)) e.preventDefault();
}

function handleFocus() {
    isFocused.value = true;
    emit('update:isFocused', true);
}

function handleBlur() {
    isFocused.value = false;
    emit('update:isFocused', false);
}
</script>

<template>
    <input
        type="text"
        inputmode="numeric"
        placeholder="0"
        :value="formattedValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @beforeinput="handleBeforeInput"
        class="border border-gray-300 rounded px-2 py-1 text-lg outline-none"
        :style="{ width: inputWidth + 'px' }"
        :class="[isFocused ? 'border-violet-500' : 'border-gray-300', 'rounded px-2 py-1 text-lg outline-none']"
    />
</template>
