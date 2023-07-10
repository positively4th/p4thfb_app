<script>
  import { onMount } from "svelte";

  import asRestRunner from "../../mixins/restrunner.js";
  import asVisiblePlayers from "../../mixins/VisiblePlayers.js";
  import Pitch from "../pitch/Pitch.svelte";
  import PitchTypeWrapper from "../pitch/Wrapper.svelte";
  import Area from "../pitch/Area.svelte";
  import Players from "../pitch/Players.svelte";
  import create from "../../tools/canvastransform.js";
  import { sqrt } from "mathjs";

  import * as R from "ramda";

  export let event = {};
  export let canvasTransform = [];
  export let colorSpec = {};

  let opponentTypeIds = ["3", "39" /*, '42'*/];

  function shouldFlip(event) {
    let res = false;

    if (!event || !event.eventTeamId || !event.homeTeamId) {
      console.error("event: ", event);
      return res;
    }

    const relatedFlippers = {
      /* Ball Receipt* */ 42: [/* Pass */ 30],
      /* 'Dribbled Past */ 39: [/* Dribble */ 14],
    };

    const eventFlippers = [/* Pressure */ 17, /* Pass */ 30, /* Carry */ 43];
    const possessionFlippers = [/* Duel */ 4];

    const eventPossessionFlippers = [];

    if (
      /* R.includes(event.typeId, eventFlippers)
	    && */ event.eventTeamId != event.homeTeamId
    ) {
      res = !res;
    }

    if (
      R.includes(event.typeId, possessionFlippers) &&
      event.possessionTeamId != event.homeTeamId
    ) {
      res = !res;
    }
    if (
      R.includes(event.typeId, eventPossessionFlippers) &&
      event.possessionTeamId != event.eventTeamId
    ) {
      res = !res;
    }

    if (relatedFlippers.hasOwnProperty(event.typeId)) {
      const types = relatedFlippers[event.typeId];
      const events = R.filter((re) => re && R.includes(re.typeId)(types))(
        event.relatedEvents
      );
      return shouldFlip(events[0]);
    }

    return res;
  }

  $: alphaFactor =
    colorSpec.alphaFactor == undefined ? 0 : colorSpec.alphaFactor;
  $: homeTeamColor =
    colorSpec.homeTeamColor == undefined ? "red" : colorSpec.homeTeamColor;
  $: awayTeamColor =
    colorSpec.awayTeamColor == undefined ? "blue" : colorSpec.awayTeamColor;
  $: homeTeamPlayers = asVisiblePlayers(
    event.visiblePlayers || []
  ).filterOnPossesion(event.homeTeamId == event.eventTeamId);

  $: awayTeamPlayers = asVisiblePlayers(
    event.visiblePlayers || []
  ).filterOnPossesion(event.awayTeamId == event.eventTeamId);

  $: homeAwayTeamPlayers = [homeTeamPlayers, awayTeamPlayers];

  $: visibleAreaXYPairs = R.pipe(
    R.sortBy((va) => va.index),
    R.map((va) => ({ x: va.x, y: va.y }))
  )(event.visibleArea || []);

  $: flipEvent = 0 + shouldFlip(event);
</script>

<Area
  xyPairs={visibleAreaXYPairs}
  canvasTransform={canvasTransform[flipEvent]}
  {alphaFactor}
/>
<Players
  players={homeAwayTeamPlayers[0]}
  color={homeTeamColor}
  canvasTransform={canvasTransform[flipEvent]}
  {alphaFactor}
/>
<Players
  players={homeAwayTeamPlayers[1]}
  color={awayTeamColor}
  canvasTransform={canvasTransform[flipEvent]}
  {alphaFactor}
/>
<PitchTypeWrapper
  {event}
  type={event.type}
  canvasTransform={canvasTransform[flipEvent]}
  {colorSpec}
/>

<style>
</style>
