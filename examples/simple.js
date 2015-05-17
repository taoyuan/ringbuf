var RingBuffer = require('../');

var ring = new RingBuffer(2);

console.log(ring.enq(10));// 1
console.log(ring.enq(5)); // 2
console.log(ring.enq(1)); // 2 - 10 will be discarded
console.log(ring.size()); // 2
console.log(ring.peek()); // 5
console.log(ring.deq());  // 5
console.log(ring.size()); // 1