<template>
  <div class="grid grid-cols-3 gap-16">
    <!-- row -->
    <FmMenu v-model="v1" v-on="eventHandlers" :items="items1">
      <template #activator="{ props }">
        <FmButton v-bind="props"> Activator slot</FmButton>
      </template>
    </FmMenu>

    <FmButton>
      Parent activator

      <FmMenu v-model="v2" activator="parent" v-on="eventHandlers" :items="items1" />
    </FmButton>

    <FmButton id="menuActivator"> Sibling activator</FmButton>
    <FmMenu v-model="v3" activator="#menuActivator" v-on="eventHandlers" :items="items1" />

    <!-- row -->
    <FmMenu v-on="eventHandlers" :items="items1" width="200">
      <template #activator="{ props }">
        <FmIconButton v-bind="props" icon="mdi-cog" />
      </template>
    </FmMenu>

    <FmMenu
      v-on="eventHandlers"
      :open-on-click="false"
      :open-on-hover="true"
      :items="items1"
      width="200"
    >
      <template #activator="{ props }">
        <FmButton v-bind="props"> Hover me</FmButton>
      </template>
    </FmMenu>

    <FmButton>
      Use 'prepend' slot

      <FmMenu activator="parent" v-on="eventHandlers" width="auto" :items="items1">
        <template #item-prepend="{ item, index }">
          <FmIcon icon="mdi-star" size="20" />
        </template>
      </FmMenu>
    </FmButton>

    <!-- row -->
    <FmButton>
      Use 'prepend' and 'item' slots

      <FmMenu activator="parent" v-on="eventHandlers" width="auto" :items="items1">
        <template #item="{ item, index }">
          <div class="flex flex-column text-(color: var(--on-surface))">
            <span class="menu1-item-title">{{ item.title }}</span>
            <span class="menu1-item-text">{{ item.text }}</span>
          </div>
        </template>

        <template #item-prepend="{ item, index }">
          <FmIcon icon="mdi-content-cut" color="var(--on-syrface-variant)" />
        </template>
      </FmMenu>
    </FmButton>

    <FmMenu width="260">
      <template #activator="{ props }">
        <FmButton v-bind="props">With submenu</FmButton>
      </template>

      <template v-for="item in CHANNEL_ACTIONS" :key="item.value">
        <template v-if="size(item.children)">
          <FmMenu width="260" location="left" :open-on-focus="false" open-on-hover submenu>
            <template #activator="{ props }">
              <FmMenuItem
                v-bind="props"
                item-size="large"
                :prepend-icon="item.icon"
                :title="item.title"
                append-icon="mdi-menu-right"
                :disabled="item.disabled"
                class="menu2-submenu"
              />
            </template>

            <FmMenuItem
              v-for="child in item.children"
              :key="child.value"
              item-size="large"
              :prepend-icon="child.icon"
              :title="child.title"
              :disabled="child.disabled"
              @click="() => console.log('select: ', child.value)"
            />
          </FmMenu>
        </template>

        <FmMenuItem
          v-else
          item-size="large"
          :prepend-icon="item.icon"
          :title="item.title"
          :disabled="item.disabled"
          @click="() => console.log('select: ', item.value)"
        />
      </template>
    </FmMenu>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import size from 'lodash/size';
  import FmIcon from '@/components/fm/Icon/Icon.vue';
  import FmMenu from '@/components/fm/Menu/Menu.vue';
  import FmMenuItem from '@/components/fm/Menu/MenuItem.vue';
  import FmButton from '@/components/fm/Button/Button.vue';
  import FmIconButton from '@/components/fm/IconButton/IconButton.vue';

  const eventHandlers = {
    'update:modelValue': (ev) => console.log(`Event 'update:modelValue' :`, ev),
    'click:item': (ev) => console.log(`Event 'click:item' :`, ev)
  };

  const items1 = [
    { title: 'Item 1', text: 'Supporting text 1' },
    { title: 'Item 2', text: 'Supporting text 2' },
    { title: 'Item 3', text: 'Supporting text 3' },
    { title: 'Item 4', text: 'Supporting text 4' },
    { title: 'Item 5', text: 'Supporting text 5' }
  ];

  const CHANNEL_ACTIONS = [
    {
      title: 'Mute Channel',
      value: 'mute',
      icon: 'mdi-bell-off-outline',
      children: [
        {
          title: 'Mute for 1 hour',
          value: 'mute:hour',
          icon: 'mdi-bell-off-outline'
        },
        { title: 'Mute for...', value: 'mute:any', icon: 'mdi-bell-off-outline' },
        {
          title: 'Mute forever',
          value: 'mute:forever',
          icon: 'mdi-bell-off-outline'
        }
      ]
    },
    {
      title: 'Mark all as read',
      value: 'mark',
      icon: 'mdi-message-check-outline'
    },
    {
      title: 'Open Channel Details',
      value: 'details',
      icon: 'mdi-information-outline'
    },
    {
      title: 'Notification Settings',
      value: 'settings',
      icon: 'mdi-cog-outline'
    },
    { title: 'Leave Channel', value: 'leave', icon: 'mdi-logout-variant' }
  ];

  const v1 = ref(false);
  const v2 = ref(false);
  const v3 = ref(false);
</script>

<style scoped>
  .menu1-item-title {
    font: var(--title-medium-font) !important;
  }

  .menu1-item-text {
    font: var(--body-medium-font) !important;
  }

  .menu2-submenu {
    margin-bottom: 16px;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      bottom: -8px;
      border-bottom: 1px solid var(--outline-variant);
    }
  }
</style>
