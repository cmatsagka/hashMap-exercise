import { hashMap } from './hashMap.js';

test('hash: returns a consistent index within bounds', () => {
	const myMap = hashMap();
	const index = myMap.hash('apple');

	expect(index).toBeGreaterThanOrEqual(0);
	expect(index).toBeLessThan(16);

	expect(myMap.hash('apple')).toBe(index);
});

test('set: stores a value at the hashed index', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');

	const index = myMap.hash('apple');
	const allBuckets = myMap.debug();

	expect(allBuckets[index].key).toBe('apple');
	expect(allBuckets[index].value).toBe('red');
});

test('collision: chains different keys in the same bucket', () => {
	const myMap = hashMap();

	myMap.set('a', 'first');
	myMap.set('q', 'second');

	const index = myMap.hash('a');
	const firstNode = myMap.debug()[index];
	const secondNode = firstNode.nextNode;

	expect(firstNode.key).toBe('a');
	expect(secondNode.key).toBe('q');
	expect(secondNode.value).toBe('second');
});

test('update: overwrites value if key already exists', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');
	myMap.set('apple', 'green');

	const index = myMap.hash('apple');
	const bucket = myMap.debug()[index];

	expect(bucket.value).toBe('green');
	expect(bucket.nextNode).toBeNull();
});

test('deep update: updates a key that is deep in a collision chain', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');
	myMap.set('q', 'updated-second');

	const index = myMap.hash('a');
	const secondNode = myMap.debug()[index].nextNode;

	expect(secondNode.key).toBe('q');
	expect(secondNode.value).toBe('updated-second');
});

test('get: returns the value that is assigned to the key', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');

	expect(myMap.get('a')).toBe('first');
	expect(myMap.get('q')).toBe('second');
});

test('get: returns null if the the key is not found', () => {
	const myMap = hashMap();
	myMap.set('a', 'red');

	expect(myMap.get('b')).toBeNull();
});

test('has: finds a key even if it is deep in a collision chain', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');

	expect(myMap.has('q')).toBe(true);
});

test('removes a single entry and returns true', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');

	expect(myMap.remove('apple')).toBe(true);
	expect(myMap.get('apple')).toBeNull();
});

test('removes the FIRST node in a collision chain and preserves the rest', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');

	expect(myMap.remove('a')).toBe(true);
	expect(myMap.get('q')).toBe('second');
});

test('removes a MIDDLE or LAST node in a collision chain', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');
	myMap.set('z', 'third');

	expect(myMap.remove('q')).toBe(true);
	expect(myMap.get('a')).toBe('first');
	expect(myMap.get('z')).toBe('third');
	expect(myMap.get('q')).toBeNull();
});

test('length: handles updates and removals correctly', () => {
	const myMap = hashMap();

	myMap.set('apple', 'red');
	myMap.set('banana', 'yellow');
	expect(myMap.length()).toBe(2);

	myMap.set('apple', 'green');
	expect(myMap.length()).toBe(2);

	myMap.remove('apple');
	expect(myMap.length()).toBe(1);

	myMap.remove('banana');
	expect(myMap.length()).toBe(0);
});

test('clear: removes all entries in the hashMap', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');
	myMap.set('z', 'third');

	myMap.clear();
	expect(myMap.length()).toBe(0);
});

test('returns an empty array when map is empty', () => {
	const myMap = hashMap();
	expect(myMap.keys()).toEqual([]);
});

test('returns all keys from various buckets', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');
	myMap.set('banana', 'yellow');
	myMap.set('carrot', 'orange');

	const result = myMap.keys();

	expect(result).toHaveLength(3);
	expect(result).toContain('apple');
	expect(result).toContain('banana');
	expect(result).toContain('carrot');
});

test('collects keys even from collision chains', () => {
	const myMap = hashMap();
	myMap.set('a', 'first');
	myMap.set('q', 'second');

	const result = myMap.keys();

	expect(result).toContain('a');
	expect(result).toContain('q');
	expect(result).toHaveLength(2);
});

test('returns an empty array when map is empty', () => {
	const myMap = hashMap();
	expect(myMap.values()).toEqual([]);
});

test('returns all values from the map', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');
	myMap.set('banana', 'yellow');
	myMap.set('carrot', 'orange');

	const result = myMap.values();

	expect(result).toHaveLength(3);
	expect(result).toContain('red');
	expect(result).toContain('yellow');
	expect(result).toContain('orange');
});

test('handles duplicate values for different keys', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');
	myMap.set('strawberry', 'red');

	const result = myMap.values();

	expect(result).toHaveLength(2);
	const redCount = result.filter((v) => v === 'red').length;
	expect(redCount).toBe(2);
});

test('collects values from collision chains', () => {
	const myMap = hashMap();
	// 'a' and 'q' collide at index 1
	myMap.set('a', 'first-value');
	myMap.set('q', 'second-value');

	const result = myMap.values();

	expect(result).toContain('first-value');
	expect(result).toContain('second-value');
});
