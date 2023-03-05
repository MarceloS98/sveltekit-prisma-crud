<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ users } = data);
</script>

<br />

<main class="flex items-center flex-col">
  <h1 class="font-bold text-3xl mb-5 underline uppercase">Agregar Usuarios</h1>
  <form method="POST" action="?/createUser" class=" gap-x-3">
    <input
      type="text"
      name="name"
      placeholder="Nombre"
      class="border border-slate-300 p-2 rounded-md"
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      class="border border-slate-300 p-2 rounded-md"
    />
    <button class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
      >Agregar</button
    >
  </form>

  <section class="mt-5 border-t-2 border-slate-200 pt-5">
    {#if users.length !== 0}
      <div class="flex items-center justify-center flex-col gap-x-5">
        {#each users as user}
          <div class="flex mb-4 gap-x-3 justify-between w-full">
            <div class=" flex flex-col  justify-center">
              <span class="text-2xl">{user.name}</span>
              <span class="text-md text-slate-500">{user.email}</span>
            </div>
            <div class="flex gap-x-2 items-center">
              <form method="POST" action="?/deleteUser&id={user.id}">
                <button
                  type="submit"
                  class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  >Eliminar</button
                >
              </form>
              <a
                href="/users/{user.id}"
                role="button"
                class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                >Edit</a
              >
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <h1>No data</h1>
    {/if}
  </section>
</main>
