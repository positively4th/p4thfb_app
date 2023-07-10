<script>

 export let id = null;
 export let html = () => '';

 
</script>

<div class="accordion" id={ `a${ id }-accordionExample` }>
    { html() }
    <slot />
</div>
