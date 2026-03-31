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

test('set: handles collisions by chaining nodes (Separate Chaining)', () => {
	const myMap = hashMap();

	myMap.set('a', 'first');
	myMap.set('q', 'second');

	const index = myMap.hash('a');
	const bucket = myMap.debug()[index];

	expect(bucket.key).toBe('a');
	expect(bucket.value).toBe('first');

	expect(bucket.nextNode).not.toBeNull();
	expect(bucket.nextNode.key).toBe('q');
	expect(bucket.nextNode.value).toBe('second');
});
