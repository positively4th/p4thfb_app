<script>
  import { Router, Route } from "svelte-router-spa";
  import { routes } from "./routes";
  import VersionChecker from "./components/VersionChecker.svelte";
</script>

<VersionChecker />
<Router {routes} />
