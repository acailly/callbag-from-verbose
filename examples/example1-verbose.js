const {
    introduceAtoB,
    send,
    stop,
    fromVerboseCallbag
} = require('../index.js')

const verboseProducer = fromVerboseCallbag({
  meet: other => {
    let i = 0;
    const handle = setInterval(() => {
      send(other, i++)
    }, 1000);
    introduceAtoB(
      fromVerboseCallbag({
        receive: message => (i = message),
        stop: () => clearInterval(handle)
      }),
      other
    )
  }
})

const verboseConsumer = fromVerboseCallbag({
  meet: other => {
    setTimeout(() => send(other, 17), 3500)
    setTimeout(() => stop(other), 7500)
  },
  receive: message => console.log(message)
})

introduceAtoB(verboseConsumer, verboseProducer)