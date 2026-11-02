<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Assets } from "../../utility/staticHelper";
  import type { Email, EmailRequest } from "../api/email/services/sendgrid/types";
  import { validateEmail } from "../../utility/validators";
  import { success, warning } from "../../utility/toast-theme";

  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { backgroundImg } = Assets.image;
  const { colorLogoLg, orangePegIcon } = Assets.icons;

  const services = [
    { name: "AC Repair & Install", icon: "icons/icons8-temperature.svg" },
    { name: "Furnace & Heating", icon: "icons/icons8-fan.svg" },
    { name: "Maintenance & Tune-Ups", icon: "icons/icons8-tools.svg" },
    { name: "Free Second Opinions", icon: "icons/icons8-gears.svg" }
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
    "mt-1 block w-full rounded border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-uqhc-orange focus:ring-uqhc-orange sm:text-sm";

  const switchVersion = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value) window.location.href = value;
  };
</script>

<div class="toast-container">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</div>

<div class="min-h-screen bg-black font-oswald text-white">
  <!-- Header -->
  <header class="border-b-4 border-uqhc-orange bg-black">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
      <a href="/v2" class="flex items-center gap-2">
        <img class="h-10 w-10" src={colorLogoLg} alt="Utah Quality Heating and Cooling logo" />
        <span class="hidden text-sm font-bold uppercase leading-tight tracking-wider sm:block">
          Utah Quality<br /><span class="text-uqhc-orange">Heating & Cooling</span>
        </span>
      </a>

      <div class="flex items-center gap-3">
        <select
          aria-label="Version"
          class="rounded border border-gray-700 bg-gray-900 px-2 py-1 text-xs text-gray-300 focus:outline-none"
          on:change={(event) => switchVersion(event)}
        >
          <option value="">v2 (new)</option>
          <option value="/">Back to v1</option>
        </select>
        <a
          href="tel:+18016682612"
          class="bg-uqhc-orange px-4 py-2 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-orange-400"
        >
          (801) 668-2612
        </a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative border-b border-gray-800">
    <img
      class="absolute inset-0 h-full w-full object-cover opacity-20"
      src={backgroundImg}
      alt=""
      aria-hidden="true"
    />
    <div class="relative mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,360px)] lg:py-20">
      <div class="self-center">
        <img class="h-28 w-28 md:h-36 md:w-36" src={colorLogoLg} alt="Utah Quality Heating and Cooling penguin logo" />
        <h1 class="mt-6 text-4xl font-bold uppercase leading-none md:text-6xl">
          Utah's HVAC pros.<br />
          <span class="text-uqhc-orange">Straight talk, fair prices.</span>
        </h1>
        <p class="mt-5 max-w-md text-lg leading-snug text-gray-300">
          Repairs, installs, and tune-ups along the Wasatch Front. We show up
          when we say we will — and quote you before we touch a thing.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href="tel:+18016682612"
            class="bg-uqhc-orange px-6 py-3 text-base font-bold uppercase tracking-wide text-black transition hover:bg-orange-400"
          >
            Call (801) 668-2612
          </a>
          <a
            href="#quote"
            class="border-2 border-gray-500 px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:border-uqhc-orange hover:text-uqhc-orange"
          >
            Free Quote
          </a>
        </div>
      </div>

      <!-- Quote form -->
      <div id="quote" class="scroll-mt-24 self-start border border-gray-700 bg-gray-950 p-6 sm:p-7">
        {#if !emailSent}
          <h2 class="text-xl font-bold uppercase">Get a free quote</h2>
          <p class="mt-1 text-sm text-gray-400">We respond within one business day.</p>
          <form class="mt-5" on:submit={sendEmail}>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="v2-first-name" class="text-sm font-medium text-gray-300">First name</label>
                <input type="text" id="v2-first-name" bind:value={email.firstName} autocomplete="given-name" class={inputClass} />
              </div>
              <div>
                <label for="v2-last-name" class="text-sm font-medium text-gray-300">Last name</label>
                <input type="text" id="v2-last-name" bind:value={email.lastName} autocomplete="family-name" class={inputClass} />
              </div>
            </div>
            <div class="mt-3">
              <label for="v2-email" class="text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="v2-email" bind:value={email.email} autocomplete="email" class={inputClass} />
            </div>
            <div class="mt-3">
              <label for="v2-phone" class="text-sm font-medium text-gray-300">Phone</label>
              <input type="tel" id="v2-phone" bind:value={email.phone} autocomplete="tel" class={inputClass} />
            </div>
            <div class="mt-3">
              <label for="v2-message" class="text-sm font-medium text-gray-300">What's going on?</label>
              <textarea id="v2-message" rows="3" bind:value={email.message} class={inputClass} />
            </div>
            <button
              type="submit"
              disabled={sending}
              class="mt-5 w-full bg-uqhc-orange py-3 font-bold uppercase tracking-wide text-black transition hover:bg-orange-400 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Request"}
            </button>
          </form>
        {:else}
          <div class="py-10 text-center">
            <img class="mx-auto h-16 w-16" src={orangePegIcon} alt="" aria-hidden="true" />
            <h2 class="mt-4 text-xl font-bold uppercase">Got it!</h2>
            <p class="mt-2 text-sm text-gray-400">We'll be in touch shortly.</p>
            <button
              on:click={() => { emailSent = false; email = emptyEmail(); }}
              class="mt-6 border-2 border-gray-500 px-5 py-2 font-bold uppercase tracking-wide transition hover:border-uqhc-orange hover:text-uqhc-orange"
            >
              Send Another
            </button>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Services strip -->
  <section class="border-b border-gray-800 bg-gray-950/60 py-6">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-4 px-4 sm:grid-cols-4 sm:px-6">
      {#each services as service}
        <div class="flex items-center gap-3">
          <img class="h-8 w-8 shrink-0" src={service.icon} alt="" aria-hidden="true" />
          <span class="text-sm font-medium text-gray-200">{service.name}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Photos -->
  <section class="py-16">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="flex items-end justify-between gap-4">
        <h2 class="text-3xl font-bold uppercase leading-none">
          Recent work
        </h2>
        <p class="max-w-xs text-right text-xs text-gray-500">
          Real jobs, real equipment — no stock photos.
        </p>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {#each photos as photo, i}
          <a
            href={photo.src}
            class={"group relative block border-4 border-white bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl " + photo.rotate + (i % 3 === 1 ? " sm:mt-6" : "")}
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

  <!-- Service area -->
  <section class="border-t border-gray-800 bg-gray-950/60 py-14">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 class="text-2xl font-bold uppercase">Where we work</h2>
      <p class="mt-2 text-sm text-gray-400">
        Based in Ogden, serving the whole Wasatch Front.
      </p>
      <p class="mt-5 text-sm leading-loose text-gray-300 md:columns-3 md:gap-8">
        {#each cities as city, i}
          {city}{i < cities.length - 1 ? "," : ""}
        {/each}
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t-4 border-uqhc-orange bg-footmaroon py-10">
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
