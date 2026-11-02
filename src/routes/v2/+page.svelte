<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Carousel from "../../components/complex/Carousel.svelte";
  import { Assets } from "../../utility/staticHelper";
  import type { Email, EmailRequest } from "../api/email/services/sendgrid/types";
  import { validateEmail } from "../../utility/validators";
  import { success, warning } from "../../utility/toast-theme";

  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { backgroundImg } = Assets.image;
  const { colorLogoLg, orangePegIcon } = Assets.icons;

  const features = [
    {
      title: "Licensed & Insured",
      desc: "Certified technicians you can trust inside your home.",
      icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    },
    {
      title: "Same-Day Service",
      desc: "Fast response across the Wasatch Front, seven days a week.",
      icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    },
    {
      title: "Upfront Pricing",
      desc: "Transparent written quotes. No surprise fees, ever.",
      icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.107.879 4.242 0 1.141-.906 1.142-2.375 0-3.281-.85-.67-2.19-.737-3.02 0-.805.692-1.148 1.735-.879 2.617.27 1.282.162 2.657-.515 3.693a4.5 4.5 0 0 1-4.365 2.25m3.35-9.514c1.145-.056 2.304-.305 3.4-.779.574-.247 1.157-.491 1.749-.734M12 21.75a9 9 0 0 0 9-9c0-1.097-.196-2.151-.555-3.13"
    }
  ];

  const stats = [
    { value: "20+", label: "Years serving Utah" },
    { value: "28", label: "Cities covered" },
    { value: "24/7", label: "Emergency service" }
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
    "mt-1.5 block w-full rounded-lg border-0 bg-gray-800/80 px-3 py-2.5 text-white placeholder-gray-500 ring-1 ring-inset ring-gray-700 transition focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm";

  const navLinks = [
    { href: "#features", label: "Services" },
    { href: "#areas", label: "Service Area" },
    { href: "#quote", label: "Get a Quote" }
  ];

  const switchVersion = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value) window.location.href = value;
  };
</script>

<div class="toast-container">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
</div>

