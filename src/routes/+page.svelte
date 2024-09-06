<script>
  import { marked } from "marked";

  import ArtifactCard from "$lib/components/ArtifactCard.svelte";

  let artifacts = [];
  let response = null;
  let query = "";
  let working = false;

  async function handleQuery() {
    working = true;
    artifacts = [];
    response = null;
    const res = await fetch(`api/rag/?query=${query}`);
    const data = await res.json();
    artifacts = [...data.artifacts];
    response = data.response;
    working = false;
  }
</script>

<header class="primary">
  <h1>Burrow.</h1>
</header>
<section class="faux-form-wrapper">
  <div class="box faux-form">
    <header>
      <h1>Query documents</h1>
    </header>
    <div class="guts">
      <div class="field">
        <input bind:value={query} type="text" />
      </div>
      {#if !working}
      <div class="field">
        <button on:click={handleQuery}>Search</button>
      </div>
      {/if}
    </div>
  </div>
</section>
{#if response}
  <section class="response-wrapper">
    <div class="box response">
      <header>
        <h1>A.I. response</h1>
      </header>
      <div class="guts markdown">
        {@html marked(response)}
      </div>
    </div>
    <div class="artifacts">
      {#each artifacts as artifact}
        <div class="artifact-card-wrapper">
          <ArtifactCard {artifact} />
        </div>
      {/each}
    </div>
    <div class="clear" />
  </section>
{/if}

<style>
  header.primary {
    background-color: var(--color-jasper);
    border-bottom: calc(var(--unit) * 0.25) solid var(--color-sunset);
    box-sizing: border-box;
    margin-bottom: calc(var(--unit) * 1);
    padding: var(--unit);
    width: 100vw;
  }
  header.primary h1 {
    color: var(--color-sunset);
    font-family: var(--font-display);
    font-size: calc(var(--unit) * 8);
    font-weight: 800;
  }
  .faux-form-wrapper {
    box-sizing: border-box;
    padding: var(--unit);
    width: calc((var(--unit) * 5) + 960px);
  }
  .faux-form {
    background-color: var(--color-sunset);
    box-sizing: border-box;
  }
  .field {
    margin-bottom: var(--unit);
    width: 100%;
  }
  input {
    background-color: white;
    border: none;
    border: 1px solid var(--color-jasper);
    box-sizing: border-box;
    color: var(--color-black);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 2);
    height: calc(var(--unit) * 4);
    outline: none;
    padding: var(--unit);
    width: 100%;
  }
  button {
    background-color: var(--color-jasper);
    border: 1px solid var(--color-jasper);
    box-sizing: border-box;
    color: var(--color-sunset);
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    font-weight: 800;
    height: calc(var(--unit) * 2);
    outline: none;
    padding: calc(var(--unit) * 0.5);
    text-align: left;
    text-transform: uppercase;
    width: calc(50% - (var(--unit) * 0.5));
  }
  .response-wrapper {
    box-sizing: border-box;
    padding: var(--unit);
    width: calc((var(--unit) * 5) + 960px);
  }
  .response-wrapper .artifacts .artifact-card-wrapper {
    float: left;
    margin-bottom: var(--unit);
    margin-right: var(--unit);
  }
  .response-wrapper .response {
    border: 1px solid var(--color-sunset);
    margin-bottom: var(--unit);
  }
  .box .guts,
  .response-wrapper .response .guts {
    background-color: var(--color-sunset);
    padding: var(--unit);
  }
  .box header,
  .response-wrapper .response header {
    background-color: var(--color-jasper);
    box-sizing: border-box;
    height: calc(var(--unit) * 2);
    padding: calc(var(--unit) * 0.625) calc(var(--unit) * 0.5);
  }
  .box header h1,
  .response-wrapper .response header h1 {
    color: var(--color-sunset);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    font-weight: 800;
    letter-spacing: calc(var(--unit) * 0.75 * 0.1);
    text-transform: uppercase;
  }
</style>
