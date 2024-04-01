<script>
    let guess = '';
  let resultMessage = '';
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

  function formatItems(items) {
      let result = "";
      for (const [weight, value] of items) {
          result += `Weight: ${weight}, Value: ${value}; `;
      }
      return result;
  }

  function RandomBackpack(numItems, maxWeight, maxValue) {
      const backpack = [];
      for (let i = 0; i < numItems; i++) {
          const weight = Math.floor(Math.random() * maxWeight) + 1;
          const value = Math.floor(Math.random() * maxValue) + 1;
          backpack.push([weight, value]);
      }
      return backpack;
  }

  function checkGuess() {
      const guessValue = parseInt(guess);
      const isGuessInSolution = solution.some(([weight, value]) => value === guessValue);
      resultMessage = isGuessInSolution ? "Guess is in the solution!" : "Guess is not in the solution.";
  }

  const numItems = 5;
  const maxWeight = 10;
  const maxValue = 100;
  const backpack = RandomBackpack(numItems, maxWeight, maxValue);
  const formattedBackpack = formatItems(backpack);

  // Extract weights and values
  const weights = backpack.map((item) => item[0]);
  const values = backpack.map((item) => item[1]);

  const solution = knapsackSolution(weights, values, 10);
  const formattedSolution = formatItems(solution);
</script>

<main>
  Try to fill the most valuable backpack that holds at most 10 (in weight). <br />
      <label for="guessInput">Enter a value to guess:</label>
      <input type="text" id="guessInput" bind:value={guess}>
      <button on:click={checkGuess}>Check Guess</button>
  <div>{resultMessage}</div>
  Items: {formattedBackpack} <br />
  Solution contains: {formattedSolution}
</main>

<style>
</style>
