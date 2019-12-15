const LinkedList = require('./LinkedList')

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

const findAllSequences = node => {
  const result = allSequences(node)

  return result.map(list => list.values())
}

const allSequences = node => {
  const result = []

  if (!node) {
    result.push(new LinkedList())
    return result
  }
  const prefix = new LinkedList()
  prefix.addLast(node.value)

  const leftSeq = allSequences(node.left)
  const rightSeq = allSequences(node.right)

  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved = []
      weaveLists(left, right, weaved, prefix)
      result.push(...weaved)
    }
  }
  return result
}

const weaveLists = (first, second, results, prefix) => {
  // One list is empty. Add remainder to prefix and store result
  if (!first.length || !second.length) {
    const result = prefix.clone()

    result.addAll(first.values())
    result.addAll(second.values())
    results.push(result)
    return
  }

  // Recurse with head of first added to prefix. Removing the head will damage first so we need to put it back where we found it afterwards
  const headFirst = first.removeFirst()
  prefix.addLast(headFirst)
  weaveLists(first, second, results, prefix)
  prefix.removeLast()
  first.addFirst(headFirst)

  // Do the same with second, damaging and then restoring the list
  const headSecond = second.removeFirst()
  prefix.addLast(headSecond)
  weaveLists(first, second, results, prefix)
  prefix.removeLast()
  second.addFirst(headSecond)
}

const root = new Node(2)
root.left = new Node(1)
root.right = new Node(3)

findAllSequences(root)
