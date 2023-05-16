<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos';

/* import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf') */

const { nodes, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true})

console.log({nodes, materials})

const AkuAku = nodes.Body

AkuAku.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
  }
})

</script>
<template>
    <primitive :object="AkuAku" />
</template>