<script>
  import * as R from "ramda";

  import { asIdLabelPairs as asIdLabelTypePairs } from "../../constants/eventtypes";
  import { asIdLabelPairs as asIdLabelPlayPatternPairs } from "../../constants/playpatterns";
  import OnOffButtons from "../../components/OnOffButtons.svelte";

  export let matchIds = "";
  export let indexes = "";
  export let possessions = "";
  export let eventTypes = [];
  export let playPatternIds = [];

  export let filter = {};
  export let offset = 0;
  export let onFilterChange = () => {};

  function splitStringIds(ids, { caster = (v) => v } = {}) {
    return R.pipe(
      (str) => str.split(","),
      R.map((str) => caster(str.trim()))
    )(ids);
  }

  function _onFilterChange() {
    offset = 0;
    onFilterChange();
  }

  $: filter = ((offset, matchIds, indexes, possessions, eventTypes) => {
    const filter = {
      columnFilter: [],
      order: [
        ["period", "ASC"],
        ['"index"', "ASC"],
      ],
      limit: 3,
      offset: offset,
    };

    if (matchIds.trim()) {
      filter.columnFilter.push({
        op: "in",
        column: ":|matchId|:",
        values: splitStringIds(matchIds),
      });
    }

    if (indexes.trim()) {
      filter.columnFilter.push({
        op: "in",
        column: "index",
        values: splitStringIds(indexes, { caster: (v) => parseInt(v) }),
      });
    }
    if (possessions.trim()) {
      filter.columnFilter.push({
        op: "in",
        column: "possession",
        values: splitStringIds(possessions),
      });
    }
    if (eventTypes.length > 0) {
      filter.columnFilter.push({
        op: "in",
        column: ":|typeId|:",
        values: eventTypes.length > 0 ? eventTypes : null,
      });
    }
    if (playPatternIds.length > 0) {
      filter.columnFilter.push({
        op: "in",
        column: ":|playPatternId|:",
        values: playPatternIds.length > 0 ? playPatternIds : [],
      });
    }

    console.log("filter", filter);
    return filter;
  })(offset, matchIds, indexes, possessions, eventTypes);
</script>

<div class="m-1">
  <label for="matchIds" class="form-label">
    Match Ids
    <input
      type="text"
      class="form-control"
      name="matchIds"
      placeholder="Match Id1, Match Id2, ..."
      aria-label="Match Id"
      on:change={() => _onFilterChange()}
      bind:value={matchIds}
    />
  </label>
</div>
<div class="m-1">
  <label for="eventIds" class="form-label">
    Event Ids
    <input
      type="text"
      class="form-control"
      name="eventIds"
      placeholder="Event #1, Event #2, ..."
      aria-label="Event Index"
      on:change={() => _onFilterChange()}
      bind:value={indexes}
    />
  </label>
</div>
<div class="m-1">
  <label for="possissionIds" class="form-label">
    Possession Ids
    <input
      type="text"
      class="form-control"
      name="possissionIds"
      placeholder="Possession #1, Possession #2,  ..."
      aria-label="Match Id"
      on:change={() => _onFilterChange()}
      bind:value={possessions}
    />
  </label>
</div>
<div class="m-1">
  <span class="form-label">
    Event Types
    <div>
      <OnOffButtons
        keyLabelPairs={asIdLabelTypePairs("key", "label")}
        bind:selectedKeys={eventTypes}
        xonChange={() => _onFilterChange()}
        exclusive={false}
      />
    </div>
  </span>
</div>
<div class="m-1">
  <span class="form-label">
    Play Pattern
    <div>
      <OnOffButtons
        keyLabelPairs={asIdLabelPlayPatternPairs("key", "label")}
        bind:selectedKeys={playPatternIds}
        xonChange={() => _onFilterChange()}
        exclusive={false}
      />
    </div>
  </span>
</div>
