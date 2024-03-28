<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Whoops, sorry about that!</h1>
<p>
	It looks like you've encountered an error. If you like to see this resolved, go ahead and send the
	following information to <a href="mailto:support@helth.app?subject=Chart error"
		>support@helth.app</a
	>:
</p>
<pre>
  <code>
    {$page?.error?.message}
  </code>
</pre>
