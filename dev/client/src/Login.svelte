<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("closeIt");
    }
    function login() {
        dispatch("closeIt");
    }
</script>

<div class="background" transition:fade on:keypress={close} />
<div class="login-box" transition:fly={{ y: -500 }}>
    <form action="">

        <label for="username">Username:</label>
        <input type="text" placeholder="Enter Username" name="username">

        <label for="password">Password:</label>
        <input type="password" placeholder="Enter Password" name="password">

        <!-- TODO: make the login button work -->
        <button type="login" on:click={login}>Login</button>
        <button type="close" on:click={close}>Close</button>
    </form>
</div>

<style>
    /* format the background when login is clicked */
    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }

    /* format the login box */
    .login-box {
        position: fixed;
        margin: 20vh auto;
        height: auto;
        width: 400px;
        color: white;
        padding: 15px;
        background-color: rgb(148, 148, 148);
        border: solid 5px white;
        z-index: 5;
    }

    /* format the text */
    .login-box input[type="text"],
    .login-box input[type="password"] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;
    }
</style>
