<script setup lang="ts">
import { formatValue } from '@/utils/format-value';
import { hasOnlyDigits } from '@/utils/has-only-digits';
import { ref, computed, nextTick, watch } from 'vue';

const props = defineProps<{
    modelValue: number;
    minWidth?: number;
    label?: string;
    caption?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
    (e: 'update:isFocused', value: boolean): void;
}>();

const isFocused = ref(false);
const rawValue = ref(String(props.modelValue));

const textRef = ref<HTMLElement | null>(null);

const textWidth = ref(0);

const formattedValue = computed(() => {
    if (!rawValue.value) return '';
    return formatValue(rawValue.value) || '0';
});

const inputWidth = computed(() => {
    const baseWidth = textWidth.value || 72;
    return Math.max(props.minWidth || 72, baseWidth + 8);
});

watch(
    formattedValue,
    async () => {
        await nextTick();
        if (textRef.value) {
            textWidth.value = textRef.value.offsetWidth;
        }
    },
    { immediate: true },
);

function digitsOnly(value: string) {
    return value.replace(/\D+/g, '');
}

function handleInput(e: any) {
    const el = e.target as HTMLInputElement;
    const digits = digitsOnly(el.value).replace(/^0+/, '');

    rawValue.value = digits;
    emit('update:modelValue', digits ? Number(digits) : 0);
}

function handleBeforeInput(e: InputEvent) {
    if (e.data && !hasOnlyDigits(e.data)) e.preventDefault();
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
    <div class="relative inline-flex flex-col">
        <label
            v-if="label"
			for="input-number"
            class="mb-3 font-[Koulen] text-base leading-3.75"
            :class="[isFocused ? 'text-primary' : 'text-dark']"
        >
            {{ label }}
        </label>

        <div class="relative h-11 min-w-18">
            <input
                type="text"
                inputmode="numeric"
				id="input-number"
                placeholder="0"
                :value="formattedValue"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @beforeinput="handleBeforeInput"
                class="absolute text-dark font-medium left-0 top-0 z-10 h-11 pr-4 text-lg outline-none"
                :style="{ width: inputWidth + 'px' }"
                :class="[
                    isFocused
                        ? 'outline-primary-light outline-1'
                        : 'outline-mid-grey',
                    'rounded px-2 py-1 text-lg outline-mid-grey border-mid-grey',
                ]"
            />
            <div
                class="absolute left-0 top-0 h-11 rounded-md box-border border"
                :class="[
                    isFocused
                        ? ['border-[1.5px]', 'border-primary-light']
                        : ['border-mid-grey'],
                ]"
                :style="{ width: inputWidth + 'px' }"
            />

            <span
                v-if="caption"
                class="absolute text-dark top-1/2 -translate-y-1/2 whitespace-nowrap text-lg select-none"
                :style="{
                    left: inputWidth + 12 + 'px',
                }"
            >
                {{ caption }}
            </span>
        </div>

        <span
            ref="textRef"
            class="absolute invisible whitespace-pre px-2 pr-4 text-lg"
        >
            {{ formattedValue }}
        </span>
    </div>
</template>
