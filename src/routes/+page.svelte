<script lang="ts">
  import Card from "../components/Card/Card.svelte";
  const archesImg = "assets/arches.jpg";
  const automationIcon = "icons/icons8-automation.svg";
  const temperatureIcon = "icons/icons8-temperature.svg";
  const fanIcon = "icons/icons8-fan.svg";
  const toolsIcon = "icons/icons8-tools.svg";
  const gearsIcon = "icons/icons8-gears.svg";

  // TODO: Implement in a form
  const handleClick = async () => {
    // validate email values before sending it to the api
    const emailRequest = {
      personalizations: [
        {
          to: [{ email: "Utahqualityheatingcooling@gmail.com" }],
          subject: "Hello from React and SendGrid",
        },
      ],
      from: { email: "Utahqualityheatingcooling@gmail.com" },
      content: [
        {
          type: "text/plain",
          value: "This is a test email sent from a Svelte app using SendGrid!",
        },
      ],
    };
    // Add validations
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
  <div class="flex justify-center p-40">
    <p class="text-4xl text-white">Coming Soon......</p>
  </div>
  <div />
</div>
