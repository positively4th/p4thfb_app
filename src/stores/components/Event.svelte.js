import { readable, writable } from "svelte/store";
import { major } from "../../appversion";

import Event_v1 from '../../components/event/Event.svelte';
import Event_v2 from '../../components/event/Event_v2.svelte'


let Event = Event_v1
if (major >= 1) {
    Event = Event_v2
}


export const EventStore = readable(Event);

