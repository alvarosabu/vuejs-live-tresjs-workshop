<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh :position="[-5, 1, 0]">
    <!-- Box args="[width, height, depth, widthSegments, heightSegments, depthSegments]"-->
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresMesh :position="[-3, 1, 0]">
    <!-- Sphere args="[radius, widthSegments, heightSegments, depthSegments, phiStart, piLength, thetaStart, thetaLength]"-->
      <TresSphereGeometry :args="[0.5, 32, 16]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresMesh :position="[-1, 1, 0]">
    <!-- Cone args="[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]"-->
      <TresConeGeometry :args="[0.5, 1, 16]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresMesh :position="[1, 1, 0]">
    <!-- Cylinder args="[radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]"-->
      <TresCylinderGeometry :args="[0.5, 0.5, 1, 16]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresMesh :position="[3, 1, 0]">
    <!-- Torus args="[radius, tube, radialSegments, tubularSegments, arc]"-->
      <TresTorusGeometry :args="[0.5, 0.20, 16, 16]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresMesh :position="[5, 1, 0]">
    <!-- TorusKnot args="[radius, tube, tubularSegments, radialSegments, p, q]"-->
      <TresTorusKnotGeometry :args="[0.5, 0.20, 32, 32]" />
      <TresMeshNormalMaterial  />
    </TresMesh>
    <TresGridHelper :args="[20]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>