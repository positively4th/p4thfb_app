<script>

 
 import { Layer } from "svelte-canvas";
 import create from "../../tools/canvastransform.js";
 
 import * as R from 'ramda'
 import {
     sqrt
 } from 'mathjs'
 
 export let pitchWidth = 60;
 export let pitchHeight = 120;
 export let canvasTransform;
 export let blur = false;
 
 $: render = (o) => {
     const cT = canvasTransform;
     const lineWidth = Math.ceil(
	 0.01 * cT.first(cT.w2s([sqrt(pitchWidth * pitchWidth + pitchHeight * pitchHeight), 0, 0])));
     const { context, width, height } = o;

     if (blur) {
	 context.filter = 'blur(2px)';
     }

     context.strokeStyle = 'white';
     context.lineWidth = lineWidth;
     context.fillStyle = `green`;

     context.fillRect(0, 0, width, height)
     context.strokeRect(...cT.pair(cT.w2s([0, 0, 1])),
			...cT.pair(cT.w2s([pitchWidth, pitchHeight, 0])))
     context.strokeRect(...cT.pair(cT.w2s([0.25 * pitchWidth, 0, 1])),
			...cT.pair(cT.w2s([0.5 * pitchWidth, 0.15 * pitchHeight, 0])))
     context.strokeRect(...cT.pair(cT.w2s([0.25 * pitchWidth, pitchHeight, 1])),
			...cT.pair(cT.w2s([0.5 * pitchWidth, -0.15 * pitchHeight, 0])))

     context.strokeRect(...cT.pair(cT.w2s([0.5 * pitchWidth-7/2, 0, 1])),
			...cT.pair(cT.w2s([7, -2, 0])))
     context.strokeRect(...cT.pair(cT.w2s([0.5 * pitchWidth-7/2, pitchHeight, 1])),
			...cT.pair(cT.w2s([7, 2, 0])))
     context.beginPath();
     context.moveTo(...cT.pair(cT.w2s([0, pitchHeight / 2, 1])));
     context.lineTo(...cT.pair(cT.w2s([pitchWidth, pitchHeight / 2, 1])));
     context.stroke();

     context.beginPath();
     context.arc(...cT.pair(cT.w2s([pitchWidth / 2, pitchHeight / 2, 1])), cT.first(cT.w2s([10, 0, 0])), 0, 2 * Math.PI);
     context.stroke();     
 };
 
</script>

<Layer { render } />

<style>
</style>
