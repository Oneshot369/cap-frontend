import { reactive } from 'vue'
import Cookies from 'js-cookie'

const key = 'user_session'

export const JWTcookie = reactive({
  cookie: Cookies.get(key),
  setCookie(value: string) {
    Cookies.set(key, value, { expires: 10, path: '' })
    this.cookie = value
  },
  removeCookie() {
    this.cookie = undefined
    Cookies.remove(key)
  }
})
