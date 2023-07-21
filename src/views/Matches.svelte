<script>
  import { navigateTo } from "svelte-router-spa";
  import queryString from "query-string";

  import MatchFilter from "../components/match/MatchFilter.svelte";
  import Rows from "../components/rows/Rows.svelte";

  import asRestRunner from "../mixins/restrunner.js";
  import * as R from "ramda";

  import { onMount } from "svelte";

  const keyTypeSpecMap = {
    checked: {
      type: "checkbox",
      selectAllIds: (row, spec) => {
        return R.map((row) => row.matchId)(rows);
      },
    },
  };

  let filter = null;
  let offset = 0; // * 116;
  let lastFilterFetched = {};
  let loadCounter = 0;

  let competitions = [];

  const keyExcludePattern = R.pipe(R.map((re) => `(?:${re})`))([
    "__id",
    "Id$",
  ]).join("|");

  const keyWeightMap = {
    checked: 900,
    matchDate: 1000,
    competitionName: 1010,
    competitionStageName: 1020,
    homeTeamName: 1030,
    homeScore: 1040,
    awayScore: 1050,
    awayTeamName: 1060,
  };

  let selected = [];

  onMount(async () => {
    competitions = await asRestRunner({
      path: ["api", "competitions/"],
    })
      .get()
      .then((resp) => {
        const competitions = resp.data.result || null;
        return competitions;
      });
  });

  function onMatchesClicked() {
    const q = queryString.stringify(
      {
        matchIds: selected,
      },
      { encode: true, arrayFormat: "comma" }
    );
    navigateTo(`event?${q}`);
  }

  function onClicked(row, key, val) {
    if (key === "checked") {
      return;
    }
    const q = queryString.stringify(
      {
        matchIds: [row.matchId],
      },
      { encode: true, arrayFormat: "comma" }
    );
    navigateTo(`event?${q}`);
  }

  $: pRows = ((competitionns) => {
    return asRestRunner({
      path: ["api", "matches/"],
      query: {
        filter: JSON.stringify(filter),
      },
    })
      .get()
      .then((resp) => {
        return resp.data.result || [];
      });
  })(competitions);

  $: isEventsButtonEnabled = selected.length > 0;
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-2 flex align-items-stretch">
      <div class="card flex align-items-stretch">
        <div class="card-content">
          <div class="card-header p-1">Match Filter</div>
          <MatchFilter
            bind:filter
            bind:offset
            competitionIdLabelMaps={competitions}
          />
        </div>
      </div>

      <div class="card flex align-items-stretch">
        <div class="card-content">
          <div class="card-header p-1">Actions</div>
          <div class="btn-group p-1" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-primary"
              disabled={!isEventsButtonEnabled}
              on:click={onMatchesClicked}
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col flex align-items-stretch">
      <div class="card flex align-items-stretch">
        <div class="card-content">
          <div>
            {#await pRows then rows}
              <Rows
                {keyTypeSpecMap}
                {keyExcludePattern}
                {keyWeightMap}
                {rows}
                idKey={"matchId"}
                bind:selected
                {onClicked}
              />
            {/await}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
