<template>
  <div id="app">
    <div>
      <p
        v-for="info in messages.state.infos"
        :key="info"
        @click="messages.removeInfo(info)"
      >
        {{ info }}
      </p>
      <p
        v-for="error in messages.state.errors"
        :key="error"
        @click="messages.removeError(error)"
      >
        {{ error }}
      </p>
    </div>
    <UploadForm @loadImage="loadImage" />
    <img :src="state.src" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useMessages } from '@/hooks/messages'
import UploadForm from '@/components/organisms/UploadForm.vue'

export default {
  name: 'App',
  components: {
    UploadForm
  },
  setup() {
    const state = reactive<{ src: string }>({
      src: ''
    })
    const messages = useMessages()
    const loadImage = (base64: string) => {
      console.log(base64)
      state.src = base64
    }

    return {
      state,
      messages,
      loadImage
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
