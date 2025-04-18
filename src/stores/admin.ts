import { reactive } from 'vue'
import Cookies from 'js-cookie'

const key = 'admin'

export const adminCookie = reactive({
  cookie: Cookies.get(key),
  setCookie(value: string) {
    Cookies.set(key, value, { expires: 10, path: '' })
    this.cookie = value
  },
  removeCookie() {
    Cookies.remove(key)
    this.cookie = undefined
  }
})
