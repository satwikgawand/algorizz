import type { Algorithm } from '../types'

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    nickname: "The Himbo",
    category: "sorting",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. Keeps going until nothing swaps. It means well.",
    whenToUse: "almost never in production. great for learning though. that's literally it.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: `for i in range(n):\n  for j in range(n - i - 1):\n    if arr[j] > arr[j+1]:\n      swap(arr[j], arr[j+1])`,
    commentaryByType: {
      compare: [
        "comparing these two like they're auditioning for something. neither is going to make it.",
        "holding these up side by side. very scientific.",
        "yes we're comparing again. this is the job.",
        "they are not in order. this is a problem we will solve slowly.",
        "another comparison. another chance to feel nothing.",
      ],
      swap: [
        "found two things out of order. swapping. no drama. just vibes.",
        "the swap happens. the crowd does not go wild.",
        "relocating. it's fine. everything is fine.",
        "moved the bigger one forward. tiny win.",
      ],
      noSwap: [
        "these two are fine actually. moving on.",
        "no swap needed. rare moment of peace.",
        "already in order. we love to see it.",
      ],
      sorted: [
        "done. it took a while. we don't talk about how long.",
        "fully sorted. bubble sort has left the chat.",
        "and that's the whole algorithm. hope you learned something.",
      ],
      passComplete: [
        "one full pass completed. doing it again.",
        "another lap around the array. training arc.",
        "pass complete. the largest element has floated to its final resting place.",
      ],
    },
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    nickname: "The Therapist",
    category: "sorting",
    description: "Divides the array in half, recursively sorts each half, then merges them back together in order. Methodical. Has a plan. Trusts the process.",
    whenToUse: "when you need guaranteed O(n log n) and stability matters. linked lists love this one.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    pseudocode: `function mergeSort(arr):\n  if len(arr) <= 1: return arr\n  mid = len(arr) // 2\n  left = mergeSort(arr[:mid])\n  right = mergeSort(arr[mid:])\n  return merge(left, right)`,
    commentaryByType: {
      split: [
        "dividing the array in half. unbothered. methodical.",
        "splitting again. this is not avoidance, this is strategy.",
        "another split. the recursion goes deeper.",
        "broke it down to its smallest parts. now the real work starts.",
      ],
      merge: [
        "merging two sorted halves. this is the part that actually does the work.",
        "carefully placing each element in order. no rushing.",
        "comparing the fronts of both halves like a very calm referee.",
        "the merge continues. every element gets placed exactly once.",
      ],
      compare: [
        "which of these two goes first. easy question. we will answer it calmly.",
        "comparing across the divide. this is fine.",
        "one of these is smaller. one of these knows it.",
      ],
      sorted: [
        "fully merged and sorted. the therapist has done its work.",
        "every element in its place. this is what preparation looks like.",
        "merge sort has no regrets. O(n log n) guaranteed. goodnight.",
      ],
    },
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    nickname: "HIM",
    category: "sorting",
    description: "Picks a pivot, partitions everything smaller to the left and larger to the right, then recursively does the same to each side. Fast. Confident. Occasionally reckless.",
    whenToUse: "almost everywhere in practice. cache-friendly, in-place, fast on average. the default choice for a reason.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
    pseudocode: `function quickSort(arr, low, high):\n  if low < high:\n    pivot = partition(arr, low, high)\n    quickSort(arr, low, pivot - 1)\n    quickSort(arr, pivot + 1, high)`,
    commentaryByType: {
      pivot: [
        "choosing a pivot. confident. maybe overconfident. we'll see.",
        "this element has been selected as the pivot. it didn't ask for this.",
        "pivot chosen. everything else must now be judged relative to it.",
      ],
      partition: [
        "partitioning around the pivot. smaller left, larger right. no exceptions.",
        "elements are getting sorted into their appropriate sides. quick sort has opinions.",
        "the partition wall moves. elements comply.",
        "comparing to the pivot. you are either smaller or you are not. there is no in between.",
      ],
      swap: [
        "swapping these two. the pivot demands it.",
        "out of position. relocated. done.",
        "the swap is swift and merciless.",
      ],
      recurse: [
        "now doing it again on the left half. recursion has entered.",
        "right side's turn. same energy.",
        "going deeper. quick sort doesn't stop until it's right.",
      ],
      sorted: [
        "done. that's why they call him HIM.",
        "fully sorted. average O(n log n). the pivot chose correctly.",
        "quick sort has finished and it was fast and it knows it.",
      ],
    },
  },
  // ─── Sorting ───────────────────────────────────────────────────────────────
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    nickname: "The Intern",
    category: "sorting",
    description: "Builds the sorted array one element at a time by inserting each new element into its correct position. Eager. Well-intentioned. Gets the job done eventually.",
    whenToUse: "when the array is small or nearly sorted. also used as the base case in hybrid sorts like timsort. it knows its lane.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: `for i in range(1, n):\n  key = arr[i]\n  j = i - 1\n  while j >= 0 and arr[j] > key:\n    arr[j+1] = arr[j]\n    j -= 1\n  arr[j+1] = key`,
    commentaryByType: {
      pick: [
        "picking up this element and figuring out where it belongs. very intern energy.",
        "grabbed one. now we find its home.",
        "holding this value carefully. it deserves a good spot.",
      ],
      compare: [
        "is this bigger than where we're trying to insert? checking.",
        "comparing to make room. or not. we'll see.",
        "this one's in the way. maybe.",
      ],
      shift: [
        "scooting this over to make room. excuse me.",
        "shifting right. someone needs this slot.",
        "moving out of the way. temporarily.",
      ],
      insert: [
        "placed it. finally. it fits.",
        "found the spot. inserted. done with this one.",
        "insertion complete. moving on.",
      ],
      sorted: [
        "fully sorted. one at a time, every time.",
        "done. insertion sort did it quietly and without fuss.",
        "sorted. the intern got it right eventually.",
      ],
    },
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    nickname: "The Perfectionist",
    category: "sorting",
    description: "Finds the minimum element in the unsorted portion and places it at the front. Then repeats. It will not stop until every element is exactly where it should be.",
    whenToUse: "almost never. makes exactly n-1 swaps which is useful when writes are expensive, but comparisons are O(n²) regardless. niche.",
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: `for i in range(n):\n  min_idx = i\n  for j in range(i+1, n):\n    if arr[j] < arr[min_idx]:\n      min_idx = j\n  swap(arr[i], arr[min_idx])`,
    commentaryByType: {
      minStart: [
        "assuming this is the minimum. bold of us.",
        "starting a new search for the minimum. again.",
        "this pass begins. the minimum is somewhere. we will find it.",
      ],
      compare: [
        "is this smaller than the current minimum? serious question.",
        "comparing. might be a new minimum. might not.",
        "looking for something smaller. always looking.",
      ],
      newMin: [
        "new minimum found. the bar has been lowered.",
        "this one's smaller. updating accordingly.",
        "dethroned. new minimum achieved.",
      ],
      swap: [
        "swapping minimum into position. methodical.",
        "placing the smallest at the front. where it belongs.",
        "minimum relocated. the perfectionist is satisfied. for now.",
      ],
      placed: [
        "position finalized. this element is not moving again.",
        "locked in. correct. permanent.",
        "one more position settled. the work continues.",
      ],
      sorted: [
        "done. every swap was necessary. every comparison was made.",
        "fully sorted. selection sort has no regrets. only comparisons.",
        "sorted. the perfectionist is finally at peace.",
      ],
    },
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    nickname: "The Engineer Bro",
    category: "sorting",
    description: "Builds a max-heap from the array, then repeatedly extracts the maximum to build the sorted result. Efficient. In-place. Explains itself using the word 'invariant' unprompted.",
    whenToUse: "when you need guaranteed O(n log n) with O(1) space and don't care about stability. not cache-friendly so often slower than quicksort in practice, but the engineer bro will defend it anyway.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
    pseudocode: `# Build max-heap\nfor i in range(n//2-1, -1, -1):\n  heapify(arr, n, i)\n# Extract elements\nfor i in range(n-1, 0, -1):\n  swap(arr[0], arr[i])\n  heapify(arr, i, 0)`,
    commentaryByType: {
      heapify: [
        "heapifying this subtree. maintaining the heap property. classic.",
        "checking parent vs children. the invariant must hold.",
        "sifting down. the largest must be on top. always.",
      ],
      swap: [
        "swapping to restore heap order. this is fine.",
        "out of heap order. correcting. efficient.",
        "the heap demands this swap. who are we to argue.",
      ],
      heapBuilt: [
        "max-heap constructed. phase one complete. now the fun part.",
        "the heap is built. every parent is larger than its children. as it should be.",
        "heap ready. extracting maximums until there's nothing left.",
      ],
      extract: [
        "maximum extracted and placed at the end. heap shrinks.",
        "largest element relocated to its final position. heap does the rest.",
        "another extraction. another element sorted. respect the process.",
      ],
      sorted: [
        "fully sorted. O(n log n) guaranteed. the engineer bro nods knowingly.",
        "done. heap sort delivered. no shortcuts, no regrets.",
        "sorted. in-place. guaranteed. the engineer bro has left the chat.",
      ],
    },
  },
  {
    id: "shell-sort",
    name: "Shell Sort",
    nickname: "The Cryptic One",
    category: "sorting",
    description: "A generalization of insertion sort that allows elements to move far distances in one step using a gap sequence. Faster than O(n²) in practice. Nobody fully understands why.",
    whenToUse: "when insertion sort is too slow but you can't use quicksort for some reason. the gap sequence choice affects performance in ways that are not fully understood theoretically.",
    complexity: { best: "O(n log n)", average: "O(n log²n)", worst: "O(n log²n)", space: "O(1)" },
    pseudocode: `gap = 1\nwhile gap < n/3: gap = gap*3 + 1\nwhile gap >= 1:\n  for i in range(gap, n):\n    # insertion sort with this gap\n  gap = gap // 3`,
    commentaryByType: {
      gap: [
        "new gap selected. elements this far apart will now be compared.",
        "gap phase begins. distant elements, closer relationship. briefly.",
        "reducing gap. getting more local. building towards the final sort.",
      ],
      pick: [
        "picking this element for gapped insertion. unconventional but valid.",
        "grabbed one. now inserting it relative to elements far away.",
        "this value is about to take a long trip.",
      ],
      compare: [
        "comparing across a gap of several positions. unusual but effective.",
        "distant comparison. shell sort doesn't do things normally.",
        "checking something far away. this is on purpose.",
      ],
      shift: [
        "shifting by the gap width. not adjacent. intentional.",
        "moving elements with purpose. across distances.",
        "gap shift complete. the pattern continues.",
      ],
      insert: [
        "inserted at gap-corrected position. trust the process.",
        "placed. the gaps will narrow and this will matter later.",
        "position found. shell sort is building something.",
      ],
      sorted: [
        "done. the gap narrowed to 1 and everything fell into place.",
        "fully sorted. nobody is entirely sure why this works. it just does.",
        "shell sort complete. the cryptic one delivers, as always.",
      ],
    },
  },
  // ─── Searching ─────────────────────────────────────────────────────────────
  {
    id: "linear-search",
    name: "Linear Search",
    nickname: "The Tourist",
    category: "searching",
    description: "Checks every element one by one until it finds the target or runs out of array. No assumptions. No shortcuts. Just vibes and patience.",
    whenToUse: "when the data is unsorted or you only need to search once. or when you've forgotten binary search exists. we've all been there.",
    complexity: { best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
    pseudocode: `for i in range(n):\n  if arr[i] == target:\n    return i\nreturn -1`,
    commentaryByType: {
      compare: [
        "is this it? checking.",
        "looking at this one. could be the one. probably not.",
        "another element examined. this is fine.",
        "nope. moving on. there are more.",
      ],
      miss: [
        "not it. continuing.",
        "wrong one. the search continues.",
        "marked as checked. moving forward with our lives.",
      ],
      found: [
        "found it. only took looking at everything before it.",
        "there it is. hiding in plain sight.",
        "target located. linear search vindicated.",
      ],
      notFound: [
        "checked everything. it's not here. the tourist has seen the whole array.",
        "not found. linear search did its job. the target simply doesn't exist.",
        "gone through it all. nothing. a complete tour of the array.",
      ],
    },
  },
  {
    id: "binary-search",
    name: "Binary Search",
    nickname: "The Sniper",
    category: "searching",
    description: "Halves the search space with every comparison. Requires a sorted array. Finds elements in O(log n). Doesn't miss.",
    whenToUse: "whenever the data is sorted and you need to search it. this is the correct answer. not linear search.",
    complexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
    pseudocode: `low, high = 0, n - 1\nwhile low <= high:\n  mid = (low + high) // 2\n  if arr[mid] == target: return mid\n  elif arr[mid] < target: low = mid + 1\n  else: high = mid - 1\nreturn -1`,
    commentaryByType: {
      mid: [
        "checking the midpoint. eliminating half the array with one look.",
        "midpoint selected. one comparison, half the problem gone.",
        "right in the middle. the sniper takes aim.",
      ],
      goRight: [
        "too small. discarding the left half entirely.",
        "target is bigger. everything left of mid is now irrelevant.",
        "moving right. the answer is in the upper half.",
      ],
      goLeft: [
        "too big. discarding the right half entirely.",
        "target is smaller. everything right of mid is dead to us.",
        "moving left. the answer is in the lower half.",
      ],
      found: [
        "found it. O(log n) steps. the sniper doesn't miss.",
        "target acquired. binary search has done its job.",
        "there it is. took way fewer comparisons than linear search would have.",
      ],
      notFound: [
        "window empty. not in the array. binary search is certain.",
        "not found. and we can be sure of that in O(log n) time.",
        "searched everything. nothing. the sniper confirms the target isn't here.",
      ],
    },
  },
  // ─── Graph Traversal ───────────────────────────────────────────────────────
  {
    id: "bfs",
    name: "BFS",
    nickname: "The Gossip",
    category: "graph",
    description: "Explores a graph level by level using a queue. Visits all neighbors before going deeper. Knows everyone on the current floor before taking the stairs.",
    whenToUse: "finding shortest paths in unweighted graphs, level-order traversal, checking connectivity. the gossip hears things in order of closeness.",
    complexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
    pseudocode: `queue = [start]\nvisited = {start}\nwhile queue:\n  node = queue.popleft()\n  for neighbor in graph[node]:\n    if neighbor not in visited:\n      visited.add(neighbor)\n      queue.append(neighbor)`,
    commentaryByType: {
      initial: [
        "starting bfs. queue initialized. the gossip begins spreading.",
        "node 0 is in the queue. the rumor has started.",
        "bfs initialized. breadth first. all neighbors before going deeper.",
      ],
      visit: [
        "visiting this node. dequeued. the gossip has arrived.",
        "popped from queue. now checking neighbors.",
        "current node visited. who does it know?",
      ],
      enqueue: [
        "neighbor discovered. added to queue. the gossip spreads.",
        "new node found. queued for visiting.",
        "adding to queue. it'll be visited in due time.",
      ],
      done: [
        "bfs complete. every reachable node has been visited.",
        "the gossip has reached everyone. nothing left to discover.",
        "traversal done. level by level, the whole graph explored.",
      ],
    },
  },
  {
    id: "dfs",
    name: "DFS",
    nickname: "The Spelunker",
    category: "graph",
    description: "Explores a graph by going as deep as possible before backtracking. Uses a stack (or recursion). Finds the darkest corner before coming back up for air.",
    whenToUse: "detecting cycles, topological sorting, solving mazes, finding connected components. the spelunker goes deep and comes back with knowledge.",
    complexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
    pseudocode: `stack = [start]\nvisited = set()\nwhile stack:\n  node = stack.pop()\n  if node not in visited:\n    visited.add(node)\n    for neighbor in graph[node]:\n      stack.append(neighbor)`,
    commentaryByType: {
      initial: [
        "starting dfs. stack initialized. the spelunker descends.",
        "node 0 on the stack. time to go deep.",
        "dfs initialized. we will explore as far as possible before turning back.",
      ],
      visit: [
        "popped from stack. visiting. going deeper.",
        "current node visited. exploring its tunnels.",
        "the spelunker arrives here. checking all exits.",
      ],
      push: [
        "pushing neighbor onto stack. going deeper next.",
        "new path discovered. queued for exploration.",
        "neighbor found. it's next on the stack.",
      ],
      done: [
        "dfs complete. every reachable node explored. the spelunker resurfaces.",
        "traversal done. went as deep as possible, came back for everything.",
        "done. depth-first, no regrets, no node left behind.",
      ],
    },
  },
  // ─── Pathfinding ───────────────────────────────────────────────────────────
  {
    id: "dijkstra",
    name: "Dijkstra's",
    nickname: "The GPS",
    category: "pathfinding",
    description: "Finds the shortest path from start to end by greedily visiting the closest unvisited node. Works on weighted graphs. Always recalculating.",
    whenToUse: "shortest path in weighted graphs with non-negative weights. the foundation of most routing algorithms. your maps app uses something like this.",
    complexity: { best: "O(V+E)", average: "O((V+E) log V)", worst: "O((V+E) log V)", space: "O(V)" },
    pseudocode: `dist = {v: inf for v in graph}\ndist[start] = 0\nwhile unvisited:\n  u = unvisited node with min dist\n  for v in neighbors(u):\n    if dist[u] + weight(u,v) < dist[v]:\n      dist[v] = dist[u] + weight(u,v)`,
    commentaryByType: {
      initial: [
        "grid ready. dijkstra's will find the shortest path. recalculating.",
        "distances initialized. start node is 0. everything else is infinity.",
        "the gps has been loaded. finding optimal route.",
      ],
      visit: [
        "visiting the closest unvisited cell. updating neighbors.",
        "current node: minimum distance in unvisited set.",
        "the gps arrives here. checking all roads.",
      ],
      relax: [
        "found a shorter path to this neighbor. updating distance.",
        "relaxing edge. shorter route discovered.",
        "distance updated. the gps recalculates.",
      ],
      done: [
        "shortest path found. the gps has arrived.",
        "dijkstra's complete. optimal route highlighted.",
        "path traced. every step was necessary.",
      ],
      noPath: [
        "no path exists. recalculating... still no path. the gps gives up.",
        "completely blocked. dijkstra's confirms: no route available.",
        "start and end are disconnected. unfortunate.",
      ],
    },
  },
  {
    id: "a-star",
    name: "A*",
    nickname: "The Visionary",
    category: "pathfinding",
    description: "Like Dijkstra's but uses a heuristic to guide the search toward the goal. Explores fewer nodes. Sees the destination before arriving.",
    whenToUse: "shortest path when you have a heuristic (like straight-line distance). faster than dijkstra's in practice for most pathfinding. used in games, robotics, maps.",
    complexity: { best: "O(E)", average: "O(E log V)", worst: "O(E log V)", space: "O(V)" },
    pseudocode: `open = {start}\nwhile open:\n  u = node in open with min f = g + h\n  if u == end: return path\n  for v in neighbors(u):\n    if g[u]+1 < g[v]:\n      g[v] = g[u]+1\n      f[v] = g[v] + h(v, end)\n      open.add(v)`,
    commentaryByType: {
      initial: [
        "a* initialized. heuristic: manhattan distance. the visionary can see the goal.",
        "open set ready. f = g + h. combining cost and intuition.",
        "the visionary sees where we need to go. let's get there efficiently.",
      ],
      visit: [
        "visiting node with lowest f score. guided by the heuristic.",
        "this node had the best combined cost + estimate. visiting.",
        "the visionary focuses here. one step closer.",
      ],
      enqueue: [
        "added to open set with updated f score. the path improves.",
        "promising neighbor found. added to consideration.",
        "the visionary notes this direction as worthwhile.",
      ],
      done: [
        "path found. a* used the heuristic to get here faster than dijkstra's would have.",
        "optimal path traced. the visionary saw it coming.",
        "done. fewer nodes explored than dijkstra's, same guarantee.",
      ],
      noPath: [
        "no path exists. the visionary sees only walls.",
        "completely blocked. a* confirms: no route.",
        "open set exhausted. the goal is unreachable.",
      ],
    },
  },
  // ─── String Matching ───────────────────────────────────────────────────────
  {
    id: "kmp",
    name: "KMP",
    nickname: "The Preparer",
    category: "string-matching",
    description: "Preprocesses the pattern into a failure table that tells it how far to shift on a mismatch. Never re-examines characters it already knows. Does not wing it.",
    whenToUse: "linear time string matching. better than naive O(nm) when the pattern has repeating prefixes. the go-to for single pattern search.",
    complexity: { best: "O(n)", average: "O(n+m)", worst: "O(n+m)", space: "O(m)" },
    pseudocode: `# Build failure table\ntable = build_kmp_table(pattern)\n# Search\ni = j = 0\nwhile i < len(text):\n  if text[i] == pattern[j]:\n    i++; j++\n    if j == len(pattern): match at i-j\n  elif j > 0: j = table[j-1]\n  else: i++`,
    commentaryByType: {
      initial: [
        "kmp is preprocessing the pattern before looking at the text. preparation is everything.",
        "building the failure table first. understanding the pattern's structure.",
        "the preparer studies before acting. unlike naive string search.",
      ],
      tableBuilt: [
        "failure table complete. now kmp knows exactly how far to shift on any mismatch.",
        "preprocessing done. the knowledge has been encoded.",
        "table ready. no character will be checked twice.",
      ],
      compare: [
        "comparing text[i] with pattern[j]. this is the main loop.",
        "character comparison. one at a time.",
        "checking for alignment. do these match?",
      ],
      match: [
        "full match found. the pattern is here. kmp smiles knowingly.",
        "match confirmed. the failure table paid off.",
        "found it. and we did it in O(n+m). the preparer delivers.",
      ],
      mismatch: [
        "mismatch. consulting the failure table for the optimal shift.",
        "doesn't match. but we don't go back to zero. that's the point.",
        "failure table consulted. shifting intelligently.",
      ],
      done: [
        "search complete. kmp never re-examined a single character it already saw.",
        "done. linear time, as promised.",
        "finished. the preparer has done its work and is satisfied.",
      ],
    },
  },
  {
    id: "rabin-karp",
    name: "Rabin-Karp",
    nickname: "The Mathematician",
    category: "string-matching",
    description: "Uses a rolling hash to quickly eliminate non-matching windows, then verifies hash matches character by character. Elegant. Occasionally unlucky with collisions.",
    whenToUse: "multi-pattern search or when you want average O(n+m) with a simpler implementation than kmp. the rolling hash is genuinely clever.",
    complexity: { best: "O(n+m)", average: "O(n+m)", worst: "O(nm)", space: "O(1)" },
    pseudocode: `p_hash = hash(pattern)\nw_hash = hash(text[0:m])\nfor i in range(n-m+1):\n  if w_hash == p_hash:\n    if text[i:i+m] == pattern: match\n  w_hash = roll(w_hash, text[i], text[i+m])`,
    commentaryByType: {
      initial: [
        "rabin-karp: computing hashes before comparing characters. math first.",
        "hashing pattern and initial window. the rolling hash begins.",
        "the mathematician approaches this with polynomials and modular arithmetic.",
      ],
      hash: [
        "hash computed. a single number represents the entire pattern.",
        "polynomial rolling hash initialized. the math is doing the heavy lifting.",
        "hashes ready. if they match, then we check. if not, we skip. efficient.",
      ],
      compare: [
        "comparing window hash to pattern hash. if equal, we verify.",
        "hash check: does this window's hash match the pattern's hash?",
        "rolling window hash vs pattern hash. the moment of truth.",
      ],
      match: [
        "hash match AND character match. confirmed. not a collision.",
        "verified! a true match, not just a hash coincidence.",
        "the mathematician confirms: genuine match found.",
      ],
      spurious: [
        "hash collision. the hashes matched but the characters didn't. known risk.",
        "spurious hit. this is why we verify after a hash match.",
        "false alarm. the math lied this once. the mathematician is unbothered.",
      ],
      roll: [
        "rolling the hash: removing old character, adding new one. O(1) operation.",
        "hash updated in constant time. this is the magic of rolling hashes.",
        "one character out, one in. the window slides, the hash adjusts.",
      ],
      done: [
        "search complete. the rolling hash did most of the work.",
        "finished. average O(n+m), and the math was beautiful.",
        "done. the mathematician is pleased. or at least not displeased.",
      ],
    },
  },
]
