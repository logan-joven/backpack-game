<script>
    /* helper function to find maximum of two integers */
    function max(a, b) {
        return a > b ? a : b;
    }

    /* Dynamic Programming Solution that returns a tuple of maximum profit and an array of the items? */
    function knapsack(capacity, weight, value, n, optimalKnapsack)
    {
        /* Base case */
        if (n == 0 || capacity == 0)
            return 0;

            if (optimalKnapsack[n][capacity] != -1)
                return solution[n][capacity];
    }
    
</script>

<style>
</style>

<main>
    <h1> Game </h1>
</main>
