<template>
  <div class="root">
    
    <div id="circle" :class="$store.state.className">
    </div>
    
   
  </div>
</template>

<script>


const spacebroClient = require('spacebro-client')

spacebroClient.connect('spacebro.space', 3333, {
  clientName: 'LED-frontend',
  channelName: 'led-channel'  //channelname has to be the same as on raspi
})


export default {
  data() {
    return {
     
    }
  },
  mounted() {
      let commit = this.$store.commit //probably async stuff of js - we tried first with this: function(){this.$store.commit('TURN_ON')}
      spacebroClient.on('down', function () {
        commit('TURN_ON')
      })
      spacebroClient.on('up', function () {
        commit('TURN_OFF')
      })
  }
  
}
</script>

<style>
  #circle{
    width: 100px;
    height: 100px;
    border-radius: 100%; 
  }

  .blue {
    background-color: blue;
  }

  .lightBlue {
    background-color: lightblue;
  }


</style>
