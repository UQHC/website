<script lang="ts">
  import "../app.css";
  import { Assets } from "../utility/staticHelper";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const { orangePegIcon, facebook, instagram, twitter } = Assets.icons;

  const versions = [
    { path: "/", label: "v1" },
    { path: "/v2", label: "v2 (new UI)" },
  ];

  const navigate = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const path = target.value;
    if (path !== $page.url.pathname) {
      goto(path);
    }
    target.value = $page.url.pathname;
  };

</script>
<div class="min-h-screen font-oswald bg-black relative">
  <div class="absolute top-4 right-4 z-50">
    <select
      aria-label="Version"
      class="bg-black/70 text-white text-sm rounded-md border border-gray-600 px-2 py-1 focus:outline-none focus:ring focus:ring-cyan-300"
      on:change={navigate}
    >
      {#each versions as version}
        <option value={version.path} selected={$page.url.pathname === version.path}>
          {version.label}
        </option>
      {/each}
    </select>
  </div>
  <slot />
  <footer
    class="2xl:sticky top-[100vh] foot-bg text-white py-6 min-h-fit font-bold bottom-0 w-full md:text-xl"
  >
    <div class="md:flex p-9 grid justify-center">
      <div class="md:w-1/2">
        <div class="grid justify-center w-full md:w-auto mb-4 md:mb-0">
          <img
            class="h-20 w-20 md:h-28 md:w-28"
            src={orangePegIcon}
            alt="icon"
          />
        </div>
      </div>

      <div
        class="md:w-1/2 mt-4 md:mt-0 text-center md:text-right md:text-xl text-sm"
      >
        <div class="grid justify-center w-full md:w-auto mb-4 md:mb-0">
          <a href="tel:+18016882612">(801) 688-2612</a>
          <p>UTAHQUALITYHEATINGCOOLING@GMAIL.COM</p>
          <nav class="w-full md:w-auto">
            <ul
              class="flex md:justify-end justify-center flex-row space-x-2 md:space-x-0.5 md:pt-0 pt-2 md:flex-row md:space-x-4"
            >
              <li>
                <a href="#" class="hover:text-gray-300">
                  <img
                    class="h-8 w-8 md:h-8 md:w-8"
                    src={facebook}
                    alt="facebook-icon"
                  />
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-gray-300">
                  <img
                    class="h-8 w-8 md:h-8 md:w-8"
                    src={instagram}
                    alt="instagram-icon"
                  />
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-gray-300">
                  <img
                    class="h-8 w-8 md:h-8 md:w-8"
                    src={twitter}
                    alt="twitter-icon"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Bottom section -->
    </div>
    <p class="text-sm text-center md:pt-24 hidden md:block lg:block">
      &COPY; 2023 UTAH QUALITY HEATING & COOLING!. ALL RIGHTS RESERVED.
    </p>
    <p class="text-center md:pt-24 pt-6 py-2 text-xs md:hidden lg:hidden">
      &COPY; 2023 UTAH QUALITY HEATING & COOLING. <br /> ALL RIGHTS RESERVED.
    </p>
  </footer>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
  .a-no-style {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }
  .foot-bg {
    color: #ff6427;
    background-color: #660000;
  }
</style>
