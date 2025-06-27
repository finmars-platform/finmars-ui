<template>
  <Navigation
    v-if="transformedItems?.length"
    :items="transformedItems"
    :alternativeLink="alternativeLink"
    :base="base"
    :route="route"
    @resizeSideNav="emit('resizeSideNav', $event)"
  />
  <div v-else-if="isLoading" class="navigation-info-state">
    <ProgressCircular :size="30" indeterminate />
  </div>
  <div v-else class="navigation-info-state">
    <span>Sidebar is not configured.</span>
    <span>Contact workspace administrator: ***</span>
  </div>
</template>

<script setup>
  import ProgressCircular from '@/components/fm/ProgressCircular/ProgressCircular.vue';
  import Navigation from '@/components/fm/Navigation/Navigation.vue';
  import { computed, ref } from 'vue';

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

  const emit = defineEmits(['resizeSideNav']);

  const isLoading = ref(true);

  const route = computed(() => {
    if (props.route) return props.route;
    const segments = window.location.pathname?.split('/');
    const realm_code = segments.find((item) => item.includes('realm')) || 'realm03va3';
    const space_code = segments.find((item) => item.includes('space')) || 'space027ho';
    return { params: { realm_code, space_code } };
  });

  function transformItems(items) {
    if (!Array.isArray(items)) {
      isLoading.value = true;
      return [];
    }

    if (!items.length) {
      isLoading.value = false;
      return [];
    }

    return items.map((item, index) => {
      const newItem = { ...item };
      const isLast = index === items.length - 1;

      console.log('newItem', newItem);

      if (newItem.href) {
        newItem.href = getUrlToOldApp(newItem.href, route.value.params, newItem.relative_link);
      }

      if (newItem.to) {
        newItem.to = useGetNuxtLink(newItem.to, route.value.params);
      }

      if (newItem.children && Array.isArray(newItem.children)) {
        newItem.children = transformItems(newItem.children);
      }

      if (isLast) {
        isLoading.value = false;
      }

      return newItem;
    });
  }

  const transformedItems = computed(() => transformItems(props.items));

  function getUrlToOldApp(suffix, params, relative_link) {
    let apiUrl = '';

    if (props.isVue && props.base !== window.location.origin) {
      apiUrl = props.base;
    }
    let baseApiUrl = '';

    if (params.realm_code) {
      baseApiUrl = '/' + params.realm_code + '/' + params.space_code;
    } else {
      baseApiUrl = '/' + params.isUrlValid;
    }

    if (relative_link) {
      return `${apiUrl}${baseApiUrl}${suffix}`;
    }

    return `${apiUrl}${baseApiUrl}/a/#!${suffix}`;
  }

  function useGetNuxtLink(linkEnd, params) {
    let apiUrl = '';

    if (!props.isVue && props.base) {
      apiUrl = props.base;
    }

    const realm_code = params['realm_code'];
    const space_code = params['space_code'];

    return apiUrl + '/' + realm_code + '/' + space_code + '/v' + linkEnd;
  }
</script>

<style lang="postcss">
  .navigation-info-state {
    display: flex;
    flex-direction: column;
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
