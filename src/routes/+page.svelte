<script lang="ts">
  //  import Card from "../components/simple/Card/Card.svelte";
  import Carousel from "../components/complex/Carousel.svelte";
  import { Assets } from "../utility/staticHelper";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import type {
    EmailRequest,
    Email,
  } from "./api/email/services/sendgrid/types";
  import { validateEmail } from "../utility/validators";
  import { success, warning } from "../utility/toast-theme";
  const { VITE_UQHC_EMAIL, VITE_SENDGRID_TEMPLATE_ID } = import.meta.env;
  const { backgroundImg } = Assets.image;
  // TODO: Re-add these with the card component
  const { temperature, fan, tools, gears, colorLogoLg } = Assets.icons;

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

<div class="md:p-24 pt-12 pb-12 text-white">
  <div class="toast-container">
    <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  </div>
  <div>
    <div class="md:grid md:grid-cols-2">
      <div class="grid justify-center">
        <div class="flex">
          <img
            class="h-24 w-24 md:h-60 md:w-60"
            src={colorLogoLg}
            alt="utah quality penguin logo"
          />
          <div
            class="flex md:items-center font-oswald relative bottom-6 right-3 md:right-16"
          >
            <h1 class="md:text-5xl pt-12 text-2xl leading-normal">
              <span class="font-bold">UTAH QUALITY </span> <br /> HEATING & COOLING
            </h1>
          </div>
        </div>
        <div class="md:pt-6 md:pt-2 md:space-y-2">
          <h1 class="font-bold md:text-4xl text-lg text-cyan-300">
            We've got you covered.
          </h1>
          <p class="text-sm">
            Contact us today for your cooling and heating needs.
          </p>
          <p class="md:text-2xl font-bold pt-2 text-lg text-orange-500">
            (801)-668-2612
          </p>
        </div>
      </div>
      <div class="pt-6">
        <div class="text-center h-fit">
          <div class="border-b border-white block sm:hidden m-8" />
          <h1
            class="md:text-2xl text-lg text-center font-bold pb-4 text-cyan-300"
          >
            REQUEST A QUOTE/ LET'S TALK
          </h1>
        </div>
        {#if !emailSent}
          <form class="max-w-xs mx-auto text-black">
            <div class="mb-4 flex">
              <div class="w-1/2 mr-2">
                <label
                  for="first-name"
                  class=" block text-sm font-medium text-white"
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
                  class="block text-sm font-medium text-white">Last Name</label
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
              <label for="email" class="block text-sm font-medium text-white"
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
              <label for="phone" class="block text-sm font-medium text-white"
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
              <label for="message" class="block text-sm font-medium text-white"
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
                class="w-full flex justify-center py-2 px-4 bg-cyan-500 hover:bg-orange-400 focus:ring-orange-500 focus:ring-offset-orange-200 text-white text-sm font-medium shadow-sm rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-orange-200"
                >Submit</button
              >
            </div>
          </form>
        {:else}
          <div class="pt-6 flex justify-center h-fit">
            <button
              on:click={() => {
                emailSent = false;
                email = initialEmail;
              }}
              class="py-2 px-4 bg-gray-700 hover:bg-orange-400 focus:ring-orange-500 text-white text-sm font-medium shadow-sm rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-orange-200"
              >Send Again</button
            >
          </div>
        {/if}
      </div>
      <div />
    </div>
  </div>
</div>

<div class="relative h-screen location flex flex-col text-center items-center">
  <div class=" w-screen absolute">
    <div class=" md:p-20 p-10">
      <h1 class="md:text-4xl text-2xl font-medium">
        SERVING THE WASATCH FRONT REGION
      </h1>
      <div class="flex flex-wrap">
        <p class="top-0 pt-6 city font-thin md:text-xl text-base">
          Bountiful | Centerville | Clearfield | Clinton | Cottonwood Heights |
          Draper | Farmington | Fruit Heights | Hill AFB | Holiday | Kaysville |
          Layton | Midvale | Millcreek | Murray | North Salt Lake | Ogden |
          Riverdale | Riverton | Roy | Salt Lake City | Sandy | South Jordan |
          South Weber | Sunset | Syracuse | The Avenues | West Jordan | Woods
          Cross
        </p>
      </div>
      <Carousel />
      <div class="bottom-0">
        <h1 class="md:text-4xl text-xl font-thin pt-6">
          RELIABLE. QUALIFIED. DEPENDABLE. LICENSED. INSURED.
        </h1>
        <div class="flex justify-center md:pt-8 pt-6 md:space-x-8 space-x-4">
          <img class="" src={temperature} />
          <img class="" src={fan} />
          <img src={tools} />
          <img src={gears} />
        </div>
      </div>
    </div>
  </div>
  <img
    class="w-full h-full"
    src={backgroundImg}
    alt="Utah Quality Heating and Cooling"
  />
</div>

<style>
  @media (min-width: 345px) {
    .location {
      height: 850px;
    }
  }
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 5px;
    --toastContainerBottom: 20px;
    --toastContainerLeft: auto;
    --toastContainerPosition: fixed;
  }
  .city {
    text-wrap: balance;
  }
</style>
