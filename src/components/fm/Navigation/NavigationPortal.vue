<template>
  <div v-if="isNavigationLoading" class="navigation-loader-state">
    <ProgressCircular :size="30" indeterminate />
  </div>
  <template v-else>
    <Navigation
      :items="routingItems"
      :alternativeLink="alternativeLink"
      :base="base"
      :route="route"
      @resizeSideNav="emit('resizeSideNav', $event)"
    />
  </template>
</template>

<script setup>
  import ProgressCircular from '@/components/fm/ProgressCircular/ProgressCircular.vue';
  import Navigation from '@/components/fm/Navigation/Navigation.vue';
  import { computed, onMounted, ref, watch } from 'vue';

  const props = defineProps({
    isFloat: {
      type: Boolean
    },
    base: {
      type: String
    },
    alternativeLink: {
      type: String
    },
    route: {
      type: Object
    },
    isVue: {
      type: Boolean
    },
    items: {
      type: Array,
      required: true
    }
  });

  const routingItems = ref([]);
  const isNavigationLoading = ref(true);

  const emit = defineEmits(['resizeSideNav']);

  const route = computed(() => {
    if (props.route) return props.route;
    const segments = window.location.pathname?.split('/');
    const realm_code = segments.find((item) => item.includes('realm')) || 'realm03va3';
    const space_code = segments.find((item) => item.includes('space')) || 'space027ho';
    return { params: { realm_code, space_code } };
  });

  function getUrlToOldApp(suffix) {
    console.log('00000 - getUrlToOldApp - suffix', suffix);
    const store = route.value.params;
    console.log('00000 - getUrlToOldApp - store', store);
    let apiUrl = '';
    console.log('00000 - getUrlToOldApp - props.isVue', props.isVue);
    console.log('00000 - getUrlToOldApp - props.base', props.base);
    console.log('00000 - getUrlToOldApp - window.location.origin', window.location.origin);
    if (props.isVue && props.base !== window.location.origin) {
      apiUrl = props.base;
      console.log('00000 - getUrlToOldApp - apiUrl', apiUrl);
    }
    let baseApiUrl = '';

    if (store.realm_code) {
      console.log('00000 - getUrlToOldApp - realm_code', store.realm_code, store.space_code);
      baseApiUrl = '/' + store.realm_code + '/' + store.space_code;
      console.log('00000 - getUrlToOldApp - 1 baseApiUrl', baseApiUrl);
    } else {
      baseApiUrl = '/' + store.isUrlValid;
      console.log('00000 - getUrlToOldApp - 2 baseApiUrl', baseApiUrl);
    }
    console.log('00000 - getUrlToOldApp - return ', `${apiUrl}${baseApiUrl}/a/#!${suffix}`);
    return `${apiUrl}${baseApiUrl}/a/#!${suffix}`;
  }

  function useGetNuxtLink(linkEnd) {
    console.log('00000 - useGetNuxtLink - linkEnd', linkEnd);
    const store = route.value.params;
    let apiUrl = '';
    console.log('00000 - useGetNuxtLink - store', store);
    if (!props.isVue && props.base) {
      apiUrl = props.base;
      console.log('00000 - useGetNuxtLink - apiUrl', apiUrl);
    }

    const realm_code = store['realm_code'];
    const space_code = store['space_code'];

    console.log('00000 - useGetNuxtLink - realm_code, space_code ', realm_code, space_code);

    console.log(
      '00000 - useGetNuxtLink - return ',
      apiUrl + '/' + realm_code + '/' + space_code + '/v' + linkEnd
    );
    return apiUrl + '/' + realm_code + '/' + space_code + '/v' + linkEnd;
  }

  function handleItems(items) {
    console.log('00000 - NavigationPortapl handleItems - items out try', items);
    try {
      console.log('00000 - NavigationPortapl handleItems - items inside try', items);
      return items.map((item) => {
        console.log('00000 - NavigationPortapl handleItems - item.to', item);
        if (item.to && item.to !== '') {
          item.to = useGetNuxtLink(item.to);
        }
        console.log('00000 - NavigationPortapl handleItems - item.href', item);
        if (item.href && item.href !== '') {
          item.href = getUrlToOldApp(item.href);
        }
        console.log('00000 - NavigationPortapl handleItems - items children', item.children);
        if (item.children) {
          item.children = handleItems(item.children);
        }
        console.log('00000 - NavigationPortapl handleItems - items return', item);
        return item;
      });
    } catch (err) {
      console.log('handleItems catch', err);
    }
  }

  watch(
    () => props.items,
    async () => {
      console.log('00000 - NavigationPortapl watch before - props.items', props.items);
      isNavigationLoading.value = true;
      routingItems.value = await handleItems(props.items);
      console.log('00000 - NavigationPortapl watch after - props.items', props.items);
      isNavigationLoading.value = false;
    }
  );

  onMounted(() => {
    console.log('00000 - NavigationPortapl onMounted');
  });
</script>

<style lang="postcss">
  .navigation-loader-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    min-width: 360px;
  }

  .first-side-nav {
    @apply mt-[16px] block;
  }

  .separator-side-nav {
    @apply mb-[8px];

    &::after {
      content: '';
      @apply block h-px bg-[var(--sidenav-borderColor)] my-2 mx-4;
    }
  }
</style>
