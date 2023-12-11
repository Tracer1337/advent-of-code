sum = 0

with open('./input.txt') as input:
  for line in input:
    first, last = None, None
    for char in line:
      if char.isdigit():
        first = int(char) if first is None else first
        last = int(char)
    sum += first * 10 + last

print(sum)
