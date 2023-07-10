<script>
  import { Layer } from "svelte-canvas";

  import * as R from "ramda";
  import { sqrt, subtract, norm } from "mathjs";

  import createCanvasTools from "../../tools/canvastools.js";
  import asColor from "../../mixins/color.js";

  export let canvasTransform;
  export let event = {};
  export let type = {};
  export let color = "white";

  $: p0 = [event.y, event.x, 1];
  $: p1 = [type.endLocationY, type.endLocationX, 1];

  $: render = (o) => {
    const { context, width, height } = o;
    const canvasTools = createCanvasTools(context);

    const cT = canvasTransform;
    const w = 0.5;
    const offset = [0, 0, 1];

    if (p1[0] !== null && p0[1] !== null) {
      const p0S = cT.w2s(p0);
      const dpS = subtract(cT.w2s(p1), p0S);
      const wS = norm(cT.w2s([w, w, 0]));

      context.strokeStyle = asColor(color).applyAlphaFactor(0.5);
      context.lineWidth = wS;
      context.beginPath();
      canvasTools.stepArrow(...cT.pair(p0S), ...cT.pair(dpS));
      context.stroke();
    }
  };
</script>

<Layer {render} />

<style>
</style>
