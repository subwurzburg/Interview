import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getRandomUser } from '@/utils/RandomUser'
import type { User } from '@/utils/RandomUser'

export const useUserStore = defineStore('user', () => {
  const titleOption = [
    '嗨，我的名字是',
    '我的電子郵件地址是',
    '我的生日是',
    '我的地址是',
    '我的電話號碼是',
    '我的密碼是'
  ]
  const title = ref<string>(titleOption[0])

  const content = ref<string>('')
  const updateContent = (randomUser: User, index: number) => {
    switch (index) {
      case 0:
        content.value = `${randomUser.name.first} ${randomUser.name.last}`
        break
      case 1:
        content.value = randomUser.email
        break
      case 2:
        const date = new Date(randomUser.dob.date)
        content.value = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
        break
      case 3:
        content.value = `${randomUser.location.street.number} ${randomUser.location.street.name}`
        break
      case 4:
        content.value = randomUser.phone
        break
      case 5:
        content.value = randomUser.login.password
        break
      default:
        break
    }
    title.value = titleOption[index]
  }

  const randomUserData = reactive<User[]>([])
  const getRandomUserData = async () => {
    try {
      const user = await getRandomUser()
      randomUserData.splice(0, randomUserData.length, user[0])
      updateContent(randomUserData[0], 0)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    content,
    updateContent,
    randomUserData,
    getRandomUserData,
    title
  }
})
