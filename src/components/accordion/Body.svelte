<script>
  export let id = null;
  export let html = () => "";
  export let isOpen = false;
</script>

<div
  id={`a${id}-collapseOne`}
  class="accordion-collapse {isOpen ? 'show' : 'collapse'}"
  aria-labelledby={`a${id}-headingOne`}
  data-bs-parent={`#a${id}-accordionExample`}
>
  <div class="accordion-body">
    {html()}
    <slot />
  </div>
</div>
