import { defineStore } from 'pinia'

export const useMessageModalStore = defineStore('counter', {
  state: (): {
    isShow: boolean,
    message: string,
  } => {
    return {
      isShow: false,
      message: '',
    }
  },
  actions: {
    show(msg: string): void {
      this.message = msg
      this.isShow = true
    },
    hide(): void {
      this.isShow = true
    },
  }
})
