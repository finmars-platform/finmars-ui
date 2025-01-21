<template>
  <Navigation
    :items="items"
    :alternativeLink="alternativeLink"
    :base="base"
    :route="route"
    @resizeSideNav="emit('resizeSideNav', $event)"
  />
</template>

<script setup>
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
      required: true,
      default: () => []
    }
  });

  const emit = defineEmits(['resizeSideNav']);

  const route = computed(() => {
    if (props.route) return props.route;
    const segments = window.location.pathname?.split('/');
    const realm_code = segments.find((item) => item.includes('realm')) || 'realm03va3';
    const space_code = segments.find((item) => item.includes('space')) || 'space027ho';
    return { params: { realm_code, space_code } };
  });

  const routingItems = ref(props.items);

  function handleItems(items) {
    return items.map((item) => {
      const { to, href, children } = item;
      return {
        ...item,
        ...(to && to !== '' ? { to: useGetNuxtLink(to) } : {}),
        ...(href && href !== '' ? { href: getUrlToOldApp(href) } : {}),
        ...(children ? { children: handleItems(children) } : {})
      };
    });
  }

  routingItems.value = handleItems(routingItems.value);

  function getUrlToOldApp(suffix) {
    const store = route.value.params;

    let apiUrl = '';
    if (props.isVue && props.base !== window.location.origin) {
      apiUrl = props.base;
    }
    let baseApiUrl = '';

    if (store.realm_code) {
      baseApiUrl = '/' + store.realm_code + '/' + store.space_code;
    } else {
      baseApiUrl = '/' + store.isUrlValid;
    }

    return `${apiUrl}${baseApiUrl}/a/#!${suffix}`;
  }

  function useGetNuxtLink(linkEnd) {
    const store = route.value.params;
    let apiUrl = '';
    if (!props.isVue && props.base) {
      apiUrl = props.base;
    }

    const realm_code = store['realm_code'];
    const space_code = store['space_code'];

    return apiUrl + '/' + realm_code + '/' + space_code + '/v' + linkEnd;
  }
</script>

<style lang="postcss">
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
