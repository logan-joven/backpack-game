<script>
	import Login from "./Login.svelte";
	import Board from "./Board.svelte";
	import CreateAccount from "./CreateAccount.svelte";
	
	let message = "not received";

	/* function to test connection to back-end, can be modified */
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

<nav>
	<button class="btn" on:click={loginBtn}>Login</button>
	{#if isLogin}
		<Login on:closeIt={close}></Login>
	{/if}
</nav>

<main>
	<h1>Backpack Game</h1>
	<!-- <h2>Server communication: {message}!</h2> -->
	<!-- <button on:click={getTest}>Test Button</button> -->

	<Board />
</main>
