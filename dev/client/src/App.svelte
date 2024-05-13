<script>
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Board from "./Board.svelte";

    let message = "not received";
    let showLogin = false; // Track whether the Login component should be shown
    let showRegister = false; // Track whether the Register component should be shown

    /* function to test connection to back-end, can be modified */
    function getTest() {
        fetch("./test")
            .then((d) => d.text())
            .then((d) => (message = d));
    }

    // Function to toggle showLogin when the Enter key is pressed
    function toggleLogin() {
        showLogin = true;
    }

    function toggleRegister() {
        showRegister = true;
    }
</script>

<main>
    <!-- <header class="header">
        <nav>
            <ul class="button-container">
                <li>
                    <button class="button" on:click={toggleLogin} on:keydown={(e) => e.key === "Enter" && toggleLogin()} tabindex="0">Login</button>
                </li>
                <li>
                    <button class="button" on:click={toggleRegister} on:keydown={(e) => e.key === "Enter" && toggleRegister()} tabindex="0">Register</button>
                </li>
            </ul>
        </nav>
        {#if showLogin}
            <Login />
        {/if}
        {#if showRegister}
            <Register />
        {/if}
    </header> -->
	<header class="title">
		Backpack Game
	</header>
    <Board />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

	.title {
        font-size: 36px;
    }

    /* .header {
		background-color: black;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .button-container {
        list-style: none;
        margin: 10;
        padding: 10;
        display: flex;
    }

    .button-container li {
        margin: 5px;
    }

	.button {
		width: 120px;
        height: 40px;
	} */
</style>
