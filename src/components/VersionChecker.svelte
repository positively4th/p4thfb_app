<script>
  import { onMount } from "svelte";
  import asRestRunner from "../mixins/restrunner.js";

  import { version } from "../appversion.js";

  const appVersion = version;
  let serverVersion = appVersion;
  let isVersionOk = true;
  let versionMessage = "";

  onMount(() => {
    asRestRunner({
      path: ["api", "system", "version"],
    })
      .get()
      .then((resp) => {
        serverVersion = resp.data.version;
        isVersionOk = serverVersion[0] === appVersion[0];
        if (!isVersionOk) {
          versionMessage = `Version mismatch detected. App version is ${appVersion.join(
            "."
          )}, but server version is ${serverVersion.join(".")}.`;
        }
      })
      .catch((err) => {
        isVersionOk = null;
        serverVersion = null;
        versionMessage = `Possible version mismatch detected. App version is ${appVersion.join(
          "."
        )}, but server version could not be retrieved.`;
      });
  });
</script>

{#if !isVersionOk}
  <div class="alert alert-danger" role="alert">
    Error: {versionMessage}
  </div>
{/if}

<style>
</style>
