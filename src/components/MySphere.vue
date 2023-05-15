<script setup lang="ts">
import { PBRTextureMaps, useLoader, useTexture } from '@tresjs/core'
/* import { TextureLoader } from 'three'

const texture = await useLoader(TextureLoader, '/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg') */

const pbrTexture = await useTexture({
  map: '/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg',
  displacementMap: '/hexagonal-rock/Rocks_Hexagons_002_height.png',
  roughnessMap: '/hexagonal-rock/Rocks_Hexagons_002_roughness.jpg',
  normalMap: '/hexagonal-rock/Rocks_Hexagons_002_normal.jpg',
  ambientOcclusion: '/hexagonal-rock/Rocks_Hexagons_002_ambientOcclusion.jpg',
}) as PBRTextureMaps
</script>
<template>
 <TresMesh :position="[0, 1, 0]">
    <TresSphereGeometry :args="[0.5, 256, 256]" />
    <TresMeshStandardMaterial
        :map="pbrTexture.map"
        :displacementMap="pbrTexture.displacementMap"
        :roughnessMap="pbrTexture.roughnessMap"
        :normalMap="pbrTexture.normalMap"
        :ambientOcclusionMap="pbrTexture.ambientOcclusionMap"
        :displacement-scale="0.04"
      />
    <!-- <TresMeshBasicMaterial :map="texture" /> -->
 </TresMesh>
</template>