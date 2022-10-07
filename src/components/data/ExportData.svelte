<script>
  import { todayStore, goalStore, limitStore, settingStore, historyStore } from '$stores/local';

  const exportData = () => {
    return JSON.stringify({
      today: $todayStore,
      history: $historyStore,
      goals: $goalStore,
      limits: $limitStore,
      settings: $settingStore
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
