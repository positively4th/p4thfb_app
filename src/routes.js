import Default from "./layouts/default.svelte";
import Matches from "./views/Matches.svelte";
import Event from "./views/Event.svelte";

const routes = [
  {
    name: "/",
    component: Matches,
    layout: Default,
  },
  {
    name: "matches",
    component: Matches,
    layout: Default,
  },
  {
    name: "event",
    component: Event,
    layout: Default,
  },
];

export { routes };
