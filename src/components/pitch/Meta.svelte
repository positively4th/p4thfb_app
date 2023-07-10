<script>
 import {  Layer } from "svelte-canvas";
 
 import * as R from 'ramda'
 import {
     sqrt, subtract, norm
 } from 'mathjs'

 import createCanvasTools from '../../tools/canvastools.js'
 import asColor from '../../mixins/color.js'
 import asPolygon from '../../mixins/polygon.js'

 export let canvasTransform;
 export let meta = {};
 export let color = 'orange';
 
 $: render = (o) => {

     const handlers = {

	 'area' : () => {
	     const ps = R.map((p) => [p[1], p[0], p[2]])(meta.ps);
	     const fillColor = meta.fillColor != null ? meta.fillColor : 'white';
	     const strokeColor = meta.strokeColor != null ? meta.strokeColor : asColor(meta.fillColor).complement()
	     const ext = cT.w2s(asPolygon(ps).ext())
	     
	     const wS = 0.005 * sqrt(ext.get([0]) * ext.get([0]) + ext.get([1]) * ext.get([1]));
	     
	     context.lineWidth = wS;
	     context.fillStyle = asColor(fillColor).applyAlphaFactor(0.5);
	     context.strokeStyle = asColor(strokeColor).applyAlphaFactor(1.0);

	     context.beginPath();
	     context.moveTo(...cT.pair(cT.w2s(ps[ps.length - 1])));
	     for (let i = 0 ; i < ps.length ; i++) {
		 context.lineTo(...cT.pair(cT.w2s(ps[i])));
	     }
	     context.closePath();
	     context.stroke();
	     context.fill();     
	     
	 },

	 'arrow': () => {
	     const p = [meta.p[1], meta.p[0], 1];
	     const d = [meta.d[1], meta.d[0], 0];
	     const pS = cT.w2s(p)
	     const dS = cT.w2s(d)
	     const wS = 0.002 * sqrt(width * width + height * height);
	     context.strokeStyle = asColor(color).applyAlphaFactor(1);
	     context.lineWidth = wS;
	     context.beginPath();
	     canvasTools.stepArrow(...cT.pair(pS), ...cT.pair(dS))
	     context.stroke();
	 },

	 'annotation': () => {
	     const p = [meta.p[1], meta.p[0], 1];
	     const pS = cT.w2s(p)
	     const fontSize = 0.03 * sqrt(width * width + height * height);
	     context.font = `${ fontSize }px Arial`;
	     context.fillStyle = asColor(color).applyAlphaFactor(1);
	     context.fillText(meta.text, ...cT.pair(pS))
	 },
     }

     const { context, width, height } = o;
     const canvasTools = createCanvasTools(context); 
     const cT = canvasTransform;

     if (handlers[meta.type]) {
	 handlers[meta.type]();
     }
 };
 
</script>


<Layer { render } />

<style>
</style>
