<script>
 import {  Layer } from "svelte-canvas";
 
 import asColor from '../../mixins/color.js'
 import * as R from 'ramda'
 import {
     sqrt, norm
 } from 'mathjs'
 
 export let canvasTransform;
 export let player = {};
 export let color = 'grey'
 export let alphaFactor = 1.0;
 
 $: p = [player.y, player.x, 1];

 $: render = (o) => {
     const { context, width, height } = o;
     const cT = canvasTransform;
     const w = 0.1;
     const boxWidth = (1.0 + (!!player.actor ? 1 : 0)) + (!!player.keeper ? 2 : 0)
     const boxHeight = (1.0 + (!!player.actor ? 1 : 0)) * (!!player.keeper ? 0.25 : 1.0)
     const offset = [-0.5 * boxWidth, -0.5 * boxHeight, 1]
     
     const lineWidth = norm(cT.w2s([w, w, 0]));
     if (p[0] !== null) {
	 context.fillStyle = asColor(color).applyAlphaFactor(0.1 * alphaFactor);
	 context.strokeStyle = asColor(color).applyAlphaFactor(1.0);
	 context.lineWidth = lineWidth;
	 context.beginPath();
	 context.rect(...cT.pair(cT.w2s(cT.dW(p, offset))), ...cT.pair(cT.w2s([boxWidth, boxHeight, 0])));
	 context.stroke()
	 if (player.actor) {
	     context.fill();
	 }
	 
     }

 };
 
</script>


<Layer { render } />

<style>
</style>
