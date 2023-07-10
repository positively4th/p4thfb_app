<script>
  import { onMount } from "svelte";

  import asRestRunner from "../../mixins/restrunner.js";
  import asVisiblePlayers from "../../mixins/VisiblePlayers.js";
  import { default as PitchEvent } from "../pitch/Event.svelte";
  import Area from "../pitch/Area.svelte";
  import Ball from "../pitch/Ball.svelte";
  import Players from "../pitch/Players.svelte";
  import create from "../../tools/canvastransform.js";
  import { sqrt } from "mathjs";

  import * as R from "ramda";

  export let canvasTransform = [];
  export let events = [];
  export let colorSpec = {};
</script>

{#each events as event}
  <PitchEvent {canvasTransform} {colorSpec} {event} type={event.type} />
{/each}

<style>
</style>
