<script>
 import {  Layer } from "svelte-canvas";
 
 import * as R from 'ramda'
 import {
     sqrt, norm
 } from 'mathjs'
 
 export let canvasTransform;
 export let ball = {};
 export let color = 'white'
 
 $: p = [ball.y, ball.x, 1];
 
 $: render = (o) => {
     const { context, width, height } = o;
     const cT = canvasTransform;
     const r = 0.75;
     const offset = [0, 0, 1]
     const w = 0.1;
     const lineWidth = norm(cT.w2s([w, w, 0]));
     if (p[0] !== undefined) {
	 
	 context.lineWidth = lineWidth;
	 //context.fillStyle = color;
	 context.strokeStyle = color;
	 context.beginPath();
	 context.arc(...cT.pair(cT.w2s(p)), Math.abs(cT.first(cT.w2s([r, r, 0]))), 0, 2 * Math.PI);
	 //context.fill();     
	 context.stroke();
     }

 };
 
</script>


<Layer { render } />

<style>
</style>
