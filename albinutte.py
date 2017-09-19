from collections import defaultdict

memory = {}
steps = 0


def magicRecipeOfProtection(ingredients):
    remaining_ingredients = defaultdict(int)
    for _, tp in ingredients:
        remaining_ingredients[tp] += 1
    res = solve(list(remaining_ingredients.values()), None)
    print(f"steps = {steps}")
    return res


def solve(remaining_ingredients, last_ingredient):
    global steps
    key = tuple(remaining_ingredients), last_ingredient
    if key in memory:
        return memory[key]
    if sum(remaining_ingredients) == 0:
        return 1
    counted_cnt = defaultdict(list)
    for tp, cnt in enumerate(remaining_ingredients):
        steps += 1
        if cnt > 0 and tp != last_ingredient:
            if cnt in counted_cnt:
                counted_cnt[cnt][1] += 1
            else:
                remaining_ingredients[tp] -= 1
                counted_cnt[cnt] = [solve(remaining_ingredients, tp) * cnt, 1]
                remaining_ingredients[tp] += 1
    res = 0
    for a, b in counted_cnt.values():
        res += a * b
    memory[key] = res
    return res


print(magicRecipeOfProtection([['', 'a'], ['', 'a'], ['', 'b'], ['', 'b'], ['', 'c']]))
