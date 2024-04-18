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

<!-- <nav>
	<button class="btn" on:click={loginBtn}>Login</button>
	{#if isLogin}
		<Login on:closeIt={close}></Login>
	{/if}
</nav> -->

<main class="container">
	<h1 class="content">Backpack Game</h1>
	<!-- <h2>Server communication: {message}!</h2> -->
	<!-- <button on:click={getTest}>Test Button</button> -->

	<Board />
</main>

<style>
    /* Apply background color */
	

    /* Center content */
    .container {
		background-color: #f0f0f0; /* Light gray */
        margin: 0; /* Remove default margin */
        padding: 0; /* Remove default padding */
        font-family: Arial, sans-serif; /* Optional: Set a font */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh; /* Make sure the container takes the full height of the viewport */
    }

    .content {
        max-width: 800px; /* Optional: Set max width for content */
        padding: 20px; /* Optional: Add padding around content */
        background-color: #ffffff; /* Optional: Set background color for content */
        border-radius: 10px; /* Optional: Add border radius for a rounded look */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add box shadow for depth */
    }
</style>