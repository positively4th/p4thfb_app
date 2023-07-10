import { v4 as uuid } from "uuid";
import as from "positively4th.as";
import { joinIf } from "../tools/stringtools.js";

var asId = uuid();

const propSpecs = {
  __id: {
    rights: "r",
    default: (/* model */) => {},
  },
  index: {
    rights: "r",
    default: (/* model */) => {},
  },
};

function creator(model) {
  var yours = {};
  as.asProps(yours, propSpecs, model);
  // Public functions

  yours.shortTitle = function (tag) {
    return `${model.playerName} - ${model.typeName}${joinIf(": ", tag)}`;
  };

  yours.shortTime = function () {
    return `${("" + model.minute).padStart(2, "0")}:${(
      "" + model.second
    ).padStart(2, "0")}`;
  };

  var my = Object.create(yours);
  // Private functions

  return yours;
}

function asEvent(model) {
  return as.addMixin(asId, creator, model);
}

export default asEvent;
