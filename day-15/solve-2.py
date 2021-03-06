#
# Source: https://github.com/TheMorpheus407/AdventOfCode2020/blob/master/15.py
#

def memory(nums, turns):
    num_dict = {num: counter + 1 for counter, num in enumerate(nums[:-1])}
    last = nums[-1]
    for i in range(len(nums), turns):
        if last in num_dict:
            new = i - num_dict[last]
        else:
            new = 0
        num_dict[last] = i
        last = new
    return last


with open("input.txt") as f:
    inp = f.read().strip().split(",")
nums = [int(i) for i in inp]
import timeit
print(memory(nums, 2020))
print(memory(nums, 30000000))