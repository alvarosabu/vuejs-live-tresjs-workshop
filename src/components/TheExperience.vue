<script setup lang="ts">
import { TresCanvas,  } from '@tresjs/core'
import { reactive } from 'vue'
import { SRGBColorSpace } from 'three'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#82DBC5',
  outputColorSpace: SRGBColorSpace,
})

</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5,5,5]" />
    <OrbitControls />
    <TresMesh :position="[0,2,0]" :rotation="[Math.PI/4, Math.PI /4, 0]">
      <TresBoxGeometry :args="[1,1,1]" />
      <TresMeshNormalMaterial/>
    </TresMesh>
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
