<script>
  import Pass from "./Pass.svelte";
  import Carry from "./Carry.svelte";
  import Shot from "./Shot.svelte";
  import GoalKeeper from "./GoalKeeper.svelte";

  export let canvasTransform;
  export let event = {};
  export let type = null;
  export let colorSpec = {};

  let color = "white";

  $: color =
    event.eventTeamId == event.homeTeamId
      ? colorSpec.homeTeamColor
      : colorSpec.awayTeamColor;
</script>

{#if event.typeId == 30}
  <Pass {event} {type} {colorSpec} {canvasTransform} />
{:else if event.typeId == 16}
  <Shot {event} {type} {colorSpec} {color} {canvasTransform} />
{:else if event.typeId == 23}
  <GoalKeeper {event} {type} {colorSpec} {color} {canvasTransform} />
{:else if event.typeId == 43}
  <Carry {event} {type} {colorSpec} {color} {canvasTransform} />
{/if}

<style>
</style>
