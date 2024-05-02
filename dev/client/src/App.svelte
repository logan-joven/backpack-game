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
	<a href="#">Left Link</a>
	<a href="#">Right Link</a>
</nav> -->

<main class="container">
	<h1 class="content">Backpack Game</h1>
	<Board />
</main>

<style>
    .container {
		background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .content {
        max-width: 800px;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>