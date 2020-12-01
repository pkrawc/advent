function partOne(input) {
  const arr = input.trim().split(/\n/).map(Number)
  for (let a = 0; a < arr.length; a++) {
    const bArr = arr.slice(a + 1)
    for (let b = 0; b < bArr.length; b++) {
      if (arr[a] + bArr[b] === 2020) {
        return arr[a] * bArr[b]
      }
    }
  }
  return false
}

function partTwo(input) {
  const arr = input.trim().split(/\n/).map(Number)
  for (let a = 0; a < arr.length; a++) {
    const bArr = arr.slice(a + 1)
    for (let b = 0; b < bArr.length; b++) {
      const cArr = bArr.slice(b + 1)
      for (let c = 0; c < cArr.length; c++) {
        if (arr[a] + bArr[b] + cArr[c] === 2020) {
          return arr[a] * bArr[b] * cArr[c]
        }
      }
    }
  }
  return false
}

module.exports = {
  partOne,
  partTwo,
}
