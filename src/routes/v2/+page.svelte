<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Assets } from "../../utility/staticHelper";
  import type { Email, EmailRequest } from "../api/email/services/sendgrid/types";
  import { validateEmail } from "../../utility/validators";
  import { success, warning } from "../../utility/toast-theme";

  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { backgroundImg, arches } = Assets.image;
  const { colorLogoLg, orangePegIcon, temperature, fan, tools, gears } = Assets.icons;

  const services = [
    { name: "AC Repair & Install", icon: temperature },
    { name: "Furnace & Heating", icon: fan },
    { name: "Maintenance & Tune-Ups", icon: tools },
    { name: "Free Second Opinions", icon: gears }
  ];

  const photos = [
    { src: "assets/jpg/IMG_8759.webp", rotate: "md:rotate-2" },
    { src: "assets/jpg/IMG_8803.webp", rotate: "md:-rotate-1" },
    { src: "assets/jpg/IMG_8765.webp", rotate: "md:rotate-1" },
    { src: "assets/jpg/IMG_8826.webp", rotate: "md:-rotate-2" },
    { src: "assets/jpg/IMG_8834.webp", rotate: "md:rotate-1" },
    { src: "assets/jpg/IMG_9033.webp", rotate: "md:-rotate-1" }
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

  let email = emptyEmail();
  let emailSent = false;
  let sending = false;

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
    "mt-1 block w-full rounded border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-uqhc-orange focus:ring-uqhc-orange sm:text-sm";

  const switchVersion = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value) window.location.href = value;
  };
</script>

<div class="toast-container">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</div>

