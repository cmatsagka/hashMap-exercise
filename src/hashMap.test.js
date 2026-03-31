import { hashMap } from './hashMap.js';

test('hash: returns a consistent index within bounds', () => {
	const myMap = hashMap();
	const index = myMap.hash('apple');

	expect(index).toBeGreaterThanOrEqual(0);
	expect(index).toBeLessThan(16);

	expect(myMap.hash('apple')).toBe(index);
});
