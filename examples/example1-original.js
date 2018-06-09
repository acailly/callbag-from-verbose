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