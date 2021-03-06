import { reactive } from 'vue'

const state = reactive<{
  infos: string[]
  errors: string[]
}>({ infos: [], errors: [] })

const pushInfo = (msg: string) => {
  if (state.infos.includes(msg)) return
  state.infos.push(msg)
}
const removeInfo = (msg: string) => {
  state.infos = state.infos.filter((s: string) => s !== msg)
}
const pushError = (msg: string) => {
  if (state.errors.includes(msg)) return
  state.errors.push(msg)
}
const removeError = (msg: string) => {
  state.errors = state.errors.filter((s: string) => s !== msg)
}
const clear = () => {
  state.infos = []
  state.errors = []
}

export function useMessages() {
  return { state, pushInfo, pushError, removeInfo, removeError, clear }
}
