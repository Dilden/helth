<script>
  import { today, goals, limits, settings, history } from '$stores/stores';

  const upload = event => {
    if(event.target.files && event.target.files.length > 0) {
      if(confirm("Continuing the import will overwrite any existing data on your device. Would you like to continue?")) {
        const stream = event.target.files[0].text();
        stream.then(data => JSON.parse(data))
          .then(json => {
            $today = json.today;
            $goals = json.goals;
            $limits = json.limits;
            $settings = json.settings;
            $history = json.history;
          })
          .catch(error => {
              alert(`Error importing data: ${error}`);
          });
      }
    }
  }
</script>

<label for="data_upload">Import Data</label>
<input type="file" on:change={upload} id="data_upload"/>

<style>
  label {
    background: var(--a-link-color);
    color: var(--back-color);
    padding: 8px 20px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
  }
  label:hover {
    background: var(--secondary-back-color);
  }
  input {
    display: none;
  }
</style>
