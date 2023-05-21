import { c as create_ssr_component, b as add_attribute } from "../../chunks/index2.js";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "html{background-color:#f3f4f6}",
  map: null
};
const logo = "assets/_logo exports/white/svg/UQHC_Logo_Horizontal_White.svg";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="flex flex-col min-h-screen max-w-screen bg-gray-800"><div class="flex-grow"><nav class="bg-gray-800"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 items-center justify-between"><div class="flex items-center"><div class="flex-shrink-0"><img class="block h-12 w-auto lg:hidden"${add_attribute("src", logo, 0)} alt="Your Company">
              <img class="hidden h-12 w-auto lg:block"${add_attribute("src", logo, 0)} alt="Your Company"></div>
            <div class="hidden sm:ml-6 sm:block"></div></div>
          <div class="hidden sm:ml-6 sm:block"><div class="flex items-center"><div class="flex space-x-4">
                <a href="#" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>
                <a href="" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact</a>
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</a>
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">111-111-1111</a></div>
              
              <div>
                
                </div></div></div>
          <div class="-mr-2 flex sm:hidden">
            ${`<button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"><span class="sr-only">Open main menu</span>
                
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
                </button>`}
            ${``}</div></div></div>

      
      ${``}</nav>
    ${slots.default ? slots.default({}) : ``}</div>
  <footer class="bg-slate-800 text-white py-6"><div class="container mx-auto px-4 md:px-8"><div class="flex flex-wrap justify-between items-center"><div class="w-full md:w-auto mb-4 md:mb-0"><h2 class="font-bold text-xl mb-2">Utah Quality Heating &amp; Cooling</h2>
          <p>123 Main Street, Salt Lake City, UT 84101</p>
          <p>Phone: (123) 456-7890</p></div>
        <nav class="w-full md:w-auto"><ul class="flex flex-col md:flex-row md:space-x-4"><li><a href="#" class="hover:text-gray-300">Home</a></li>
            <li><a href="#" class="hover:text-gray-300">Services</a></li>
            <li><a href="#" class="hover:text-gray-300">About</a></li>
            <li><a href="#" class="hover:text-gray-300">Contact</a></li></ul></nav></div>
      <div class="mt-4 md:mt-0 text-center md:text-right"><p class="text-sm">© 2023 Utah Quality Heating &amp; Cooling. <br> All Rights Reserved.
        </p></div></div></footer>
</div>`;
});
export {
  Layout as default
};
