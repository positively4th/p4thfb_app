<script>
  import { Route, Navigate } from "svelte-router-spa";

  export let currentRoute;
  const params = {};
</script>

<nav class="navbar">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Statsbomb Open Data </span>
    <Navigate to="matches">Matches</Navigate>
    <Navigate to="event">Events</Navigate>
  </div>
</nav>

<Route {currentRoute} {params} />
