<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Assets } from "../../utility/staticHelper";
  import type { Email, EmailRequest } from "../api/email/services/sendgrid/types";
  import { onMount } from "svelte";

  import { validateEmail } from "../../utility/validators";
  import { success, warning } from "../../utility/toast-theme";

  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { colorLogoLg } = Assets.icons;

  const photos = [
    { src: "assets/jpg/IMG_8759.webp" },
    { src: "assets/jpg/IMG_8803.webp" },
    { src: "assets/jpg/IMG_8765.webp" },
    { src: "assets/jpg/IMG_8826.webp" },
    { src: "assets/jpg/IMG_8834.webp" },
    { src: "assets/jpg/IMG_9033.webp" }
  ];

  const cities = [
    "Bountiful", "Centerville", "Clearfield", "Clinton", "Cottonwood Heights",
    "Draper", "Farmington", "Fruit Heights", "Hill AFB", "Holladay", "Kaysville",
    "Layton", "Midvale", "Millcreek", "Murray", "North Salt Lake", "Ogden",
    "Riverdale", "Riverton", "Roy", "Salt Lake City", "Sandy", "South Jordan",
    "South Weber", "Sunset", "Syracuse", "West Jordan", "Woods Cross"
  ];

  const emptyEmail = (): Email => ({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phone: ""
  });

  onMount(() => {
    dark = document.documentElement.classList.contains("dark");
  });

  let email = emptyEmail();

  const switchVersion = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value) window.location.href = value;
  };
  let emailSent = false;
  let sending = false;

  let dark = false;

  const toggleDark = () => {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  const sendEmail = async (event: SubmitEvent) => {
    event.preventDefault();
    if (sending) return;

    if (!validateEmail(email)) {
      warning("Please fill in all fields with a valid phone number");
      return;
    }

    const emailRequest: EmailRequest = {
      to: VITE_UQHC_EMAIL as string,
      subject: "New Client Information",
      dynamicTemplateData: email,
      from: { email: VITE_UQHC_EMAIL as string },
      templateId: VITE_SENDGRID_TEMPLATE_ID as string
    };

    sending = true;
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ emailRequest }),
        headers: { "content-type": "application/json" }
      });
      if (response.ok) {
        success("Email sent successfully");
        emailSent = true;
      } else {
        warning("Error sending email");
      }
    } catch (err) {
      warning("Error sending email");
      console.log(err);
    } finally {
      sending = false;
    }
  };

  const inputClass =
    "mt-2 block w-full appearance-none border-b border-gray-300 bg-transparent px-0 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-uqhc-orange focus:outline-none dark:border-gray-600 dark:text-gray-100";
</script>


<div class="toast-container">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</div>

<div
  class="min-h-screen bg-white font-oswald text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-gray-100"
