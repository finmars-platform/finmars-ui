<template>
	<base-input
		v-bind="$attrs"
        :model-value="modelValue"
		:label="label"
        :left-icon="noIndicatorButton ? null : 'edit'"
		:placeholder="placeholder"
		:tooltip="tooltip"
		:error-data="errorData"
		@update:modelValue="newVal => emit('update:modelValue', newVal)"
		@update:errorData="newVal => emit('update:errorData', newVal)"
        @leftButtonClick="textEditorIsOpened = true"
	/>

    <base-modal
        v-model="textEditorIsOpened"
        :title="label"
        @open="onTextEditorOpen"
    >
        <div class="width-100 height-100">
            <!-- TODO: replace the textarea bellow with a FmInputTextarea -->
            <textarea
                ref="textEditorTextarea"
                v-model="textEditorValue"
                class="h-full w-full resize-none bg-transparent p-1 border
border-solid -border--input-borderColor -rounded--input-borderRadius
focus:-border--input-focus-borderColor focus:outline-0
                "
            ></textarea>
        </div>

        <template #footer>
            <div class="flex justify-between">
                <fm-btn @click="textEditorIsOpened = false">CANCEL</fm-btn>

                <fm-btn type="filled" @click="onSave">OK</fm-btn>
            </div>
        </template>
    </base-modal>
</template>

<script setup>
    import {ref, watch, nextTick} from "vue";
    import BaseInput from "../../base/input/index.vue";
    import BaseModal from "../../base/modal/index.vue";

	let props = defineProps({
		modelValue: String,
		label: String,
		placeholder: String,
		tooltip: String,
		required: Boolean,
        noIndicatorButton: Boolean,
		errorData: Object,
	})

	let emit = defineEmits(['update:modelValue', 'update:errorData'])

	let textEditorIsOpened = ref(false);
    let textEditorTextarea = ref(null);
	let textEditorValue = ref('');

    async function onTextEditorOpen() {
        await nextTick();
        textEditorTextarea.value.focus();
    }

    function onSave() {
        emit("update:modelValue", textEditorValue.value);
        textEditorIsOpened.value = false;
    }

	watch(
		textEditorIsOpened,
		() => {
			if (textEditorIsOpened.value) textEditorValue.value = props.modelValue;
		}
	)

</script>
