# RingBuf

[![Build](https://circleci.com/gh/taoyuan/ringbuf.svg?style=shield)](https://circleci.com/gh/taoyuan/ringbuf)
[![Dependencies](https://david-dm.org/taoyuan/ringbuf.svg)](https://david-dm.org/taoyuan/ringbuf)

A simple ring buffer data structure for Node.js and the browser.

This repository is forked from [janogonzalez/ringbufferjs](http://github.com/janogonzalez/ringbufferjs)

## Installation

As component for the browser:

```
$ component install taoyuan/ringbuf
```

As npm for Node.js:

```
$ npm install ringbuf
```

## Example

```js
var RingBuffer = require('ringbuf');

var ring = new RingBuffer(2);

ring.enq(10);
ring.enq(5);
ring.enq(1); // 10 will be discarded
ring.size(); // 2
ring.peek(); // 5
ring.deq();  // 5
ring.size(); // 1
```

## API

### RingBuffer()

Initializes a new empty `RingBuffer` with the default capacity (50).

### RingBuffer(capacity)

Initializes a new empty `RingBuffer` with the given `capacity`.

### RingBuffer#capacity()

Returns the capacity of the ring buffer.

### RingBuffer#deq()

Dequeues the top element of the ring buffer.
Throws an `Error` when the buffer is empty.

### RingBuffer#enq(element)

Enqueues the `element` at the end of the ring buffer and returns its new size.
When the buffer is full the oldest element is discarded.

### RingBuffer#isEmpty()

Returns whether the ring buffer is empty or not.

### RingBuffer#isFull()

Returns whether the ring buffer is full or not.

### RingBuffer#peek()

Peeks at the top element of the ring buffer.
Throws an `Error` when the buffer is empty.

### RingBuffer#size()

Returns the size of the ring buffer.

## Testing

As component in the browser, open test/test.html in your browser:

```
$ make
$ open test/test.html
```

As npm package:

```
$ npm test
```

## Licence

MIT
