<script lang="ts">
  import Card from "../components/simple/Card/Card.svelte";
  import { Assets } from "../utility/staticHelper";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import type {
    EmailRequest,
    Email,
  } from "./api/email/services/sendgrid/types";
  import { validateEmail } from "../utility/validators";
  import { success, warning } from "../utility/toast-theme";

  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { arches, area } = Assets.image;
  const { temperature, fan, tools, gears } = Assets.icons;

  let email: Email = {
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phone: "",
  };

  let emailSent = false;
  const initialEmail = { ...email };

  const sendEmail = async () => {
    const emailRequest: EmailRequest = {
      to: VITE_UQHC_EMAIL as string,
      subject: "New Client Information",
      dynamicTemplateData: email,
      from: {
        email: VITE_UQHC_EMAIL as string,
      },
      templateId: VITE_SENDGRID_TEMPLATE_ID as string,
    };

    const isValidated = validateEmail(email);

    if (isValidated) {
      try {
        const response = await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify({ emailRequest }),
          headers: {
            "content-type": "application/json",
          },
        });
        //TODO: show a toast that the request has been success
        if (response.ok) {
          success("Email sent successfully");
          emailSent = true;
          // TODO: Change the form to email sent with a button that says send again
        }
      } catch (err) {
        //TODO: show a toast that the request has been error
        warning("Error sending email");
        console.log(err);
      }
      //TODO: default don't send anything --- or missing field
    }
  };
</script>

<div class="min-h-screen bg-slate-700">
  <div class="relative">
    <div class="toast-container">
      <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
    </div>
    <img
      src={arches}
      class="w-full object-cover h-screen md:h-full"
      alt="Utah Arches Image"
    />
    <div
      class="absolute top-0 left-0 w-full h-full bg-slate-300 opacity-50 z-10"
    />
    <div class="absolute top-0 left-0 w-full h-full z-20">
      <!-- section -->
      <div class="p-4 md:p-24">
        <div class="w-full md:w-1/2 space-y-2">
          <h1 class="font-bold text-gray-900 text-4xl md:text-8xl">
            Utah Quality Heating & Cooling
          </h1>
          <p class="text-lg md:text-xl my-2">UQHC HVAC has you covered.</p>
          <ul class="font-bold text-lg md:text-xl">
            <li>- Reliable.</li>
            <li>- Qualified.</li>
            <li>- Dependable.</li>
            <li>- Licensed .</li>
            <li>- Insured.</li>
          </ul>
        </div>
        <div
          class="w-full md:w-1/2 md:mx-auto grid justify-center pt-12 md:pt-40"
        >
          <h1
            class="text-center font-bold text-gray-900 text-3xl md:text-5xl pb-10"
          >
            Repair & Installation
          </h1>
          <div
            class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:flex items-center justify-center"
          >
            <Card text={"Ventalation"} icon={fan} />
            <Card text={"Expert Installion"} icon={gears} />
            <Card text={"Inspection & Repairs"} icon={tools} />
            <Card text={"Temperature Control"} icon={temperature} />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="contact-section"
    class="bg-white md:min-h-screen flex flex-col md:flex-row"
  >
    <div
      class="w-full md:w-1/2 px-4 py-8 md:py-16 flex flex-col justify-center items-center"
    >
      <div class="mb-5 text-center">
        <h1 class="text-2xl font-bold mb-">Contact Us</h1>
        <p class="text-gray-500 mb-6 text-center">
          We are ready to work for you
        </p>
      </div>
      {#if !emailSent}
        <form class="max-w-md mx-auto">
          <div class="mb-4 flex">
            <div class="w-1/2 mr-2">
              <label
                for="first-name"
                class=" block text-sm font-medium text-gray-700"
                >First Name</label
              >
              <input
                type="text"
                id="first-name"
                bind:value={email.firstName}
                name="first-name"
                class="focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
              />
            </div>
            <div class="w-1/2 ml-2">
              <label
                for="last-name"
                class="block text-sm font-medium text-gray-700">Last Name</label
              >
              <input
                type="text"
                bind:value={email.lastName}
                id="last-name"
                name="last-name"
                class="focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              bind:value={email.email}
              id="email"
              name="email"
              class="focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <input
              type="tel"
              bind:value={email.phone}
              id="phone"
              name="phone"
              class="focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <textarea
              id="message"
              bind:value={email.message}
              name="message"
              rows="4"
              class="focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
            />
          </div>
          <div class="mb-4">
            <button
              on:click={() => sendEmail()}
              type="submit"
              class="w-full flex justify-center py-2 px-4 bg-gray-700 hover:bg-orange-400 focus:ring-orange-500 focus:ring-offset-orange-200 text-white text-sm font-medium shadow-sm rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-orange-200"
              >Submit</button
            >
          </div>
        </form>
      {:else}
        <button
          on:click={() => {
            emailSent = false;
            email = initialEmail;
          }}
          class="grid justify-center py-2 px-4 bg-gray-700 hover:bg-orange-400 focus:ring-orange-500 focus:ring-offset-orange-200 text-white text-sm font-medium shadow-sm rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-orange-200"
          >Send Again</button
        >
      {/if}
    </div>

    <div
      class="w-full md:w-1/2 bg-cover bg-center"
      style="background-image: url({area});"
    />
  </div>
  <div />
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
