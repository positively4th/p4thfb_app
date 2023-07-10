<script>

 
 import * as R from 'ramda'
 import Meta from './Meta.svelte'
 
 export let canvasTransform;
 export let metas = {};

</script>

{#each metas as meta }
    <Meta meta={ meta } canvasTransform={ canvasTransform }></Meta>
{/each}

<style>
</style>
