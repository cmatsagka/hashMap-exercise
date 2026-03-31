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
	// expect(myMap.get('b')).toBe('second');
});

test('get: returns null if the the key is not found', () => {
	const myMap = hashMap();
	myMap.set('a', 'red');

	expect(myMap.get('b')).toBeNull();
});
