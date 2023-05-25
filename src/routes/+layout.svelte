<script lang="ts">
  import "../app.css";
  let isMenuOpen = false;

  const logo = "assets/_logo exports/white/svg/UQHC_Logo_Horizontal_White.svg";

  const handleOpenMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
  const closeMobileMenu = () => {
    isMenuOpen = false;
  };
  const scrollToSection = (selector: string, scrollTop: number) => {
    const section = document.querySelector(selector);
    if (section) {
      window.scrollTo({
        top: section.clientTop + scrollTop,
        left: 0,
      });
    }
  };
</script>

<div class="flex flex-col min-h-screen max-w-screen bg-gray-800">
  <div class="flex-grow">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="/">
                <img
                  class="block h-12 w-auto lg:hidden"
                  src={logo}
                  alt="Utah Quality Heating and Cooling"
                />
              </a>
              <a href="/">
                <img
                  class="hidden h-12 w-auto lg:block"
                  src={logo}
                  alt="Utah Quality Heating and Cooling"
                />
              </a>
            </div>
            <div class="hidden sm:ml-6 sm:block" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex items-center">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <button
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  >Home</button
                >
                <button
                  on:click={() => {
                    scrollToSection("#contact-section", 1100);
                    closeMobileMenu();
                  }}
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >Contact</button
                >
                <button
                  on:click={() => {
                    scrollToSection("#contact-section", 1100);
                    closeMobileMenu();
                  }}
                  class="bg-orange-500 rounded-md px-3 py-2 text-sm font-medium text-white"
                  >Get Started</button
                >
                <!-- <a
                  href="#"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >About</a
                > -->
                <a
                  href="tel:+18016882612"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >(801)-688-2612</a
                >
              </div>
              <!-- Profile dropdown -->
              <div>
                <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <!--
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
<div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
            </div>
            -->
              </div>
            </div>
          </div>
          <div class="-mr-2 flex sm:hidden">
            <!-- Mobile menu button -->
            {#if !isMenuOpen}
              <button
                type="button"
                on:click={handleOpenMenu}
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
              </button>
            {/if}
            {#if isMenuOpen}
              <button
                type="button"
                on:click={handleOpenMenu}
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <svg
                  class="text-gray-400 block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            {/if}
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      {#if isMenuOpen}
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 grid justify-start px-2 pb-3 pt-3">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <button class="grid">
              <a
                href="#"
                class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >Home</a
              >
            </button>
            <button
              on:click={() => {
                scrollToSection("#contact-section", 900);
                closeMobileMenu();
              }}
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Contact</button
            >
            <button>
              <a
                class=" block bg-orange-500 rounded-md px-3 py-2 text-base font-medium text-gray-300"
              >
                <button
                  on:click={() => {
                    scrollToSection("#contact-section", 900);
                    closeMobileMenu();
                  }}
                >
                  Get Started
                </button>
              </a>
            </button>
            <button>
              <a
                href="tel:+18016882612"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >(801)-668-2612</a
              >
            </button>
          </div>
          <!--
      <div class="mt-3 space-y-1 px-2">
        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
      </div>
    </div>
      -->
        </div>
      {/if}
    </nav>
    <slot />
  </div>
  <footer class="bg-slate-800 text-white py-6">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex flex-wrap justify-between items-center">
        <div class="w-full md:w-auto mb-4 md:mb-0">
          <h2 class="font-bold text-xl mb-2">Utah Quality Heating & Cooling</h2>
          <a href="tel:+18016882612">Phone: (801) 688-2612</a>
        </div>
        <nav class="w-full md:w-auto">
          <ul class="flex flex-col md:flex-row md:space-x-4">
            <!--
            <li><a href="#" class="hover:text-gray-300">Home</a></li>
            <li><a href="#" class="hover:text-gray-300">Services</a></li>
 -->
            <!--  <li><a href="#" class="hover:text-gray-300">About</a></li>
            <li><a href="#" class="hover:text-gray-300">Contact</a></li>
              -->
          </ul>
        </nav>
      </div>
      <div class="mt-4 md:mt-0 text-center md:text-right">
        <p class="text-sm">
          &copy; 2023 Utah Quality Heating & Cooling. <br /> All Rights Reserved.
        </p>
      </div>
    </div>
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
</style>
