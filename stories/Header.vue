<template>
  <header
    class="flex w-full items-center max-h-20 h-20 py-3 px-[22px] gap-x-4 border-b-[1px] border-[var(--outline-variant)] border-solid"
  >
    <FmLogo :theme="isDark ? 'dark' : 'light'" :logoUrl="logo" class="mr-12 max-h-full" />
    <FmSearch v-if="false" class="max-w-[360px]" rounded :hideDetails="false" variant="solo" />

    <FmIconButton icon="mdi-bell-outline" size="normal" variant="text" class="ml-auto">
      <FmMenu v-model="menus.notifications" activator="parent" max-height="320">
        <div class="notifications">
          <div
            :class="[
              'notifications__body',
              'scroll-variant-thin',
              { 'notifications__body--empty': !notifications?.length }
            ]"
          >
            <div class="notifications__content">
              <template v-if="notifications?.length">
                <div class="fm-message" v-for="(item, index) in notifications" :key="index">
                  <div class="fm-message__header">
                    <div class="fm-message__section">
                      {{ SECTIONS[item.section] }}
                    </div>

                    <div class="fm-message__date">
                      {{ formatDate(item.created) }}
                    </div>
                  </div>

                  <div class="fm-message__title">
                    {{ item.title }}
                  </div>

                  <div class="fm-message__text">
                    {{ item.description }}
                  </div>
                </div>

                <div class="relative pt-2 flex justify-center items-center">
                  <FmButton href="/home" type="secondary" disabled>Show ALL</FmButton>
                </div>
              </template>

              <div v-else class="no-messages">No new messages</div>
            </div>
          </div>
        </div>
      </FmMenu>
    </FmIconButton>

    <FmIconButton icon="mdi-help-circle-outline" size="normal" variant="text">
      <FmMenu v-model="menus.faq" activator="parent">
        <a :href="documentationUrl">
          <MenuItem itemSize="large" title="Documentation" />
        </a>
        <a :href="apiReferenceUrl">
          <MenuItem itemSize="large" title="API Reference" />
        </a>
      </FmMenu>
    </FmIconButton>

    <FmButton type="secondary" append-icon="mdi-chevron-down" v-if="currentWorkspaceName">
      {{ currentWorkspaceName }}
      <FmMenu v-model="menus.workspaces" activator="parent">
        <MenuItem
          v-for="(item, index) in workspaces"
          :key="index"
          itemSize="large"
          :title="item.name"
          @click="emit('setCurrent', item)"
        />
      </FmMenu>
    </FmButton>

    <FmButton style="height: 40px" :icon="true">
      <FmAvatar :image="avatar">
        <span class="text-h5">{{ letters }}</span>
      </FmAvatar>
      <FmMenu v-model="menus.profile" activator="parent">
        <MenuItem itemSize="large" @click="emit('profile')" title="Profile" />
        <MenuItem itemSize="large" @click="emit('security')" title="Account Security" />
        <VDivider opacity="1" class="border-[var(--outline-variant)] mb-2" />
        <MenuItem itemSize="large" title="User interface" appendIcon="mdi-menu-right">
          <FmMenu
            :openOnFocus="false"
            :openOnHover="true"
            :submenu="true"
            v-model="menus.interface"
            activator="parent"
          >
            <MenuItem
              itemSize="large"
              v-on="!isDark ? {} : { click: () => emit('setTheme', false) }"
              title="Light theme"
              :prependIcon="!isDark ? 'mdi-check' : '_'"
            />
            <MenuItem
              itemSize="large"
              v-on="isDark ? {} : { click: () => emit('setTheme', true) }"
              title="Dark theme"
              :prependIcon="isDark ? 'mdi-check' : '_'"
            />
          </FmMenu>
        </MenuItem>
        <VDivider opacity="1" class="border-[var(--outline-variant)] mt-2" />
        <a :href="logoutUrl">
          <MenuItem itemSize="large" @click="emit('security')" title="Log Out" />
        </a>
      </FmMenu>
    </FmButton>
  </header>
</template>

<script setup>
  import FmLogo from '@/components/fm/Logo/Logo.vue';
  import FmSearch from '@/components/fm/Search/Search.vue';
  import FmIconButton from '@/components/fm/IconButton/IconButton.vue';
  import FmButton from '@/components/fm/Button/Button.vue';
  import FmMenu from '@/components/fm/Menu/Menu.vue';
  import FmAvatar from '@/components/fm/Avatar/Avatar.vue';
  import { VDivider } from 'vuetify/components';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import MenuItem from '../src/components/fm/Menu/MenuItem.vue';
  import { reactive } from 'vue';

  dayjs.extend(relativeTime);

  defineProps({
    notifications: {
      type: Array
    },
    currentWorkspaceName: {
      type: String
    },
    workspaces: {
      type: Array
    },
    isDark: {
      type: Boolean
    },
    documentationUrl: {
      type: String
    },
    apiReferenceUrl: {
      type: String
    },
    logo: {
      type: String
    },
    logoutUrl: {
      type: String
    },
    avatar: {
      type: String
    },
    letters: {
      type: String
    }
  });

  const emit = defineEmits(['profile', 'setTheme', 'security', 'setCurrent']);

  const menus = reactive({
    notifications: false,
    faq: false,
    workspaces: false,
    profile: false,
    interface: false
  });

  const SECTIONS = {
    1: 'Events',
    2: 'Transactions',
    3: 'Instruments',
    4: 'Data',
    5: 'Prices',
    6: 'Report',
    7: 'Import',
    8: 'Activity log',
    9: 'Schedules',
    10: 'Other'
  };

  function formatDate(date) {
    if (dayjs().diff(dayjs(date), 'hours') > 12) return dayjs(date).format('DD.MM.YYYY HH:mm');

    return dayjs(date).fromNow();
  }
</script>

<style lang="scss" scoped>
  .notifications {
    position: relative;
    width: 400px;
    min-width: 200px;
    padding: 12px 12px 12px 20px;

    &__body {
      position: relative;
      width: 100%;
      height: 240px;
      padding-right: 8px;
      overflow-y: auto;

      &--empty {
        height: auto;
      }
    }

    &__content {
      position: relative;
      width: 100%;
    }
  }

  .no-messages {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: var(--on-surface);
  }

  .fm-message {
    position: relative;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--outline-variant);
    margin-bottom: 16px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    &__section {
      font: var(--body-large-pro-font);
    }

    &__date {
      font: var(--body-small-font);
    }

    &__title {
      font: var(--body-medium-pro-font);
      margin-bottom: 8px;
    }

    &__text {
      position: relative;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font: var(--body-medium-font);
    }
  }
</style>
