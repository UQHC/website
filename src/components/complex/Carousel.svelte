<script lang="ts">
  import ImageViewer from "./ImageViewer.svelte";

  interface CarouselImage {
    id: number;
    src: string;
    alt: string;
    rotate: "rotate-2" | "-rotate-2";
  }

  const webp = "assets/jpg/";
  // Each image shares size/aspect props; only src and rotation vary.
  const images: CarouselImage[] = [
    { id: 1, src: `${webp}IMG_8759.webp`, alt: "", rotate: "rotate-2" },
    { id: 2, src: `${webp}IMG_8765.webp`, alt: "", rotate: "-rotate-2" },
    { id: 3, src: `${webp}IMG_8803.webp`, alt: "", rotate: "rotate-2" },
    { id: 4, src: `${webp}IMG_8809.webp`, alt: "", rotate: "-rotate-2" },
    { id: 5, src: `${webp}IMG_8826.webp`, alt: "", rotate: "rotate-2" },
    { id: 6, src: `${webp}IMG_9033.webp`, alt: "", rotate: "rotate-2" },
    { id: 7, src: `${webp}IMG_9177.webp`, alt: "", rotate: "-rotate-2" },
    { id: 8, src: `${webp}IMG_8834.webp`, alt: "", rotate: "-rotate-2" },
  ];

  let showModal = false;
  let isScrolling = false;
  let currentImage: string | null = null;

  const openModal = (src: string) => {
    if (!isScrolling) {
      showModal = true;
      currentImage = src;
    }
  };

  const closeModal = () => {
    showModal = false;
    currentImage = null;
  };

  const handleTouchStart = () => {
    isScrolling = false;
  };

  const handleTouchMove = () => {
    isScrolling = true;
  };
</script>

<div class="sm:mt-12 mt-6">
  <div class="carousel-container">
    <div class="carousel-image sm:w-3/4 image-container">
      {#each images as image (image.id)}
        <div
          class="relative md:aspect-[9/10] aspect-auto w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl"
        >
          <img
            on:click={() => openModal(image.src)}
            on:touchstart={handleTouchStart}
            on:touchmove={handleTouchMove}
            alt={image.alt}
            width={288}
            loading="lazy"
            decoding="async"
            src={image.src}
            class="object-cover {image.rotate}"
          />
        </div>
      {/each}
      {#if currentImage}
        <ImageViewer imgSrc={currentImage} show={showModal} close={closeModal} />
      {/if}
    </div>
  </div>
</div>

<style>
  /* TODO: move all below to tailwindcss */
  .image-container {
    display: flex;
    gap: 20px;
    padding: 4px;
    overflow-x: scroll;
  }
  .carousel-container {
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: hidden; /* prevent scrolling outside of the carousel */
    width: 100%;
    max-width: 100%; /* ensure container does not exceed screen width */
  }
  .carousel-image {
    flex: 0 0 auto;
    height: auto; /* responsive aspect ratio */
    max-width: 100%;
  }
</style>
