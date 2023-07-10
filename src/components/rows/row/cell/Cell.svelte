<script>
 import * as R from  'ramda'
 export let value = ''; 
 export let onClick = (val) => {};

</script>

<td on:click={ () => onClick(value) }>
    { value }
</td>

<style>
</style>
