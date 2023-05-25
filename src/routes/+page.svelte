<script lang="ts">
  import Card from "../components/Card/Card.svelte";
  const archesImg = "assets/arches.jpg";
  const area = "assets/selectedAreas.jpg";
  const imagePath = `${area}`;
  const automationIcon = "icons/icons8-automation.svg";
  const temperatureIcon = "icons/icons8-temperature.svg";
  const fanIcon = "icons/icons8-fan.svg";
  const toolsIcon = "icons/icons8-tools.svg";
  const gearsIcon = "icons/icons8-gears.svg";

  let email = {
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phone: "",
  };

  // TODO: Implement in a form
  const sendEmail = async () => {
    // validate email values before sending it to the api
    const emailRequest = {
      to: "gracias.claude@gmail.com",
      subject: "New Client Information",
      dynamicTemplateData: email,
      from: { email: "Utahqualityheatingcooling@gmail.com" },
      templateId: "d-5a768942a9f441aa87c502a9f81a1e7a",
    };
    // Add validations
    // "Utahqualityheatingcooling@gmail.com"
    const response = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ emailRequest }),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("response", await response.json());
  };
</script>

<div class="min-h-screen bg-slate-700">
  <div class="relative">
    <img
      src={archesImg}
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
            <Card text={"Ventalation"} icon={fanIcon} />
            <Card text={"Expert Installion"} icon={gearsIcon} />
            <Card text={"Inspection & Repairs"} icon={toolsIcon} />
            <Card text={"Temperature Control"} icon={temperatureIcon} />
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
      <form class="max-w-md mx-auto">
        <div class="mb-4 flex">
          <div class="w-1/2 mr-2">
            <label
              for="first-name"
              class=" block text-sm font-medium text-gray-700">First Name</label
            >
            <input
              type="text"
              id="first-name"
              bind:value={email.firstName}
              name="first-name"
              class="outline-blue-500 focus:outline-none focus:ring focus:ring-orange-300 mt-1 p-2 focus:border-0 border-gray-100 form-outline block w-full shadow-sm sm:text-sm border-2 rounded-md"
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
              class="border-2 border-gray-100 mt-1 p-2 form-outline block w-full shadow-sm sm:text-sm rounded-md focus:ring-orange-500 focus:border-orange-500"
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
            class="border-2 border-gray-100 mt-1 p-2 form-outline block w-full shadow-sm sm:text-sm rounded-md focus:ring-orange-500 focus:border-orange-500"
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
            class="border-2 border-gray-100 mt-1 p-2 form-outline block w-full shadow-sm sm:text-sm rounded-md focus:ring-orange-500 focus:border-orange-500"
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
            class="border-2 border-gray-100 mt-1 p-2 form-outline block w-full shadow-sm sm:text-sm rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div class="mb-4">
          <button
            on:click={() => sendEmail()}
            type="submit"
            class="w-full flex justify-center py-2 px-4 bg-gray-700 hover:bg-orange-600 focus:ring-orange-500 focus:ring-offset-orange-200 text-white text-sm font-medium shadow-sm rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-orange-200"
            >Submit</button
          >
        </div>
      </form>
    </div>

    <div
      class="w-full md:w-1/2 bg-cover bg-center"
      style="background-image: url({imagePath});"
    />
  </div>
  <div />
</div>
