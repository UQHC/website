<script lang="ts">
  import ImageViewer from "./ImageViewer.svelte";
  //TODO: Cleanup this large array of objects
  let images = [
    {
      id: 1,
      src: "assets/jpg/IMG_8759.jpg",
      srcset: "assets/photos/IMG_0163.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "50%",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "rotate-2",
    },
    {
      id: 2,
      src: "assets/jpg/IMG_8765.jpg",
      srcset: "assets/photos/IMG_7100.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "-rotate-2",
    },
    {
      id: 3,
      src: "assets/jpg/IMG_8803.jpg",
      srcset: "assets/photos/IMG_7755.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "rotate-2",
    },
    {
      id: 4,
      src: "assets/jpg/IMG_8809.jpg",
      srcset: "assets/photos/IMG_6531.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "-rotate-2",
    },
    {
      id: 5,
      srcset: "assets/photos/IMG_5140.jpg",
      src: "assets/jpg/IMG_8826.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "rotate-2",
    },
    {
      id: 6,
      srcset: "assets/photos/IMG_5140.jpg",
      src: "assets/jpg/IMG_9033.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "rotate-2",
    },
    // image to big
    // {
    //   id: 7,
    //   srcset: "assets/photos/IMG_5139.jpg",
    //   src: "assets/jpg/IMG_9179.jpg",
    //   alt: "",
    //   aspect: "[9/10]",
    //   width: "3744",
    //   height: "5616",
    //   sizes: "(min-width: 640px) 18rem, 11rem",
    //   rotate: "-rotate-2",
    // },
    {
      id: 8,
      srcset: "assets/photos/img_5139.jpg",
      src: "assets/jpg/IMG_9177.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "-rotate-2",
    },
    {
      id: 9,
      srcset: "assets/photos/img_5139.jpg",
      src: "assets/jpg/IMG_8834.jpg",
      alt: "",
      aspect: "[9/10]",
      width: "3744",
      height: "5616",
      sizes: "(min-width: 640px) 18rem, 11rem",
      rotate: "-rotate-2",
    },
  ];

  let showModal = false;
  let isScrolling = false;
  let currentImage: string | null = null;

  const openModal = (src: string | null) => {
    if (!isScrolling) {
      showModal = true;
      currentImage = src;
    }
  };

  const closeModal = () => {
    showModal = false;
    currentImage = null;
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
          class="relative md:aspect-{image.aspect} aspect-auto w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl"
        >
          <img
            on:click={() => openModal(image.src)}
            on:touchstart={() => openModal(image.src)}
            on:touchmove={handleTouchMove}
            alt={image.alt}
            width={image.width}
            height={image.height}
            decoding="async"
            sizes={image.sizes}
            src={image.src}
          />
        </div>
      {/each}
      {#if currentImage}
        <ImageViewer
          imgSrc={currentImage}
          show={showModal}
          close={closeModal}
        />
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
    /* width: 70%; /* adjust based on the number of images to show at a time, e.g. 100% for 1 image, 50% for 2, etc. */
    height: auto; /* responsive aspect ratio */
    max-width: 100%;
  }
</style>
