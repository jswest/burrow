<script>
  import { marked } from "marked";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Header from "$lib/components/Header.svelte";

  let artifact;

  onMount(async () => {
    const res = await fetch(`/api/artifacts/${$page.params.id}`);
    artifact = await res.json();
    console.log(artifact);
  });
</script>

<Header />
<div class="Page">
  {#if artifact}
    {#if artifact.summaries.length > 0}
      {@const summary = artifact.summaries[0]}
      <header>
        <h2>A.I. title</h2>
        <h1>{summary.hed}</h1>
        <h2>A.I. summary</h2>
        <div class="markdown dek">{@html marked(summary.dek)}</div>
      </header>
      <div class="guts markdown">
        {@html marked(artifact.body)}
      </div>
    {/if}
  {/if}
</div>

<style>
  .Page {
    box-sizing: border-box;
    padding: var(--unit);
    width: 800px;
  }
  header {
    border-bottom: 1px solid var(--color-jasper);
    margin-bottom: calc(var(--unit) * 3);
    padding-bottom: calc(var(--unit) * 3);
  }
  header h1 {
    font-family: var(--font-display);
    font-size: calc(var(--unit) * 1.25);
    margin-bottom: calc(var(--unit) * 3);
  }
  header h2 {
    color: var(--color-jasper);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    font-weight: 800;
    letter-spacing: calc(var(--unit) * 0.75 * 0.1);
    margin-bottom: var(--unit);
    text-transform: uppercase;
  }
  .guts {
    background-color: var(--color-sunset);
    box-sizing: border-box;
    padding: var(--unit);
  }
</style>
