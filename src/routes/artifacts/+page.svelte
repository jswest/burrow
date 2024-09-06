<script>
  import { onMount } from "svelte";
  import ArtifactCard from "$lib/components/ArtifactCard.svelte";
  import Header from "$lib/components/Header.svelte";

  let artifacts;

  onMount(async () => {
    const res = await fetch(`/api/artifacts`);
    artifacts = await res.json();
    console.log(artifacts);
  });
</script>

<Header />
<div class="Page">
  {#if artifacts}
    {#each artifacts as artifact}
      {#if artifact.summaries.length > 0}
        <div class="artifact-card-wrapper">
          <ArtifactCard {artifact} />
        </div>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .Page {
    box-sizing: border-box;
    padding: var(--unit);
    width: 1200px;
  }
  .artifact-card-wrapper {
    float: left;
    margin-bottom: var(--unit);
    margin-right: var(--unit);
  }
</style>
