// Total runtime is O(M^3), where there are M items in the list

// loop over x = 0 (inclusive) to v (exclusive) in reverse order
#define L(x,v) for(x = v; x--;)

/* m = counts of each type of magical nature (identified by first character)
 *
 * We group the items by magical nature and then process their counts.
 *
 * y = 1 + (# of items processed so far)
 *
 * f[x] = x factorial
 *
 * c[x][y] = x choose y
 *
 * p[x][y] = possibilities for first x groups to have y conflicts,
 *           where a conflict is two adjacent items that have the same type
 *
 * k, b, n, and r are indices, though they take on specific values later
 */
long m['  '],y,f[20],c[20][20],p[20][20],k,b,n,r,magicRecipeOfProtection(auto I) {

    // magical nature is (in all tests) uniquely identified by its first character
    for (z : I)
        ++m[z[y = *f = **c = **p = 1][0]];
    // we also initialized y, f[0], c[0][0], and p[0][0] to 1

    // fill out the f and c arrays
    for (; ++b < 20; f[b] = f[b-1]*b)
        L(n,b+1)
            c[b][n] = !n ?: c[b-1][n-1] + c[b-1][n];

    /* DP with index k (# of types processed) in array p
     *
     * b = # of old conflicts
     * y = 1 + old total number of items
     * n = # of new conflicts
     * r = # of resolved conflicts
     * x = # of items of current type
     *
     * First we pick r of the old conflicts to fix = c[b][r]
     *
     * Since we have n new conflicts, we will have x-n new runs of this magical type
     * We already chose r of them, so we have x-n-r left to place (that don't resolve conflicts)
     * There were y locations in total to place stuff, but we can't use conflict spots (b)
     * So from the remaining y-b locations, we choose x-n-r of them = c[y-b][x-n-r]
     *
     * Last, we must pick where the duplicates for new conflicts go.
     * We have x-n total locations already, and n items
     * This is equivalent to putting n items into x-n bins,
     * which is the same as ordering n items and x-n-1 dividers = c[x-1][n]
     *
     * This is (of course) multiplied by p[k][b], the number of ways
     * of placing the first k groups with b conflicts
     *
     * We then multiply by f[x], since for the final result, all items are distinct,
     * and this process treats all items of the same type as indistinguishable.
     * Thus at the end we could multiply by f[x] for each count x,
     * or just do it as we go in the DP array (as shown here).
     *
     * The new number of conflicts is (old) - (resolved) + (new) = b+n-r
     *
     * From all the combinatorial terms we obtain a bunch of inequalities,
     * but I tested removing the checks for most of them and the result is the same.
     */

    // runtime for first 2 loops is M
    for (x : m) {
        L(n,x)
            // runtime of third loop is M
            L(b,y)
                // runtime of fourth loop is M
                L(r,y)
                    p[k+1][b+n-r] += c[b][r]*c[y-b][x-n-r]*c[x-1][n]*p[k][b]*f[x];

        // update total with x
        y += x;

        // only increment k if x was nonzero (otherwise the loop L(n,x) had 0 iterations)
        k += !!x;
    }

    // number of ways of ordering all the groups with 0 conflicts
    return p[k][0];
