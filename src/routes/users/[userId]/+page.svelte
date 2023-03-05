<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ name, email } = data);
</script>

<form action="?/updateUser" method="POST">
  <input type="text" name="name" placeholder="Nombre" value={name} />
  <input type="email" name="email" placeholder="Email" value={email} />
  <button type="submit">Actualizar</button>
</form>
