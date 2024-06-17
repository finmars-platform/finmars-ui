<template>
    <div class="tabs_container">
        <div class="header">

            <button
                v-if="!swiperData.isBeginning || !swiperData.isEnd"
                class="slide_btn"
                :disabled="swiperData.isBeginning"
                @click="slidePrev"
            >
                <span class="material-icons">chevron_left</span>
            </button>

            <swiper ref="swiperElem" slides-per-view="auto" @swiper="onSwiperInit">
                <swiper-slide v-for="(tab, index) in tabs"
                              :key="tab.key">
                    <div
                        class="fm_tabs_item"
                        :class="{ active: tab.key == modelValue }"
                        @click="activateTab(tab.key)"
                    >
                        {{ tab.name }}
                    </div>
                </swiper-slide>
            </swiper>

            <button
                v-if="!swiperData.isBeginning || !swiperData.isEnd"
                class="slide_btn"
                :disabled="swiperData.isEnd"
                @click="slideNext"
            >
                <span class="material-icons">chevron_right</span>
            </button>

        </div>

        <div class="body">
            <slot :active-tab="activeTab" />
        </div>
    </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'


const props = defineProps({
    modelValue: String,
    /**
     * [
     *  {
     *      key: String|Number,
     *      name: String
     *  }
     * ]
     */
    tabs: {
        type: Array,
        validator(value, props) {
            return value && value.length;
        }
    },
})

const emit = defineEmits(['update:modelValue'])

const swiperElem = ref(null)


let swiperData = ref({})

const activeTabKey = ref('');

const activeTab = computed(() => {

    if (!activeTabKey.value) {
        return {};
    }

    const activeTabData = props.tabs.find(tabData => {
        return tabData.key === activeTabKey.value;
    });

    return activeTabData || {};

});

function applyModelValue(modelValue) {

    if (!modelValue) {
        return activeTabKey.value;
    }

    const keysList = props.tabs.map(tabData => tabData.key);

    if ( !keysList.includes(modelValue) ) {
        throw `There are not tab with the key: ${modelValue}`
    }

    return modelValue;

}

function onSwiperInit(swiperInst) {
    swiperData.value = swiperInst
}

function slidePrev() {
    swiperData.value.slidePrev()
}

function slideNext() {
    swiperData.value.slideNext()
}

function activateTab(key) {
    activeTabKey.value = key;
    emit("update:modelValue", activeTabKey.value);
}

function init() {

    activeTabKey.value = applyModelValue(props.modelValue);

    if (!activeTabKey.value) {
        activeTabKey.value = props.tabs[0].key;
    }

}

watch(
    () => props.modelValue,
    () => {

        activeTabKey.value = applyModelValue(props.modelValue);

    }
)

init();


</script>

<style lang="postcss">

.header {
    /*position: relative;
    display: flex;
    flex-wrap: nowrap;*/
    display: flex;
    background: transparent;
    color: var(--primary-color);

    .swiper {
        margin: initial;
    }

    .swiper-slide {
        width: auto;
        flex-shrink: 1;
    }
}

.fm_tabs_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 48px;
    padding: 12px 24px;
    text-wrap: nowrap;
}

.slide_btn {
    width: 32px;

    &:not([disabled]):hover {
        opacity: 0.5;
    }
}

</style>
