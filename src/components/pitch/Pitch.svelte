<script>

 
 import { Canvas, Layer, t } from "svelte-canvas";
 import Field from "./Field.svelte";
 
 import * as R from 'ramda'
 import {
     sqrt
 } from 'mathjs'
 
 export let canvasWidth = 220;
 export let canvasHeight = 440;
 export let pitchWidth = 60;
 export let pitchHeight = 120;
 export let canvasTransform;
 export let blur = false;
 
</script>

<Canvas width={ canvasWidth } height={ canvasHeight }>
	<Field canvasTransform={ canvasTransform } pitchWidth={ pitchWidth } pitchHeight={ pitchHeight } blur={ blur }></Field>
	<slot></slot>
</Canvas>

<style>
</style>
