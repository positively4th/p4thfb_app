<script>

 export let id;
 export let html = () => '';
 
</script>

<h2 class="accordion-header" id={ `a${ id }-headingOne` }>
    <button class="accordion-button"
	    type="button"
	    data-bs-toggle="collapse"
	    data-bs-target={ `#a${ id }-collapseOne` }
	    aria-expanded="true"
	    aria-controls={ `a${ id }-collapseOne` }
    >
	<slot>
	</slot>
	{ html() }
    </button>
</h2>
