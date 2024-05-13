<script>
    // Default difficulty
    let difficulty = 1;
    let numItems = 5;
    let maxWeight = 10;
    let maxValue = 100;
    let ceiling = 5;

    let startTime; // Variable to store the start time of the timer
    let timerInterval; // Variable to store the setInterval function

    // Initialize empty selection
    let selectedItems = [];
    let selectedWeightsSum = 0;
    let selectedValuesSum = 0;

    // UI variables
    let checkGuessResult = null;
    let showSolution = false;
    let showDifficultyPopup = false;
    let score = 0;

    /* Function to start the timer */
    function startTimer() {
        startTime = Date.now(); // Record the current time
        updateTimerDisplay(); // Update the timer display immediately
        // Update the timer display every second
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }

    /* Function to update the timer display */
    function updateTimerDisplay() {
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time in milliseconds
        const formattedTime = formatTime(elapsedTime); // Format elapsed time
        // Display formatted time in the timer element
        document.getElementById("timer").innerText = formattedTime;
    }

    /* Function to format elapsed time */
    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        // Return formatted time as HH:MM:SS
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    /* Helper function to pad zero for single-digit numbers */
    function padZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    function setDifficulty(difficulty) {
        if (difficulty == 1) {
            numItems = 5;
            maxWeight = 10;
            maxValue = 100;
            ceiling = 5;
        } else if (difficulty == 2) {
            numItems = 10;
            maxWeight = 50;
            maxValue = 200;
            ceiling = 25;
        }
        // Reset the game with the new parameters
        newGame();
    }

    /* Function to create a new game */
    function newGame() {
        startTimer();
        // Generate a new random backpack
        backpack = RandomBackpack(numItems, ceiling, maxValue);

        // Reset selectedItems, selectedWeightsSum, and selectedValuesSum
        selectedItems = [];
        selectedWeightsSum = 0;
        selectedValuesSum = 0;

        // Recalculate the solution
        const weights = backpack.map((item) => item[0]);
        const values = backpack.map((item) => item[1]);
        solution = knapsackSolution(weights, values, maxWeight);

        // Clear checkGuessResult
        checkGuessResult = null;

        // Set showSolution to false
        showSolution = false;

        // Close the pop-up
        showDifficultyPopup = false;

        // Generate new hint
        hintCounter = 0;
        hint = formatItems(solution.slice(0, hintCounter));
    }

    /* Function to create the optimal solution using DP */
    function knapsackSolution(weights, values, capacity) {
        const n = values.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(capacity + 1).fill(0),
        );

        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(
                        values[i - 1] + dp[i - 1][w - weights[i - 1]],
                        dp[i - 1][w],
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        const includedItems = [];
        let w = capacity;
        for (let i = n; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                includedItems.push([weights[i - 1], values[i - 1]]);
                w -= weights[i - 1];
            }
        }

        return includedItems;
    }

    /* Function to turn a set of items into a string of 'weight, value; . . .''*/
    function formatItems(items) {
        let result = "";
        for (const [weight, value] of items) {
            result += `Weight: ${weight}, Value: ${value}; `;
        }
        return result;
    }

    function toggleItemSelection(weight, value) {
        const isDuplicateIndex = selectedItems.findIndex(
            ([w, v]) => w === weight && v === value,
        );

        if (isDuplicateIndex !== -1) {
            // If the item is already selected, remove it
            selectedItems = selectedItems.filter(
                (_, index) => index !== isDuplicateIndex,
            );
        } else {
            // If it's not selected, add it to selectedItems
            selectedItems = [...selectedItems, [weight, value]];
        }

        // Update the total weights and values
        sumSelectedWeights();
        sumSelectedValues();
    }

    /* Function to create a backpack of random items, with specified number of items, max weight, and max value */
    function RandomBackpack(numItems, maxWeight, maxValue) {
        const backpack = [];
        for (let i = 0; i < numItems; i++) {
            const weight = Math.floor(Math.random() * maxWeight) + 1;
            const value = Math.floor(Math.random() * maxValue) + 1;
            backpack.push([weight, value]);
        }
        return backpack;
    }

    /* Function to check if the solution and selectedItems match */
    function checkGuess() {
        // Check if the lengths of solution and selectedItems are equal
        if (solution.length !== selectedItems.length) {
            return false; // If lengths are different, return false
        }

        // Sort both arrays to ensure items are in the same order
        const sortedSolution = solution.slice().sort();
        const sortedSelectedItems = selectedItems.slice().sort();

        // Check if each item in sortedSolution matches its corresponding item in sortedSelectedItems
        const isCorrect = sortedSolution.every((item, index) => {
            const selectedItem = sortedSelectedItems[index];
            return item[0] === selectedItem[0] && item[1] === selectedItem[1];
        });

        // If guess is correct, stop the timer
        if (isCorrect) {
            score+= 100 * difficulty;
            clearInterval(timerInterval);
        }

        return isCorrect;
    }

    /* Helper function for the check button */
    function handleCheckGuess() {
        checkGuessResult = checkGuess();
    }

    /* Helper function for the show partial solution button.*/
    function showPartialSolution() {
            score -= 10 * difficulty;
            hintCounter++;
        hint = formatItems(solution.slice(0, hintCounter));
        showSolution = true;
    }

    function hidePartialSolution() {
        showSolution = false;
    }

    /* Helper function for the change difficulty button */
    function toggleDifficultyPopup() {
        showDifficultyPopup = !showDifficultyPopup;
    }

    /* Function to sum the weights of the selectedItems */
    function sumSelectedWeights() {
        selectedWeightsSum = selectedItems.reduce(
            (totalWeight, [weight, _]) => totalWeight + weight,
            0,
        );
    }

    /* Function to sum the values of the selectedItems */
    function sumSelectedValues() {
        selectedValuesSum = selectedItems.reduce(
            (totalValue, [_, value]) => totalValue + value,
            0,
        );
    }

    // Generate a random backpack to be used for the problem
    let backpack = RandomBackpack(numItems, ceiling, maxValue);

    // Extract weights and values
    let weights = backpack.map((item) => item[0]);
    let values = backpack.map((item) => item[1]);

    let solution = knapsackSolution(weights, values, 10);
    let hintCounter = 0;
    let hint = formatItems(solution.slice(0, 1));
    window.addEventListener("load", startTimer);
