<script>

  export let count = 1;
</script>


<span class='nutrient {count % 2 ? "even" : "odd"}'>
  <label for='name-{count}'>Name {count}</label>
  <input type='text' id='name-{count}' name='name-{count}' placeholder='Name'/>
  <label for='quantity-{count}'>Quantity {count}</label>
  <input type='text' id='quantity-{count}' name='quantity-{count}' placeholder='Quantity'/>
</span>

<style>
  .nutrient {
    padding: .25rem;
    margin: .5rem;
  }
  .nutrient.odd {
    background-color: var(--secondary-back-color);
  }
  .nutrient label, .nutrient input {
    display: block;
  }
</style>
