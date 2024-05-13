<script>
    let resultMessage = "";

    // These values are currently hardcoded, but should be changed per user settings or a difficulty
    let numItems = 5;
    let maxWeight = 10;
    let maxValue = 100;

    let selectedItems = [];
    let selectedWeightsSum = 0;
    let selectedValuesSum = 0;

    let checkGuessResult = null;
    let showSolution = false;

    /* Function to create a new game */
    function newGame() {
        // Generate a new random backpack
        backpack = RandomBackpack(numItems, maxWeight, maxValue);

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
        return sortedSolution.every((item, index) => {
            const selectedItem = sortedSelectedItems[index];
            return item[0] === selectedItem[0] && item[1] === selectedItem[1];
        });
    }

    /* Helper function for the check button */
    function handleCheckGuess() {
        checkGuessResult = checkGuess();
    }

    /* Helper function for the show solution button. May be removed later. */
    function handleShowSolution() {
        showSolution ^= true; // xor = true flips every time
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
    let backpack = RandomBackpack(numItems, maxWeight, maxValue);

    // Extract weights and values
    let weights = backpack.map((item) => item[0]);
    let values = backpack.map((item) => item[1]);

    let solution = knapsackSolution(weights, values, 10);
    let formattedSolution = formatItems(solution);
</script>

<main class="container">
    <div class="content">
        <p>
            Try to fill the most valuable backpack that holds at most 10 (in
            weight).
        </p>
        <div>{resultMessage}</div>
        <p>Items:</p>
        <div>
            {#each backpack as [weight, value]}
                <button
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
        <button on:click={handleCheckGuess}>Check Guess</button>
        {#if checkGuessResult !== null}
            <p>
                {checkGuessResult
                    ? "Provided answer is correct!"
                    : "Provided answer is not correct! Try again."}
                <button on:click={newGame}>Start New Game</button>
            </p>
        {/if}
        <p></p>
        <button on:click={handleShowSolution}>Show Solution</button>
        {#if showSolution}
            <p>
                Solution contains: {formattedSolution}
            </p>
        {/if}
    </div>
</main>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .content {
        border: 1px solid black;
        padding: 20px;
        height: 400px;
        overflow: auto;
    }

    .exceeds-max-weight {
        color: red;
    }

    .selectedItem {
        background-color: yellow;
    }
</style>
