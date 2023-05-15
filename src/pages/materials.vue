<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

</script>

<template>
    <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <OrbitControls />
        <Suspense>
            <MaterialTorusKnot />
        </Suspense>
        <TresGridHelper />
        <TresAmbientLight :intensity="1"  />
        <TresDirectionalLight :position="[2, 3, 5]" :intensity="3" cast-shadow />
    </TresCanvas>
</template>