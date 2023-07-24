import apiRequest from '@/utils/axios'
import type { AxiosResponse } from 'axios'

export interface User {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  id: {
    name: string
    value: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

interface APIResponse {
  results: User[]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}

export async function getRandomUser(): Promise<User[]> {
  try {
    const response: AxiosResponse<APIResponse> = await apiRequest({
      url: 'https://randomuser.me/api/',
      method: 'get'
    })

    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch random user')
  }
}
