const START = 0
const DATA = 1
const STOP = 2

const introduceAtoB = (A, B) => B(START, A)
const send = (B, message) => B(DATA, message)
const stop = B => B(STOP)

const fromVerboseCallbag = verboseCallbag => {
  return (type, payload) => {
    if (type === START) verboseCallbag.meet(payload)
    if (type === DATA) verboseCallbag.receive(payload)
    if (type === STOP) verboseCallbag.stop()
  }
}

module.exports = {
    START,
    DATA,
    STOP,
    introduceAtoB,
    send,
    stop,
    fromVerboseCallbag
}