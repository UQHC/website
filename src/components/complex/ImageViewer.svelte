<script>
  export let imgSrc;
  export let show = false;
  export let close = () => {};
  console.log("img", imgSrc);
</script>

<div class={show ? "modal open " : "modal"} on:click={close}>
  {#if show}
    <img class="" src={imgSrc} alt="Modal content" />
  {/if}
</div>

<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal.open {
    display: block;
  }

  .modal img {
    margin: 15% auto;
    display: block;
    width: 50%;
  }
</style>
