digit_words = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
}

available_words = list(digit_words.keys())

sum = 0

def format_digits(input):
  output = ''
  for (i, char) in enumerate(input):
    j = i
    current_word = char
    while any(word.startswith(current_word) for word in available_words) and j < len(input):
      j += 1
      current_word += input[j]
    current_word = current_word[:-1]
    output += str(digit_words[current_word]) if current_word in digit_words else char
  return output

with open('./input.txt') as input:
  for line in input:
    line = format_digits(line)
    first, last = None, None
    for char in line:
      if char.isdigit():
        first = int(char) if first is None else first
        last = int(char)
    sum += first * 10 + last

print(sum)
