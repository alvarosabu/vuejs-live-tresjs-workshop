<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import { useTexture } from '@tresjs/core';
import {
  Color,
  MeshBasicMaterial,
  MeshToonMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  CubeTextureLoader,
Texture,
MeshDepthMaterial,
FrontSide,
DoubleSide,
BackSide,
} from 'three'
import { shallowReactive, shallowRef } from 'vue';

const materialState = shallowReactive({
  color: '#f0ffba',
  metalness: 0.1,
  roughness: 0.1,
  opacity: 1,
  transparent: false,
  wireframe: false,
})



const cubeTextureLoader = new CubeTextureLoader()

const environmentMap = cubeTextureLoader.load([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/px.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nx.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/py.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/ny.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/pz.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nz.jpg',
])

const maptCap = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png']) as Texture


const torusKnotRef = shallowRef()

// Tweakpane

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'Materials',
    options: [
      { text: 'MeshBasicMaterial', value: MeshBasicMaterial },
      { text: 'MeshToonMaterial', value: MeshToonMaterial },
      { text: 'MeshDepthMaterial', value: MeshDepthMaterial },
      { text: 'MeshLambertMaterial', value: MeshLambertMaterial },
      { text: 'MeshMatcapMaterial', value: MeshMatcapMaterial },
      { text: 'MeshNormalMaterial', value: MeshNormalMaterial },
      { text: 'MeshPhongMaterial', value: MeshPhongMaterial },
      { text: 'MeshPhysicalMaterial', value: MeshPhysicalMaterial },
      { text: 'MeshStandardMaterial', value: MeshStandardMaterial },
    ],
    value: MeshBasicMaterial,
  })
  .on('change', ev => {
    torusKnotRef.value.material = new ev.value(materialState)
    

    if (ev.value === MeshStandardMaterial || ev.value === MeshPhysicalMaterial) {
      torusKnotRef.value.material.envMap = environmentMap
      materialPropsFolder.hidden = false
      return
    }

    if(ev.value === MeshMatcapMaterial) {
      torusKnotRef.value.material.matcap = maptCap
      return
    }

    else {
      materialPropsFolder.hidden = true
    }
  })

pane.addBlade({
  view: 'list',
  label: 'Side',
  options: [
    { text: 'FrontSide', value: FrontSide },
    { text: 'BackSide', value: BackSide },
    { text: 'DoubleSide', value: DoubleSide },
  ],
  value: FrontSide,
}).on('change', (ev: any) => {
  torusKnotRef.value.material.side = ev.value
})

const generalPropsFolder = pane.addFolder({
  title: 'General Props',

})

generalPropsFolder
  .addInput(materialState, 'color', {
    label: 'Color',
  })
  .on('change', (ev: any) => {
    torusKnotRef.value.material.color = new Color(ev.value)
  })

generalPropsFolder.addInput(materialState, 'transparent', {
    label: 'transparent',
  }).on('change', (ev: any) => {
    torusKnotRef.value.material.transparent = ev.value
    opacityCtrl.disabled = !ev.value
  })
const opacityCtrl = generalPropsFolder.addBlade({
  view: 'slider',
  label: 'Opacity',
  min: 0,
  max: 1,
  value: 0.5,
  disabled: true,
})
.on('change', (ev: any) => {
  materialState.opacity = ev.value
  torusKnotRef.value.material.opacity = ev.value
})
generalPropsFolder
  .addInput(materialState, 'wireframe', {
    label: 'Wireframe',
  })
  .on('change', (ev: any) => {
    torusKnotRef.value.material.wireframe = ev.value
  })

const materialProps = ['metalness', 'roughness']

const materialPropsFolder = pane.addFolder({
  title: 'Material Props',
  hidden: true,
})

const materialControls = materialProps.map(element => {
  return materialPropsFolder
    .addBlade({
      view: 'slider',
      label: element,
      min: 0,
      max: 1,
      value: 0.5,
    })
    .on('change', (ev: any) => {
      materialState[element] = ev.value
      torusKnotRef.value.material[element] = ev.value
    })
})

</script>
<template>
  <TresMesh ref="torusKnotRef" :position="[0, 1, 0]">
    <TresTorusKnotGeometry :args="[0.5, 0.2, 64, 16]" />
    <TresMeshBasicMaterial :color="materialState.color" />
  </TresMesh>
</template>
