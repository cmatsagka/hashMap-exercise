import { hashMap } from './hashMap.js';

test('hash: returns a consistent index within bounds', () => {
	const myMap = hashMap();
	const index = myMap.hash('apple');

	expect(index).toBeGreaterThanOrEqual(0);
	expect(index).toBeLessThan(16);

	expect(myMap.hash('apple')).toBe(index);
});

test('set: stores a value that can be retrieved', () => {
	const myMap = hashMap();
	myMap.set('apple', 'red');

	const index = myMap.hash('apple');
	expect(myMap.debug()[index].value).toBe('red');
});
