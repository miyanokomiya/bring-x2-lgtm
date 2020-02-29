<template>
  <div class="hello">
    <h1>{{ msg2 }}</h1>
    <h1>{{ count }}</h1>
    <button @click="inc">inc</button>
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
import { ref } from 'vue'

type Props = {
  msg: string
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props: Props) {
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count: 1,
      msg2: `${props.msg}: ${count.value}`,
      inc
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
