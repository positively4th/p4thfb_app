<script>
  import Player from "./Player.svelte";

  export let canvasTransform;
  export let players = [];
  export let color = "grey";
  export let alphaFactor = 1.0;
</script>

{#each players as player}
  <Player {canvasTransform} {player} {color} {alphaFactor} />
{/each}

<style>
</style>
