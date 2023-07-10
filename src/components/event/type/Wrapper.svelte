<script>
 import { camelCase2Human } from '../../../tools/stringtools.js'
 import * as R from 'ramda'


 import Pass from './Pass.svelte'
 import Carry from './Carry.svelte'
 import Type from './Type.svelte'
 import Shot from './Shot.svelte'
 import Interception from './Interception.svelte'

 export let type = {};
 export let typeId = '';

 
</script>

<div>
    {#if typeId == '10' }
	<Interception type={ type }></Interception>
    {:else if typeId == '30' }
	<Pass type={ type }></Pass>
    {:else if typeId == '16' }
	<Shot type={ type }></Shot>
    {:else if typeId == '46' }
	<Carry type={ type }></Carry>
    {:else}
	<Type type={ type }></Type>
    {/if}
</div>

<style>
</style>
