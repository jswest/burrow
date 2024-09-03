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
      <div class="artifact-card-wrapper">
        <ArtifactCard {artifact} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .Page {
    box-sizing: border-box;
    padding: var(--unit);
    width: 800px;
  }
  .artifact-card-wrapper {
    margin-bottom: var(--unit);
    margin-right: var(--unit);
  }
</style>
