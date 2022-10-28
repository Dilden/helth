<script>
  import { onMount } from 'svelte';
  import { today, goals, limits, settings, history } from '$stores/stores';

  onMount(() => {
    today.init();
    goals.init();
    limits.init();
    settings.init();
    history.init();
  });

  const exportData = () => {
    return JSON.stringify({
      today: $today,
      history: $history,
      goals: $goals,
      limits: $limits,
      settings: $settings
    });
  }
</script>

<a href="data:text/json;charset=utf-8,{exportData()}" download="helth_app_{Date.now()}.json">Export Your Data</a>

<style>
  a {
    background: var(--a-link-color);
    color: var(--back-color);
    padding: 8px 20px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    background: var(--secondary-back-color);
  }
</style>
