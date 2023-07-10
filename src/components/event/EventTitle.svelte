<script>

 import { joinIf } from '../../tools/stringtools.js'
 import EventStripes from './EventStripes.svelte'

 export let event = {};
 export let homeTeamColor;
 export let awayTeamColor;

 function prettyTitle(e) {
     return `[${ event.period }' ${ ('' + event.timestamp).slice(0, 8) } #${ event.index }]${ joinIf(' ', event.playerName) }${ joinIf(' ', event.eventTeamName) } - ${ event.typeName } [#${ event.possession}]`;
 }
 
</script>

<div class="container">
    <div class="row">
	<div class="col">
	    <span style="position: relative; left: 0px; top: 0px">
		{ prettyTitle(event) }
	    </span>
	</div>

	<div class="col-1">
	    <EventStripes event={ event } homeTeamColor={ homeTeamColor } awayTeamColor={ awayTeamColor }></EventStripes>
	</div>
    </div>
</div>
	
<style>
</style>
