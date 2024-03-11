<script>
	let number = 0;

	function getTest() {
		fetch("./test")
			.then(d => d.text())
			.then(d => (number = d));
	}
</script>

<h1> Message is: {number}!</h1>
<button on:click={getTest}>Test Button</button>