<div class="min-h-screen bg-white font-oswald text-gray-900">
  <!-- Header -->
  <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
      <a href="/v2" class="flex items-center gap-2">
        <img class="h-10 w-10" src={colorLogoLg} alt="Utah Quality Heating and Cooling logo" />
        <span class="hidden text-sm font-bold uppercase leading-tight tracking-wider text-gray-800 sm:block">
          Utah Quality<br /><span class="text-uqhc-orange">Heating & Cooling</span>
        </span>
      </a>

      <div class="flex items-center gap-3">
        <select
          aria-label="Version"
          class="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 focus:outline-none"
          on:change={(event) => switchVersion(event)}
        >
          <option value="">v2 (new)</option>
          <option value="/">Back to v1</option>
        </select>
        <a
          href="tel:+18016682612"
          class="bg-uqhc-orange px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-500"
        >
          (801) 668-2612
        </a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="border-b border-gray-100 bg-gradient-to-b from-orange-50 to-white">
    <div class="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_minmax(0,380px)] lg:py-20">
      <div class="self-center">
        <div class="flex items-center gap-4">
          <img class="h-24 w-24 md:h-28 md:w-28" src={colorLogoLg} alt="Utah Quality Heating and Cooling penguin logo" />
          <div class="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Serving the Wasatch Front<br />since 2003
          </div>
        </div>
        <h1 class="mt-6 text-4xl font-bold uppercase leading-none text-gray-900 md:text-5xl">
          Comfort you can<br class="sm:hidden" />
          count on.<br />
          <span class="text-uqhc-orange">Prices you'll like.</span>
        </h1>
        <p class="mt-5 max-w-md text-lg leading-snug text-gray-600">
          Repairs, installs, and tune-ups from Ogden to Draper. Upfront
          quotes, licensed techs, and we actually show up on time.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href="tel:+18016682612"
            class="bg-uqhc-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-md shadow-orange-200 transition hover:bg-orange-500"
          >
            Call (801) 668-2612
          </a>
          <a
            href="#quote"
            class="border-2 border-gray-800 px-6 py-3 text-base font-bold uppercase tracking-wide text-gray-800 transition hover:bg-gray-800 hover:text-white"
          >
            Free Quote
          </a>
        </div>
      </div>

      <!-- Quote form -->
      <div id="quote" class="scroll-mt-24 self-start rounded-lg border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200 sm:p-7">
        {#if !emailSent}
          <h2 class="text-xl font-bold uppercase text-gray-900">Get a free quote</h2>
          <p class="mt-1 text-sm text-gray-500">We respond within one business day.</p>
          <form class="mt-5" on:submit={sendEmail}>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="v2-first-name" class="text-sm font-medium text-gray-700">First name</label>
                <input type="text" id="v2-first-name" bind:value={email.firstName} autocomplete="given-name" class={inputClass} />
              </div>
              <div>
                <label for="v2-last-name" class="text-sm font-medium text-gray-700">Last name</label>
                <input type="text" id="v2-last-name" bind:value={email.lastName} autocomplete="family-name" class={inputClass} />
              </div>
            </div>
            <div class="mt-3">
              <label for="v2-email" class="text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="v2-email" bind:value={email.email} autocomplete="email" class={inputClass} />
            </div>
            <div class="mt-3">
              <label for="v2-phone" class="text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="v2-phone" bind:value={email.phone} autocomplete="tel" class={inputClass} />
            </div>
            <div class="mt-3">
              <label for="v2-message" class="text-sm font-medium text-gray-700">What's going on?</label>
              <textarea id="v2-message" rows="3" bind:value={email.message} class={inputClass} />
            </div>
            <button
              type="submit"
              disabled={sending}
              class="mt-5 w-full bg-uqhc-orange py-3 font-bold uppercase tracking-wide text-white transition hover:bg-orange-500 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Request"}
            </button>
          </form>
        {:else}
          <div class="py-10 text-center">
            <img class="mx-auto h-16 w-16" src={orangePegIcon} alt="" aria-hidden="true" />
            <h2 class="mt-4 text-xl font-bold uppercase text-gray-900">Got it!</h2>
            <p class="mt-2 text-sm text-gray-500">We'll be in touch shortly.</p>
            <button
              on:click={() => { emailSent = false; email = emptyEmail(); }}
              class="mt-6 border-2 border-gray-800 px-5 py-2 font-bold uppercase tracking-wide text-gray-800 transition hover:bg-gray-800 hover:text-white"
            >
              Send Another
            </button>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Services strip -->
  <section class="border-y border-gray-100 bg-gray-50 py-6">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-4 px-4 sm:grid-cols-4 sm:px-6">
      {#each services as service}
        <div class="flex items-center gap-3">
          <img class="h-8 w-8 shrink-0" src={service.icon} alt="" aria-hidden="true" />
          <span class="text-sm font-semibold text-gray-700">{service.name}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Photos -->
  <section class="py-16">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="flex items-end justify-between gap-4">
        <h2 class="text-3xl font-bold uppercase leading-none text-gray-900">Recent work</h2>
        <p class="max-w-xs text-right text-xs text-gray-500">Real jobs, real equipment — no stock photos.</p>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {#each photos as photo, i}
          <a
            href={photo.src}
            class={"group relative block border-4 border-white bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl " + photo.rotate + (i % 3 === 1 ? " sm:mt-6" : "")}
          >
            <img
              class="aspect-9/10 w-full object-cover"
              src={photo.src}
              alt="HVAC installation by Utah Quality Heating and Cooling"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Arches banner -->
  <section class="relative overflow-hidden">
    <img class="h-64 w-full object-cover md:h-80" src={arches} alt="Utah landscape near Arches National Park" loading="lazy" />
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
      <h2 class="text-2xl font-bold uppercase md:text-4xl">Proudly Utah, through and through</h2>
      <p class="mt-3 max-w-xl text-sm md:text-base">Family-run, locally owned, and helping neighbors stay comfortable in every season.</p>
    </div>
  </section>

  <!-- Service area -->
  <section class="border-t border-gray-100 bg-gray-50 py-14">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 class="text-2xl font-bold uppercase text-gray-900">Where we work</h2>
      <p class="mt-2 text-sm text-gray-500">Based in Ogden, serving the whole Wasatch Front.</p>
      <p class="mt-5 text-sm leading-loose text-gray-600 md:columns-3 md:gap-8">
        {#each cities as city, i}
          {city}{i < cities.length - 1 ? "," : ""}
        {/each}
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-footmaroon py-10 text-white">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div class="flex items-center gap-3">
          <img class="h-12 w-12" src={orangePegIcon} alt="Utah Quality Heating and Cooling penguin icon" />
          <div class="text-sm font-bold leading-tight">
            UTAH QUALITY HEATING & COOLING<br />
            <span class="font-normal text-gray-200">Reliable · Qualified · Dependable · Licensed · Insured</span>
          </div>
        </div>
        <a href="tel:+18016682612" class="text-lg font-bold text-white hover:text-uqhc-orange">
          (801) 668-2612
        </a>
      </div>
      <p class="mt-8 border-t border-white/20 pt-4 text-center text-xs text-gray-300">
        © 2023 Utah Quality Heating & Cooling. All rights reserved.
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
