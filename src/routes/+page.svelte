<script>
  import { marked } from "marked";

  let response;
  let query = "";

  async function handleQuery() {
    const res = await fetch(`api/rag/?query=${query}`);
    response = await res.json();
    console.log(response);
  }
</script>

<div class="Page">
  <header>
    <h1>Burrow.</h1>
    <h2>Dig into what matters.</h2>
  </header>
  <div class="faux-form">
    <div class="field">
      <p class="helper">Query documents</p>
      <input bind:value={query} type="text" />
    </div>
    <div class="field">
      <button on:click={handleQuery}>Search</button>
    </div>
  </div>
  {#if response}
    <div class="response-wrapper">
      <h1>A.I. response</h1>
      <div class="markdown response">{@html marked(response)}</div>
    </div>
  {/if}
</div>

<style>
  .Page {
    box-sizing: border-box;
    padding: var(--unit);
    width: 800px;
  }
  header {
    margin-bottom: calc(var(--unit) * 3);
  }
  header h1 {
    color: var(--color-sunset);
    font-size: calc(var(--unit) * 8);
    font-weight: 800;
  }
  header h2 {
    color: var(--color-sunset);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 3);
    font-weight: 100;
  }
  .field {
    margin-bottom: var(--unit);
    width: 100%;
  }
  .field .helper {
    color: var(--color-sunset);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    font-weight: 800;
    letter-spacing: calc(var(--unit) * 0.75 * 0.1);
    margin-bottom: calc(var(--unit) * 0.25);
    text-transform: uppercase;
  }
  input {
    background-color: var(--color-sunset);
    border: none;
    box-sizing: border-box;
    color: var(--color-black);
    font-family: var(--font-serif);
    font-size: calc(var(--unit) * 2);
    height: calc(var(--unit) * 4);
    outline: none;
    padding: var(--unit);
    width: 100%;
  }
  button {
    background-color: var(--color-sunset);
    border: none;
    box-sizing: border-box;
    color: var(--color-black);
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
  .response-wrapper h1 {
    color: var(--color-sunset);
    font-family: var(--font-sans);
    font-size: calc(var(--unit) * 0.75);
    font-weight: 800;
    letter-spacing: calc(var(--unit) * 0.75 * 0.1);
    margin-bottom: calc(var(--unit) * 0.25);
    margin-top: calc(var(--unit) * 3);
    text-transform: uppercase;
  }
  .response {
    background-color: var(--color-sunset);
    padding: var(--unit);
  }
</style>
