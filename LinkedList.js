class LinkedList {
  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  removeFirst () {
    if (!this.first) throw new Error('List is empty')

    const first = this.first
    this.first = this.first.after

    if (first === this.last) {
      this.last = null
    }

    this.length--

    return first.value
  }

  removeLast () {
    if (!this.last) throw new Error('List is empty')

    const last = this.last
    this.last = this.last.before

    if (last === this.first) {
      this.first = null
    }

    this.length--

    return last.value
  }

  addFirst (value) {
    const newNode = new Node(value)
    newNode.after = this.first

    if (this.first) {
      this.first.before = newNode
    }

    this.first = newNode

    this.length++

    if (!this.last) this.last = newNode
  }

  addLast(value) {
    const before = this.values()

    const newNode = new Node(value)
    newNode.before = this.last

    if (this.last) {
      this.last.after = newNode
    }

    this.last = newNode

    this.length++

    if (!this.first) this.first = newNode
  }

  addAll(values) {
    values.forEach(value => this.addLast(value))
  }

  clone () {
    const values = this.values()

    const clone = new LinkedList()
    values.forEach(node => {
      clone.addLast(node)
    })

    return clone
  }

  values () {
    const values = []
    let node = this.first

    while (node) {
      values.push(node.value)
      node = node.after
    }

    return values
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.before = null
    this.after = null
  }
}

module.exports = LinkedList
