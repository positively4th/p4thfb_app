<script>
  import * as R from "ramda";
  import { EventStore } from "../stores/components/Event.svelte.js";

  import EventTitle from "../components/event/EventTitle.svelte";
  import EventFilter from "../components/event/EventFilter.svelte";
  import Estimate from "../components/Estimate.svelte";

  import { default as createTeamColorTools } from "../tools/teamcolortools.js";
  import asRestRunner from "../mixins/restrunner.js";
  import cson from "../contrib/p4thcson/src/cson.js";

  import { onMount } from "svelte";

  import { eventFilter } from "./event.js";

  const Event = $EventStore;
  const teamColorTools = createTeamColorTools();

  export let currentRoute;
  let params = {};
  let events = [];
  let renderKey = 0;

  let offset = 0; // * 116;
  let lastFilterFetched = {};
  let loadCounter = 0;
  let matchIds = "";
  let filter = $eventFilter;

  $: params = currentRoute.namedParams;

  $: filter = $eventFilter;
  $: fetchEvents(filter);

  onMount(() => {
    matchIds = currentRoute.queryParams.matchIds || "";
  });

  function previousEvent(events) {
    return offset > 0 && events.length > 1 ? events[0] : null;
  }

  function currentEvent(events) {
    return events.length > 0 ? events[Math.min(1, events.length - 1)] : null;
  }

  function nextEvent(events) {
    return events.length > 2 ? events[2] : null;
  }

  function fetchEvents(filter) {
    if (
      R.isEmpty(filter || {}) ||
      JSON.stringify(filter) == lastFilterFetched
    ) {
      return;
    }

    loadCounter += 1;
    lastFilterFetched = JSON.stringify(filter);
    return asRestRunner({
      path: ["api", "events/"],
      query: {
        filter: JSON.stringify(filter),
      },
    })
      .get()
      .then((resp) => {
        events = cson.fromJSON(resp.data, { isJSON: false });
        renderKey += 1;
        loadCounter -= 1;
      })
      .catch(() => {
        loadCounter -= 1;
      });
  }

  function onOffsetChange(delta) {
    if (offset + delta < 0) {
      return;
    }
    offset += delta;
  }

  function homeTeamColor(event) {
    return teamColorTools.getTeamColor(event.homeTeamName);
  }

  function awayTeamColor(event) {
    return teamColorTools.getTeamColor(
      event.awayTeamName,
      homeTeamColor(event)
    );
  }
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-2 flex align-items-stretch">
      <div class="card flex align-items-stretch">
        <div class="card-content">
          <div class="card-header p-1">Event Filter</div>
          <EventFilter
            bind:filter={$eventFilter}
            {matchIds}
            bind:offset
            limit={3}
          />
        </div>
      </div>
    </div>

    <div class="col flex align-items-stretch">
      <div class="card flex align-items-stretch">
        <div class="card-content">
          {#if !events || events.length < 1}
            <p>Loading...</p>
          {:else}
            <div class="card-header m-0 p-0">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-1">
                    {#if previousEvent(events)}
                      <div class="d-flex">
                        <button
                          class="btn btn-sm"
                          on:click={() => onOffsetChange(-1)}
                          ><i class="fa fa-angle-left" /></button
                        >
                      </div>
                    {/if}
                  </div>
                  <div class="col">
                    <EventTitle
                      event={currentEvent(events)}
                      homeTeamColor={homeTeamColor(currentEvent(events))}
                      awayTeamColor={awayTeamColor(currentEvent(events))}
                    />
                  </div>
                  <div class="col-1">
                    {#if nextEvent(events)}
                      <div class="d-flex justify-content-end">
                        <button
                          class="btn btn-sm"
                          on:click={() => onOffsetChange(1)}
                          ><i class="fa fa-angle-right" /></button
                        >
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
            <Event
              class="w-100"
              eventFilter={$eventFilter}
              event={currentEvent(events)}
              blur={loadCounter > 0}
            />
          {/if}
        </div>
      </div>
    </div>

    <div class="col-2 flex align-items-stretch">
      <div class="card flex align-items-stretch">
        <div class="card-content">
          <div class="card-header p-1">Estimate</div>
          <Estimate eventFilter={filter} />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
