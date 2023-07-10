<script>

 import { joinIf } from '../../tools/stringtools.js'

 export let event = {};
 export let homeTeamColor;
 export let awayTeamColor;

 let eventColor = "#00000000";
 let possessionColor = "#00000000";

 $: eventColor = ((event) => { 
			if (event.homeTeamId == event.eventTeamId) {
			    return homeTeamColor;
			}
			if (event.awayTeamId == event.eventTeamId) {
			    return awayTeamColor;
			}
			return "#00000000";
			})(event);

 $: possessionColor = ((event) => {
     if (event.homeTeamId == event.possessionTeamId) {
	 return homeTeamColor;
     }
     if (event.awayTeamId == event.possessionTeamId) {
	 return awayTeamColor;
     }
     return "#00000000";
 })(event);
 
</script>

<span class="px-1" style:background-color={ eventColor }> 
    &nbsp;
</span>
<span class="px-1" style:background-color={ possessionColor }>
    &nbsp;
</span>

<style>
</style>
