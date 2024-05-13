<script>
    import { sql } from "@vercel/postgres"
    import { fly, fade } from "svelte/transition";

    function close() {}
    function register() {}
</script>

<div class="background" transition:fade on:keypress={close} />
<div class="register-container">
    <div class="register-box" transition:fly={{ y: -500 }}>
        <form action="">
            <label for="username">New Username:</label>
            <input type="text" placeholder="Enter Username" name="username" />

            <label for="password">New Password:</label>
            <input type="password" placeholder="New Password" name="password" />

            <!-- TODO: make the buttons work -->
            <button type="Register" on:click={register}>Register</button>
            <button type="close" on:click={close}>Close</button>
        </form>
    </div>
</div>

<style>
    /* format the background when register is clicked */
    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }

    /* Container to center the register box */
    .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 3;
    }

    /* format the register box */
    .register-box {
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
    .register-box input[type="text"],
    .register-box input[type="password"] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;
    }
</style>
