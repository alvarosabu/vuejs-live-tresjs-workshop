<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, Plane } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

</script>

<template>
    <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <OrbitControls />
        <Suspense>
           <AkuAku />
        </Suspense>
        <TresMesh :rotate-x="-Math.PI /2" receive-shadow>
            <TresPlaneGeometry :args="[10, 10]"  />
            <TresMeshToonMaterial :color="'lightgray'" />
        </TresMesh>

        <TresAmbientLight :intensity="1"  />
        <TresDirectionalLight 
            :position="[2,3,5]" 
            :intensity="2" 
            cast-shadow 
            :shadow-mapSize-width="1024" 
            :shadow-mapSize-height="1024" 
            :shadow-radius="100" 
        />
    </TresCanvas>
</template>