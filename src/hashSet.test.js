import { hashSet } from './hashSet.js';

test('HashSet: adds keys and prevents duplicates', () => {
	const mySet = hashSet();
	mySet.add('apple');
	mySet.add('apple');

	expect(mySet.length()).toBe(1);
	expect(mySet.has('apple')).toBe(true);
});

test('HashSet: removes keys correctly', () => {
	const mySet = hashSet();
	mySet.add('apple');
	mySet.remove('apple');

	expect(mySet.has('apple')).toBe(false);
	expect(mySet.length()).toBe(0);
});
