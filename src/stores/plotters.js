import { readable } from "svelte/store";
import asRestRunner from "../mixins/restrunner";

function initPlotters(setter) {
  return asRestRunner({
    path: ["api", "plotters"],
  })
    .get()
    .then((resp) => {
      setter(resp.data);
    });
}

export default readable([], (set) => initPlotters(set));
