import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component } from "../../chunks/index2.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { text } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<div class="flex flex-col md:pt-20 md:pb-16 md:flex-row md:h-32 md:w-32 max-w-xs md:max-w-sm h-32 w-24 items-center justify-center p-4 md:p-12 bg-white rounded-xl shadow-md"><div class="flex flex-col items-center space-y-4"><img class="h-8 w-8 md:h-16 md:w-16"${add_attribute("src", icon, 0)} alt="icon">
    <p class="text-center md:text-left text-sm md:text-base">${escape(text)}</p></div></div>`;
});
const archesImg = "assets/arches.jpg";
const temperatureIcon = "icons/icons8-temperature.svg";
const fanIcon = "icons/icons8-fan.svg";
const toolsIcon = "icons/icons8-tools.svg";
const gearsIcon = "icons/icons8-gears.svg";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-slate-700"><div class="relative"><img${add_attribute("src", archesImg, 0)} class="w-full object-cover h-screen md:h-full" alt="Utah Arches Image">
    <div class="absolute top-0 left-0 w-full h-full bg-slate-300 opacity-50 z-10"></div>
    <div class="absolute top-0 left-0 w-full h-full z-20"><button>Button!!</button>
      
      <div class="p-4 md:p-24"><div class="w-full md:w-1/2 space-y-2"><h1 class="font-bold text-gray-900 text-4xl md:text-8xl">Utah Quality Heating &amp; Cooling
          </h1>
          <p class="text-lg md:text-xl my-2">UQHC HVAC has you covered.</p>
          <ul class="font-bold text-lg md:text-xl"><li>- Reliable.</li>
            <li>- Qualified.</li>
            <li>- Dependable.</li>
            <li>- Licensed .</li>
            <li>- Insured.</li></ul></div>
        <div class="w-full md:w-1/2 md:mx-auto grid justify-center pt-12 md:pt-40"><h1 class="text-center font-bold text-gray-900 text-3xl md:text-5xl pb-10">Repair &amp; Installation
          </h1>
          <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:flex items-center justify-center">${validate_component(Card, "Card").$$render($$result, { text: "Ventalation", icon: fanIcon }, {}, {})}
            ${validate_component(Card, "Card").$$render(
    $$result,
    {
      text: "Expert Installion",
      icon: gearsIcon
    },
    {},
    {}
  )}
            ${validate_component(Card, "Card").$$render(
    $$result,
    {
      text: "Inspection & Repairs",
      icon: toolsIcon
    },
    {},
    {}
  )}
            ${validate_component(Card, "Card").$$render(
    $$result,
    {
      text: "Temperature Control",
      icon: temperatureIcon
    },
    {},
    {}
  )}</div></div></div></div></div>
  <div class="flex justify-center p-40"><p class="text-4xl text-white">Coming Soon......</p></div>
  <div></div></div>`;
});
export {
  Page as default
};