</script>

<main class="container">
    <div class="content">
        <p>
            Try to fill the most valuable backpack that holds at most {maxWeight}
            (in weight).
        </p>
        <p>Items:</p>
        <div>
            {#each backpack as [weight, value]}
                <button
                    style="width: 100px;"
                    on:click={() => toggleItemSelection(weight, value)}
                    class:selectedItem={selectedItems.some(
                        ([w, v]) => w === weight && v === value,
                    )}
                >
                    {`Weight: ${weight}, Value: ${value}`}
                </button>
            {/each}
        </div>
        <p class:exceeds-max-weight={selectedWeightsSum > maxWeight}>
            Total Weight: {selectedWeightsSum}
        </p>
        <p>Total Value: {selectedValuesSum}</p>
        <p>Time Elapsed: <span id="timer">00:00:00</span></p>
        <p>Score: {score}</p>
        <button on:click={handleCheckGuess}>Check Guess</button>
        {#if checkGuessResult !== null}
            <p>
                {#if checkGuessResult}
                    <span style="color: green;">Correct!</span>
                {:else}
                    <span style="color: red;"
                        >Incorrect! Try again or start a new game.</span
                    >
                {/if}
                <button on:click={newGame}>Start New Game</button>
            </p>
        {/if}
        <p></p>
        <button on:click={toggleDifficultyPopup}>Change Difficulty</button>
        {#if showDifficultyPopup}
            <div class="popup">
                <button on:click={() => setDifficulty(1)}>Normal</button>
                <button on:click={() => setDifficulty(2)}>Hard</button>
            </div>
        {/if}
        <button on:click={showPartialSolution}>Show Hint</button>
        {#if showSolution}
            <button class="hint" on:click={hidePartialSolution}>
                Solution contains: {hint}
            </button>
        {/if}
    </div>
</main>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100;
    }

    .content {
        border: 1px solid black;
        padding: 20px;
        height: 500px;
        overflow: auto;
        text-align: center;
    }

    .exceeds-max-weight {
        color: red;
    }

    .selectedItem {
        background-color: yellow;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hint {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
        background-color: white;
        padding: 20px;
        border: 1px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
