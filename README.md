# callbag-from-verbose

  A more verbose way to create callbags

`npm install callbag-from-verbose`

## Concepts

### 3 actions

|      ACTION        |          VERBOSE          |       CALLBAG       |  
| ------------------ | --------------------------| --------------------|
| Introduce A to B   |    introduceAtoB(A, B)    |    B(START, A)      |  
| Send B a message   |    send(B, message)       |    B(DATA, message) |  
| Stop B             |    stop(B)                |    B(STOP)          |  

### 3 events

|      ACTION          |          VERBOSE              |              CALLBAG             |  
| -------------------- | ----------------------------- | -------------------------------- |
| B meet A             | B = {meet: A => ...}          | B = (t, p) => {if(t === 0){...}} |  
| B receives a message | B = {receive: message => ...} | B = (t, p) => {if(t === 1){...}} |  
| B is asked to stop   | B = {stop: () => ...}         | B = (t, p) => {if(t === 2){...}} |  

## Simple example

### Orginal code

*Taken from the 'Callback Heaven' talk from Andre Staltz (video)[https://www.youtube.com/watch?v=HssczgaY9BM]*

```javascript
const producer = (type, payload) => {
  if (type === 0) {
    const other = payload
    let i = 0;
    const handle = setInterval(() => {
      other(1, i++);
    }, 1000);
    other(0, (t, p) => {
      if (t === 1) i = p
      if (t === 2) clearInterval(handle);
    })
  }
};


const consumer = (type, payload) => {
  if (type === 0) {
    const other = payload
    setTimeout(() => other(1, 17), 3500)
    setTimeout(() => other(2), 7500)
  }
  if (type === 1) {
    console.log(payload)
  }
}

producer(0, consumer)
```

### Verbose code

```javascript
const {
    introduceAtoB,
    send,
    stop,
    fromVerboseCallbag
} = require('callbag-from-verbose')

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
```