>
  <!-- Header: hairline rule, generous spacing -->
  <header class="border-b border-gray-200 dark:border-gray-800">
    <div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
      <a href="/v2" class="flex items-center gap-4">
        <img class="h-10 w-10" src={colorLogoLg} alt="Utah Quality Heating and Cooling logo" />
        <span class="text-sm font-medium uppercase tracking-[0.2em]">
          Utah Quality <span class="text-uqhc-orange">Heating & Cooling</span>
        </span>
      </a>

      <div class="flex items-center gap-6">
        <select
          aria-label="Version"
          class="cursor-pointer border-b border-gray-300 bg-transparent pb-0.5 text-xs uppercase tracking-widest text-gray-500 focus:outline-none dark:border-gray-700 dark:text-gray-400"
          on:change={switchVersion}
        >
          <option value="">v2</option>
          <option value="/">v1</option>
        </select>

        <button
          on:click={toggleDark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          class="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:text-uqhc-orange dark:text-gray-400"
        >
          {#if dark}
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          {:else}
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          {/if}
        </button>

        <a
          href="tel:+18016682612"
          class="border-b border-transparent pb-1 text-sm font-medium tracking-wider text-gray-700 transition hover:border-uqhc-orange hover:text-uqhc-orange dark:text-gray-300"
        >
          (801) 668-2612
        </a>
      </div>
    </div>
  </header>

  <!-- Hero: massive type, one accent, huge negative space -->
  <section class="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-36 md:pt-32">
    <p class="text-xs font-medium uppercase tracking-[0.35em] text-uqhc-orange">
      Heating & Cooling — Northern Utah
    </p>
    <h1 class="mt-8 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight md:text-8xl">
      Comfort,<br />
      <span class="text-gray-300 dark:text-gray-600">done right.</span>
    </h1>

    <div class="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-16">
      <p class="max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">
        Repairs, installs, and tune-ups from Ogden to Draper. Upfront quotes,
        licensed technicians, and we show up when we say we will.
      </p>
      <div class="flex flex-wrap items-start gap-4 md:justify-end">
        <a
          href="#quote"
          class="bg-uqhc-orange px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500"
        >
          Get a Quote
        </a>
        <a
          href="tel:+18016682612"
          class="border border-gray-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-gray-700 transition hover:border-uqhc-orange hover:text-uqhc-orange dark:border-gray-700 dark:text-gray-300"
        >
          Call Us
        </a>
      </div>
    </div>
  </section>

  <!-- Divider words, MDS-style section labels -->
  <section class="border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto max-w-6xl px-6 md:px-10">
      <div class="grid gap-10 py-16 md:grid-cols-3 md:py-24">
        <div class="md:border-r md:border-gray-200 md:pr-10 md:dark:border-gray-800">
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">01</p>
          <h3 class="mt-6 text-xl font-medium">Licensed & Insured</h3>
          <p class="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Certified technicians you can trust inside your home.
          </p>
        </div>
        <div class="md:border-r md:border-gray-200 md:pr-10 md:dark:border-gray-800">
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">02</p>
          <h3 class="mt-6 text-xl font-medium">Same-Day Service</h3>
          <p class="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Fast response across the Wasatch Front, seven days a week.
          </p>
        </div>
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">03</p>
          <h3 class="mt-6 text-xl font-medium">Upfront Pricing</h3>
          <p class="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Transparent written quotes. No surprise fees, ever.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Photos: clean editorial grid, no tilt clutter -->
  <section class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
    <div class="flex items-baseline justify-between">
      <h2 class="text-3xl font-medium tracking-tight md:text-5xl">Selected Work</h2>
      <p class="hidden text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 sm:block">
        Real jobs — no stock photos
      </p>
    </div>
    <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {#each photos as photo, i}
        <a href={photo.src} class="group block overflow-hidden bg-gray-100 dark:bg-neutral-900">
          <img
            class="aspect-9/10 w-full object-cover grayscale-[20%] transition duration-500 group-hover:scale-102 group-hover:grayscale-0"
            src={photo.src}
            alt="HVAC installation by Utah Quality Heating and Cooling"
            loading={i < 3 ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      {/each}
    </div>
  </section>

  <!-- Quote + service area -->
  <section class="border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto grid max-w-6xl gap-16 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
      <!-- Form: underline inputs, minimal -->
      <div id="quote" class="scroll-mt-24">
        <h2 class="text-3xl font-medium tracking-tight md:text-5xl">Get in touch</h2>
        {#if !emailSent}
          <form class="mt-10" on:submit={sendEmail}>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label for="v2-first-name" class="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">First</label>
                <input type="text" id="v2-first-name" bind:value={email.firstName} autocomplete="given-name" class={inputClass} />
              </div>
              <div>
                <label for="v2-last-name" class="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">Last</label>
                <input type="text" id="v2-last-name" bind:value={email.lastName} autocomplete="family-name" class={inputClass} />
              </div>
            </div>
            <div class="mt-8">
              <label for="v2-email" class="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">Email</label>
              <input type="email" id="v2-email" bind:value={email.email} autocomplete="email" class={inputClass} />
            </div>
            <div class="mt-8">
              <label for="v2-phone" class="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">Phone</label>
              <input type="tel" id="v2-phone" bind:value={email.phone} autocomplete="tel" class={inputClass} />
            </div>
            <div class="mt-8">
              <label for="v2-message" class="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">Message</label>
              <textarea id="v2-message" rows="2" bind:value={email.message} class={inputClass} />
            </div>
            <button
              type="submit"
              disabled={sending}
              class="mt-10 bg-uqhc-orange px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </form>
        {:else}
          <div class="mt-10">
            <p class="text-xl font-medium">Thank you.</p>
            <p class="mt-4 text-gray-500 dark:text-gray-400">We'll be in touch shortly.</p>
            <button
              on:click={() => { emailSent = false; email = emptyEmail(); }}
              class="mt-8 border-b border-gray-400 pb-1 text-sm uppercase tracking-widest text-gray-500 transition hover:border-uqhc-orange hover:text-uqhc-orange dark:text-gray-400"
            >
              Send Another
            </button>
          </div>
        {/if}
      </div>

      <!-- Service area -->
      <div>
        <h2 class="text-3xl font-medium tracking-tight md:text-5xl">Service Area</h2>
        <p class="mt-6 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Based in Ogden, serving the whole Wasatch Front.
        </p>
        <p class="mt-8 text-sm leading-loose text-gray-600 dark:text-gray-300 md:columns-2 md:gap-8">
          {#each cities as city, i}
            {city}{i < cities.length - 1 ? "," : ""}
          {/each}
        </p>
      </div>
    </div>
  </section>

  <!-- Footer: hairline, small caps, mono-spaced feel -->
  <footer class="border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
      <p class="text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
        Utah Quality Heating & Cooling
      </p>
      <p class="text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
        Reliable · Qualified · Dependable · Licensed · Insured
      </p>
      <a href="tel:+18016682612" class="text-xs uppercase tracking-[0.25em] text-gray-500 transition hover:text-uqhc-orange dark:text-gray-400">
        (801) 668-2612
      </a>
    </div>
    <div class="border-t border-gray-200 dark:border-gray-800">
      <p class="mx-auto max-w-6xl px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 md:px-10">
        © 2023 Utah Quality Heating & Cooling — All rights reserved
      </p>
    </div>
  </footer>
</div>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 5px;
    --toastContainerBottom: 20px;
    --toastContainerLeft: auto;
    --toastContainerPosition: fixed;
  }
</style>
