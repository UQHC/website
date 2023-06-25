<script>
  export let icon;
  export let text;
</script>

<div
  class="flex flex-col md:pt-20 md:pb-16 md:flex-row md:h-32 md:w-32 max-w-xs md:max-w-sm h-32 w-24 items-center justify-center p-4 md:p-12 bg-white rounded-xl shadow-md"
>
  <div class="flex flex-col items-center space-y-4">
    <img class="h-8 w-8 md:h-16 md:w-16" src={icon} alt="icon" />
    <p class="text-center md:text-left text-sm md:text-base">{text}</p>
  </div>
</div>
