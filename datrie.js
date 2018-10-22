function DoubleArray(keys) {
    this.base = new Int32Array(16)
    this.check = new Int32Array(16)
    this.base[0] = 0
    this.check[0] = 1
    this.base0 = 1
    this.length = keys.length

    keys.sort()
    items = [[0, keys.length-1, 0, 0]] // key range, lcp, nodeId
    while (items.length > 0) {
        [i, j, lcp, nodeId] = items.pop()
        subranges = []
    }
}

DoubleArray.prototype.isUsed = function (nodeId) {
    return this.check[nodeId] > 0
}

DoubleArray.prototype.append = function (nodeId, keyId, keys) {
    nonEmpty = 0
    base = this.base0
    while (true) {
        while (base + keys[keys.length-1] > this.base.length) {
            newbase = new Int32Array(this.base.length*2)
            newbase.set(this.base)
            this.base = newbase
        }
        if (keys.every(x => !this.isUsed(base+x))) break
        this.isUsed(base+keys[0]) && (nonEmpty += 1)
        base += 1
    }

    this.base[nodeId] = base
    for (k in keys) {
        this.base[base+k] = keyId
        this.check[base+k] = nodeId
    }
    let alpha = nonEmpty / (base - this.base0 + 1)
    alpha > 0.9 && (this.base0 = base)
    return base
}

var words = [ ",", "the", ".", "to", "of", "a", "and", "in", "``", "that", "s", "for" ]
var trie = new DoubleArray(words)
console.log(trie.check)
