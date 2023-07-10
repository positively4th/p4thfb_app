<script>
 import {  Layer } from "svelte-canvas"; 

 import asColor from '../../mixins/color.js'

 import * as R from 'ramda'
 
 export let canvasTransform;
 export let xyPairs = [];
 export let color = '#ffffff30'
 export let alphaFactor= 1.0;
 
 function xy2p (xy) {
     return [xy.y, xy.x, 1];
 };
 
 $: render = (o) => {
     const { context, width, height } = o;
     const cT = canvasTransform;
     if (xyPairs && xyPairs.length > 2) {
	 context.fillStyle = asColor(color).applyAlphaFactor(alphaFactor);
	 context.beginPath();
	 context.moveTo(...cT.pair(cT.w2s(xy2p(xyPairs[0]))));
	 for (let i = 1 ; i < xyPairs.length ; i++) {
	     context.lineTo(...cT.pair(cT.w2s(xy2p(xyPairs[i]))));
	 }
	 context.closePath();
	 //context.stroke();
	 context.fill();     
     }

 };
 
</script>


<Layer { render } />

<style>
</style>
