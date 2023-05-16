<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, PCFSoftShadowMap, Color } from 'three'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { ref, shallowRef } from 'vue';
import { watchEffect } from 'vue';
import { onMounted } from 'vue';
import { shallowReactive } from 'vue';

const gl = {
  clearColor: '#272C34',
  shadows: true,
  // shadowMapType: BasicShadowMap,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const directionalLight = shallowReactive({
    intensity: 2,
    color: '#ffffff',
    position: [2, 3, 5],
})

const directionalLightRef = ref()
const { pane } = useTweakPane()

const directionalLightFolder = pane.addFolder({
    title: 'Directional Light',
})

directionalLightFolder.addInput(directionalLight, 'intensity', {
    min: 0,
    max: 5,
    step: 0.1,
}).on('change', ({ value }) => {
    directionalLightRef.value.intensity = value
})

directionalLightFolder.addInput(directionalLight, 'color', {
    label: 'Color',
}).on('change', ({ value }) => {
    directionalLightRef.value.color = new Color(value)
})

const axes = ['x', 'y', 'z']
directionalLight.position.forEach((_, index) => {
    directionalLightFolder
    .addInput(directionalLight.position, index, {
      label: `Position ${axes[index]}`,
      min: -10,
      max: 10,
      step: 0.01,
    })
    .on('change', ({ value }) => {
      directionalLightRef.value.position[axes[index]] = value
    })
})


</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh :position="[0, 2, 0]" cast-shadow>
        <TresTorusKnotGeometry :args="[0.5, 0.2, 64, 16]" />
        <TresMeshToonMaterial :color="'teal'" />
    </TresMesh>
    <TresMesh :rotate-x="-Math.PI /2" receive-shadow>
        <TresPlaneGeometry :args="[10, 10]"  />
        <TresMeshToonMaterial :color="'lightgray'" />
    </TresMesh>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight ref="directionalLightRef" 
        :position="directionalLight.position" 
        :intensity="directionalLight.intensity"
        :color="directionalLight.color"
        cast-shadow 
        :shadow-mapSize-width="1024" 
        :shadow-mapSize-height="1024" 
        :shadow-radius="100" />
    <TresDirectionalLightHelper v-if="directionalLightRef" :args="[directionalLightRef, 5]" />
  </TresCanvas>
</template>