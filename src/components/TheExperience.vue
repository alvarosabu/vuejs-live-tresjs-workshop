<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { reactive, shallowRef } from 'vue'
import { Mesh, SRGBColorSpace } from 'three'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#82DBC5',
  outputColorSpace: SRGBColorSpace,
})

const boxRef = shallowRef<Mesh>()

const { onLoop } = useRenderLoop()

onLoop(({delta, elapsed}) => {
  if(boxRef.value) {
    boxRef.value.rotation.x += delta
    boxRef.value.rotation.y = elapsed
  }
})

</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5,5,5]" />
    <OrbitControls />
    <TresMesh ref="boxRef" :position="[0,2,0]" :rotation="[Math.PI/4, Math.PI /4, 0]">
      <TresBoxGeometry :args="[1,1,1]" />
      <TresMeshNormalMaterial/>
    </TresMesh>
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
