import App from "./components/app.svelte";

window.addEventListener('load', () => new App({target: document.body, props: {name: 'Svelte'}}));
