<script>
	import Login from "./Login.svelte";
	let message = "not received";

	function getTest() {
		fetch("./test")
			.then((d) => d.text())
			.then((d) => (message = d));
	}

	let isLogin = false;

	function loginBtn() {
		isLogin = true;
	}
	function close() {
		isLogin = false;
	}
</script>

<main>
	<h1>Home</h1>
	<h2>Server communication: {message}!</h2>
	<button on:click={getTest}>Test Button</button>

	<button class="btn" on:click={loginBtn}>Login</button>
	{#if isLogin}
		<Login on:closeIt={close}></Login>
	{/if}

	<h1>Game goes here?</h1>
</main>