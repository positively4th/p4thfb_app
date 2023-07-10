<script>
  import * as R from "ramda";

  import { asIdLabelPairs as asIdLabelTypePairs } from "../../constants/eventtypes";
  import OnOffButtons from "../../components/OnOffButtons.svelte";

  export let description = "";
  export let competitionIdLabelMaps = [];
  export let competitionIds = [];

  export let filter = {};
  export let offset = 0;
  export let onFilterChange = () => {};

  function _onFilterChange() {
    offset = 0;
    onFilterChange();
  }

  $: filter = ((offset, competitionIds) => {
    const filter = {
      columnFilter: [],
      order: [[":|matchDate|:::date", "ASC"]],
    };

    if (description.length > 0) {
      filter.columnFilter.push({
        op: "~",
        column: [
          ":|matchDate|:",
          ":|competitionId|:",
          ":|competitionStageName|:",
          ":|homeTeamName|:",
          ":|homeScore|:",
          "'-'",
          ":|awayScore|:",
          ":|awayTeamName|:",
        ].join(" || ' ' || "),
        values: description,
      });
    }

    if (competitionIds.length > 0) {
      filter.columnFilter.push({
        op: "in",
        column: ":|competitionId|:",
        values: competitionIds.length > 0 ? competitionIds : null,
      });
    }

    return filter;
  })(offset, competitionIds);
</script>

<div class="m-1">
  <div class="m-1">
    <label for="description" class="form-label">
      Description
      <input
        type="text"
        class="form-control"
        name="description"
        placeholder="Match Date ... Away Team Name"
        aria-label="Description"
        on:change={() => _onFilterChange()}
        bind:value={description}
      />
    </label>
  </div>

  <span class="form-label">
    Competition
    <div>
      <OnOffButtons
        keyLabelPairs={R.map((c) => ({
          key: c.competitionId,
          label: c.competitionName,
        }))(competitionIdLabelMaps)}
        bind:selectedKeys={competitionIds}
        xonChange={() => _onFilterChange()}
        exclusive={false}
      />
    </div>
  </span>
</div>
