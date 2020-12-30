<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <TeleportInSingleCityEchart city="长沙市"></TeleportInSingleCityEchart>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TeleportInSingleCityEchart from '../components/TeleportInSingleCityEchart'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    TeleportInSingleCityEchart
  }
}
</script>
