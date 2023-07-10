<script>
 import { camelCase2Human } from '../../../tools/stringtools.js'
 import * as R from 'ramda'

 import Type from './Type.svelte'

 export let type = {};

</script>

<div>
    <Type type={ type }></Type>
</div>

<style>
</style>
