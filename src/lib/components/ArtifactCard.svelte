<script>
  export let artifact;
  const { id, summaries } = artifact;
  const [summary] = summaries;
</script>

{#if summary}
  <div class="ArtifactCard">
    <header>
      <p class="metadata-field id-field">{artifact.type}-{id}</p>
    </header>
    <div class="guts">
      <h1 class="hed-field">
        <a href="/artifacts/{id}">{summary.hed.replaceAll('"', '')}</a></h1>
      <p class="dek-field">{summary.dek}</p>
    </div>
  </div>
{/if}

<style>
  .ArtifactCard {
    background-color: var(--color-sunset);
    border: 1px solid var(--color-sunset);
    box-sizing: border-box;
    height: calc(var(--unit) * 20);
    width: calc(var(--unit) * 20);
  }
  header {
    background-color: var(--color-jasper);
    box-sizing: border-box;
    height: calc(var(--unit) * 2);
    padding: calc(var(--unit) * 0.625) calc(var(--unit) * 0.5);
    width: 100%;
  }
  header p {
    color: var(--color-sunset);
    font-weight: 800;
    line-height: 1;
  }
  .guts {
    height: calc(var(--unit) * 16);
    overflow: scroll;
    padding: calc(var(--unit));
  }
  .hed-field {
    font-family: var(--font-display);
    font-size: calc(var(--unit) * 1.25);
    font-weight: 800;
    margin-bottom: calc(var(--unit) * 0.25);
    margin-top: calc(var(--unit) * 0.25);
  }
  .hed-field a {
    color: inherit;
  }
  .dek-field {
    font-family: var(--font-sans);
    line-height: 1.5;
  }
  .metadata-field {
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    letter-spacing: calc(var(--unit) * 0.75 * 0.1);
    text-transform: uppercase;
  }
</style>
