PATTERNS = [
  ["one"],
  ["jab"],
  ["double jab"],
  ["one two"],
  ["one two three"],
  ["jab cross hook"],
  ["jab uppercut hook"],
  ["one two three two"],
  ["jab cross"]
]

def new_round(length)
  start_time = Time.now.to_i
  current_time = 0
  system 'afplay /System/Library/Sounds/Ping.aiff'
  sleep 0.5
  while current_time < (start_time + length) do
    combo = PATTERNS.sample[0]
    puts combo
    system "say -v Bruce \"#{combo}\""
    sleep 0.7 * combo.split.size
    current_time = Time.now.to_i
  end
  sleep 0.5
  system 'afplay /System/Library/Sounds/Ping.aiff'
end

def new_break(length)
  puts "break begin"
  sleep length - 5
  5.times do |i|
    puts "break ending in #{5-i}"
    system 'afplay /System/Library/Sounds/Ping.aiff'
    sleep 0.5
  end
  puts "break over"
end

round_length = 180 # 3 minutes
number_of_rounds = 3
break_length = 60 # 1 minute

current_round = 0
while current_round < number_of_rounds
  new_round(round_length)
  current_round += 1
  new_break(break_length) if current_round < number_of_rounds
end
