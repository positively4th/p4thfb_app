<script>
  import asRestRunner from "../../mixins/restrunner.js";
  import asEvent from "../../mixins/event.js";
  import asColor from "../../mixins/color.js";
  import { default as createTagTools } from "../../tools/tagtools.js";
  import { asIdLabelMap as asIdLabelTypeMap } from "../../constants/eventtypes.js";
  import asVisiblePlayers from "../../mixins/VisiblePlayers.js";
  import Pitch from "../pitch/Pitch.svelte";
  import Ball from "../pitch/Ball.svelte";
  import { default as PitchEvents } from "../pitch/Events.svelte";
  import RelatedEvents from "./RelatedEvents.svelte";
  import FeaturePicker from "../../components/feature/FeaturePicker.svelte";
  import EstimatorPicker from "../../components/estimator/EstimatorPicker.svelte";
  import OnOffButtons from "../OnOffButtons.svelte";
  import EventTypeWrapper from "./type/Wrapper.svelte";
  import { default as PitchMetas } from "../pitch/Metas.svelte";
  import create from "../../tools/canvastransform.js";
  import { default as createTeamColorTools } from "../../tools/teamcolortools.js";
  import { sqrt } from "mathjs";

  import * as R from "ramda";
  const teamColorTools = createTeamColorTools();
  const tagTools = createTagTools();

  export let blur = true;
  export let pitchWidth = 80;
  export let pitchHeight = 120;
  export let canvasHeight = 780;
  export let canvasWidth = (canvasHeight * pitchWidth) / pitchHeight;
  export let eventFilter;

  let typeIdSpecMap = asIdLabelTypeMap();

  let featureMetas = [];
  let filter = {};
  export let event = {};
  let visibleRelatedEventIds = [];

  let cT;
  let cTFlipped;
  let canvasTransform;

  $: homeTeamColor = teamColorTools.getTeamColor(event.homeTeamName);
  $: awayTeamColor = teamColorTools.getTeamColor(
    event.awayTeamName,
    homeTeamColor
  );
  $: homeTeamBackColor = teamColorTools.getTeamColor(
    event.homeTeamName,
    homeTeamColor,
    { alpha: 0.5 }
  );
  $: awayTeamBackColor = teamColorTools.getTeamColor(
    event.awayTeamName,
    awayTeamColor,
    { alpha: 0.5 }
  );

  $: padding = Math.ceil(
    0.025 * sqrt(pitchWidth * pitchWidth + pitchHeight * pitchHeight)
  );
  $: worldWith = pitchWidth + 2 * padding;
  $: worldHeight = pitchHeight + 2 * padding;

  $: {
    cT = create(
      [padding, padding, 1],
      [worldWith / canvasWidth, worldHeight / canvasHeight, 1]
    );

    cTFlipped = create(
      [padding, padding, 1],
      [worldWith / canvasWidth, worldHeight / canvasHeight, 1],
      cT.flipWorldT({ width: pitchWidth, height: pitchHeight })
    );

    //cTFlipped = cT;
    canvasTransform = [cT, cTFlipped];
  }

  $: ball = {
    x: event.x,
    y: event.y,
  };

  $: relatedEvents = (event && event.relatedEvents) || {};
  $: visibleRelatedEvents = R.pipe(
    R.filter((re) => re && visibleRelatedEventIds.includes(re.event__id))
  )(relatedEvents);

  $: type = (() => {
    return event.type || null;
  })();

  $: onOffKeyLabelPairs = ((relatedEvents) => {
    try {
      const idTagsMap = R.reduce((res, event) => {
        res[event.event__id] = R.map((tag) => tagTools.getName(tag))(event.tag);
        return res;
      })({}, relatedEvents);

      const idEventMap = R.pipe(
        R.sortBy(R.prop("index")),
        R.indexBy((event) => event.event__id)
      )(relatedEvents);

      const res = R.map(([id, event]) => {
        const eventee = asEvent(event);
        return {
          key: id,
          label: `${eventee.shortTime()}: ${eventee.shortTitle(
            (idTagsMap[id] || []).join(", ")
          )}`,
        };
      })(R.toPairs(idEventMap));
      return res;
    } catch {
      return [];
    }
  })(relatedEvents);

  $: colorSpec = {
    alphaFactor: 1.0,
    homeTeamColor,
    awayTeamColor,
  };

  $: relatedColorSpec = {
    ...colorSpec,
    ...{
      alphaFactor: 0.6666 / visibleRelatedEvents.length,
    },
  };

  $: flipBall = event.eventTeamId != event.homeTeamId;

  $: {
    console.log("event: ", event);
    console.log("visibleRelatedEvents", visibleRelatedEvents);
  }
</script>

{#if event.eventId}
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading1">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapse1"
                aria-expanded="false"
                aria-controls="flush-cwdollapse1"
              >
                <span
                  class="p-1"
                  style:color={homeTeamColor}
                  style:background-color={homeTeamBackColor}
                  >{event.homeTeamName}
                </span>
                -
                <span
                  class="p-1"
                  style:color={awayTeamColor}
                  style:background-color={awayTeamBackColor}
                  >{event.awayTeamName}
                </span>
              </button>
            </h2>
            <div
              id="flush-collapse1"
              class="accordion-collapse collapse"
              aria-labelledby="flush-heading1"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body" />
            </div>
          </div>

          {#if type}
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading2">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse2"
                  aria-expanded="false"
                  aria-controls="flush-collapse2"
                >
                  {event.typeName}
                </button>
              </h2>
              <div
                id="flush-collapse2"
                class="accordion-collapse collapse"
                aria-labelledby="flush-heading2"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <EventTypeWrapper {type} />
                </div>
              </div>
            </div>
          {/if}

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading3">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapse3"
                aria-expanded="false"
                aria-controls="flush-collapse3"
              >
                Related Events ({R.values(relatedEvents).length})
              </button>
            </h2>
            <div
              id="flush-collapse3"
              class="accordion-collapse collapse"
              aria-labelledby="flush-heading3"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <OnOffButtons
                  typeFilter={true}
                  keyLabelPairs={onOffKeyLabelPairs || []}
                  bind:selectedKeys={visibleRelatedEventIds}
                />
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading-features">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapse-features"
                aria-expanded="false"
                aria-controls="flush-collapse-features"
              >
                Features
              </button>
            </h2>
            <div
              id="flush-collapse-features"
              class="accordion-collapse collapse"
              aria-labelledby="flush-heading-features"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <FeaturePicker
                  {eventFilter}
                  {event}
                  bind:metas={featureMetas}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {#key event}
        <div class="col">
          <Pitch
            canvasTransform={cT}
            {canvasWidth}
            {canvasHeight}
            {pitchWidth}
            {pitchHeight}
            {blur}
          >
            <PitchEvents
              events={visibleRelatedEvents}
              {canvasTransform}
              colorSpec={relatedColorSpec}
            />
            <PitchEvents events={[event]} {canvasTransform} {colorSpec} />
            {#if event.x && event.y && event.typeId != /* GoalKeeper */ "23"}
              <Ball {ball} canvasTransform={flipBall ? cTFlipped : cT} />
            {/if}
            <PitchMetas
              metas={featureMetas}
              canvasTransform={flipBall ? cTFlipped : cT}
            />
          </Pitch>
        </div>
      {/key}

      <div class="col">
        <div class="card">
          <div class="card-content">
            <EstimatorPicker {event} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
</style>
