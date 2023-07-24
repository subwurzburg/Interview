<template>
  <Header></Header>
  <article class="flex justify-center min-h-[calc(100vh-40px)] items-center">
    <section v-for="userInfo in randomUserData" :key="userInfo.login.sha256" class="text-center w-[500px]">
      <Avatar :url="userInfo.picture.large" class="flex justify-center" @click="getRandomUserData"></Avatar>
      <span class="text-xl">
        {{ title }}
      </span>
      <div class="text-3xl font-bold break-words">{{ content }}</div>
      <ul class="grid grid-cols-6">
        <li v-for="(barItem, index) in barItems" :key="barItem.url"
          @click="changeActiveEvent(barItem.namePage, userInfo, index)" class="flex justify-center items-center">
          <img :src="getBarAssetUrl(barItem.url)" :class="{ 'active': active === barItem.namePage }">
        </li>
      </ul>
    </section>
  </article>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Avatar from '@/components/Avatar.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import type { User } from '@/utils/RandomUser'

interface BarItems {
  url: string
  namePage: string
}

export default {
  components: {
    Header,
    Avatar,
  },
  setup() {
    const userStore = useUserStore()
    const { content, title } = storeToRefs(userStore)
    const { randomUserData, updateContent, getRandomUserData } = useUserStore()

    onMounted(async () => {
      await getRandomUserData();
    });

    const barItems: BarItems[] = [
      { url: 'name.png', namePage: 'name' },
      { url: 'email.png', namePage: 'email' },
      { url: 'birthday.png', namePage: 'birthday' },
      { url: 'address.png', namePage: 'address' },
      { url: 'phone.png', namePage: 'phone' },
      { url: 'password.png', namePage: 'password' },
    ];
    const getBarAssetUrl = (url: string) => {
      return new URL('/src/assets/icons/' + url, import.meta.url).href;
    };

    const active = ref<string>('name');
    const changeActiveEvent = (namePage: string, userInfo: User, index: number) => {
      updateContent(userInfo, index)
      active.value = namePage
    }

    return {
      getRandomUserData,
      barItems,
      getBarAssetUrl,
      title,
      content,
      randomUserData,
      changeActiveEvent,
      active
    };
  },
};
</script>

<style scoped>
.active {
  @apply border-b-4 border-black transition-all duration-300;
}
</style>