<div class="min-h-screen bg-gray-950 font-oswald text-white">
  <!-- Header -->
  <header class="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-gray-950/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a href="/v2" class="flex items-center gap-3">
        <img class="h-10 w-10" src={colorLogoLg} alt="Utah Quality Heating and Cooling logo" />
        <span class="text-sm font-bold uppercase tracking-widest text-white">
          Utah Quality <span class="text-cyan-300">HVAC</span>
        </span>
      </a>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Main">
        {#each navLinks as link}
          <a href={link.href} class="text-sm font-medium text-gray-300 transition hover:text-cyan-300">
            {link.label}
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-4">
        <select
          aria-label="Version"
          class="rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring focus:ring-cyan-300"
          on:change={(event) => switchVersion(event)}
        >
          <option value="">v2 (new)</option>
          <option value="/">Back to v1</option>
        </select>
        <a
          href="tel:+18016682612"
          class="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-400"
        >
          (801) 668-2612
        </a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative overflow-hidden pt-16">
    <img
      class="absolute inset-0 h-full w-full object-cover opacity-15"
      src={backgroundImg}
      alt=""
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950"></div>

    <div class="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
            <span class="h-1.5 w-1.5 rounded-full bg-cyan-300"></span>
            Utah's trusted HVAC experts
          </p>
          <h1 class="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Comfort you can count on,
            <span class="text-cyan-300">season after season.</span>
          </h1>
          <p class="mt-5 max-w-lg text-lg leading-relaxed text-gray-300">
            Heating and cooling services for homes across the Wasatch Front.
            Honest quotes, licensed technicians, same-day availability.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="tel:+18016682612"
              class="rounded-lg bg-cyan-500 px-6 py-3 text-lg font-semibold text-gray-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400"
            >
              (801) 668-2612
            </a>
            <a
              href="#quote"
              class="rounded-lg border border-gray-600 px-6 py-3 text-lg font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
            >
              Get a Quote
            </a>
          </div>

          <dl class="mt-12 grid grid-cols-3 place-items-center gap-6 border-t border-white/10 pt-8 text-center">
            {#each stats as stat}
              <div>
                <dt class="order-2 text-xs font-medium uppercase tracking-wider text-gray-400">{stat.label}</dt>
                <dd class="order-1 text-3xl font-bold text-white">{stat.value}</dd>
              </div>
            {/each}
          </dl>
        </div>

        <!-- Quote form card -->
        <div
          id="quote"
          class="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur"
        >
          {#if !emailSent}
            <h2 class="text-xl font-bold text-white">Request a free quote</h2>
            <p class="mt-1 text-sm text-gray-400">We'll get back to you within one business day.</p>
            <form class="mt-6" on:submit={sendEmail}>
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
                <label for="v2-message" class="text-sm font-medium text-gray-300">How can we help?</label>
                <textarea id="v2-message" rows="3" bind:value={email.message} class={inputClass} />
              </div>
              <button
                type="submit"
                disabled={sending}
                class="mt-6 w-full rounded-lg bg-cyan-500 py-3 font-semibold text-gray-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? "Sending…" : "Request Quote"}
              </button>
            </form>
          {:else}
            <div class="py-12 text-center">
              <svg class="mx-auto h-14 w-14 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h2 class="mt-4 text-xl font-bold text-white">Request received!</h2>
              <p class="mt-2 text-gray-400">We'll be in touch shortly.</p>
              <button
                on:click={() => { emailSent = false; email = emptyEmail(); }}
                class="mt-6 rounded-lg border border-gray-600 px-5 py-2.5 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Send Another
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" class="scroll-mt-20 py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-center text-2xl font-bold text-white sm:text-3xl">
        Why homeowners choose us
      </h2>
      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        {#each features as feature}
          <div class="group rounded-2xl border border-white/10 bg-gray-900/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-gray-900">
            <div class="inline-flex rounded-xl bg-cyan-500/10 p-3 ring-1 ring-inset ring-cyan-400/20">
              <svg class="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d={feature.icon} />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-400">{feature.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Service area -->
  <section id="areas" class="scroll-mt-20 bg-gray-900/40 py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white sm:text-3xl">Serving the Wasatch Front</h2>
        <p class="mx-auto mt-3 max-w-xl text-gray-400">
          From Ogden to Draper, our trucks are in your neighborhood daily.
        </p>
      </div>
      <ul class="mt-10 flex flex-wrap justify-center gap-2">
        {#each cities as city}
          <li class="rounded-full border border-white/10 bg-gray-900 px-3.5 py-1.5 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-white">
            {city}
          </li>
        {/each}
      </ul>
      <div class="mt-14">
        <Carousel />
      </div>
    </div>
  </section>

  <!-- CTA band -->
  <section class="border-t border-white/10 py-16">
    <div class="mx-auto max-w-6xl px-6">
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600/20 to-orange-500/10 px-8 py-12 text-center ring-1 ring-inset ring-cyan-400/20">
        <img class="absolute -right-6 -top-6 h-24 w-24 opacity-20" src={orangePegIcon} alt="" aria-hidden="true" />
        <h2 class="text-2xl font-bold text-white sm:text-3xl">Ready when you are</h2>
        <p class="mx-auto mt-3 max-w-md text-gray-300">
          Call now or request a quote online — same-day appointments often available.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+18016682612"
            class="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-gray-950 transition hover:bg-cyan-400"
          >
            Call (801) 668-2612
          </a>
          <a href="#quote" class="rounded-lg border border-gray-500 px-6 py-3 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300">
            Request a Quote
          </a>
        </div>
      </div>
      <p class="mt-14 text-center text-sm font-light uppercase tracking-[0.3em] text-gray-500">
        Reliable · Qualified · Dependable · Licensed · Insured
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 bg-gray-900/80 py-12">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img class="h-12 w-12" src={colorLogoLg} alt="Utah Quality Heating and Cooling logo" />
          <p class="mt-4 text-sm text-gray-400">
            Professional heating & cooling services across the Wasatch Front.
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-400">
            <li><a href="tel:+18016682612" class="transition hover:text-cyan-300">(801) 668-2612</a></li>
            <li><a href="mailto:utahqualityheatingcooling@gmail.com" class="transition hover:text-cyan-300">utahqualityheatingcooling@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300">Hours</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-400">
            <li>Mon–Fri: 7am–7pm</li>
            <li>Sat: 8am–5pm</li>
            <li>Sun: By appointment</li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300">Connect</h3>
          <nav class="mt-4 flex gap-4" aria-label="Social">
            <a href="#" class="text-gray-400 transition hover:text-cyan-300" aria-label="Facebook">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
            </a>
            <a href="#" class="text-gray-400 transition hover:text-cyan-300" aria-label="Instagram">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="#" class="text-gray-400 transition hover:text-cyan-300" aria-label="Twitter">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.348-2.39 0-4.765-.71-6.843-1.96 4.072 2.628 8.864 4.192 13.86 4.192 14.757 0 22.911-12.067 21.267-22.596z"/></svg>
            </a>
          </nav>
        </div>
      </div>
      <div class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © 2023 Utah Quality Heating & Cooling. All rights reserved.
      </div>
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
