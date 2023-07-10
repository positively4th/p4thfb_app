<script>

 import EventTitle from './EventTitle.svelte'
 
export let events = []
 
</script>

<div>

    {#each events as event }
	<div>
		<button class="w-100" >
		    <EventTitle event={ event }></EventTitle>
		</button>
	</div>
    {/each}	
</div>

<style>
</style>
