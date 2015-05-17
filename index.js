/**
 * Expose `RingBuffer`.
 */
module.exports = RingBuffer;

/**
 * Initializes a new empty `RingBuffer` with the given `capacity`, when no
 * value is provided uses the default capacity (50).
 *
 * @param {Number} [capacity]
 * @return {RingBuffer}
 * @api public
 */
function RingBuffer(capacity) {
  this._capacity = capacity || 50;
  this.clear();
}

/**
 * Returns the capacity of the ring buffer.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.capacity = function() {
  return this._elements.length;
};

/**
 * Returns whether the ring buffer is empty or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isEmpty = function() {
  return this.size() === 0;
};

/**
 * Returns whether the ring buffer is full or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isFull = function() {
  return this.size() === this.capacity();
};

/**
 * Peeks at the top element(s) of the queue.
 *
 * @param {Number} [count]
 * @return {Object|Array}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.peek = function(count) {
  if (this.isEmpty()) throw new Error('RingBuffer is empty');

  if (count === undefined) return this._elements[this._first];

  count = Math.min(count, this.size());
  var results = new Array(count);
  for (var i = this._first, c = 0; c < count; i++, c++) {
    if (i >= this.capacity()) i = 0; // Wrap around to the beginning
    results[c] = this._elements[i];
  }
  return results;
};

/**
 * Dequeues the top element of the queue.
 *
 * @return {Object}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.deq = function() {
  var element = this.peek();

  this._size--;
  this._first = (this._first + 1) % this.capacity();

  return element;
};

/**
 * Enqueue the `element` at the end of the ring buffer and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.enq = function(element) {
  this._end = (this._first + this.size()) % this.capacity();
  this._elements[this._end] = element;

  if (this.isFull()) {
    this._first = (this._first + 1) % this.capacity();
  } else {
    this._size++;
  }

  return this.size();
};

/**
 * Returns the size of the queue.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.size = function() {
  return this._size;
};

/**
 * Clear all elements.
 *
 * @api public
 */
RingBuffer.prototype.clear = function() {
  this._elements = new Array(this._capacity);
  this._first = 0;
  this._last = 0;
  this._size = 0;
};
