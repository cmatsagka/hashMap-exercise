export function hashMap() {
	const capacity = 16;
	let buckets = new Array(capacity).fill(null);

	const hash = (key) => {
		const primeNumber = 31;
		let hashCode = 0;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
		}

		return hashCode;
	};

	const set = (key, value) => {
		const index = hash(key);

		if (buckets[index] === null) {
			buckets[index] = { key, value, nextNode: null };
			return;
		}

		let current = buckets[index];

		while (current !== null) {
			if (current.key === key) {
				current.value = value;
				return;
			}
			if (current.nextNode === null) break;

			current = current.nextNode;
		}
		current.nextNode = { key, value, nextNode: null };
	};

	const get = (key) => {
		const index = hash(key);
		let current = buckets[index];

		while (current !== null) {
			if (current.key === key) return current.value;
			current = current.nextNode;
		}
		return null;
	};

	const has = (key) => {
		const index = hash(key);
		let current = buckets[index];

		while (current !== null) {
			if (current.key !== null) return true;
			current = current.nextNode;
		}
		return false;
	};

	const remove = (key) => {
		const index = hash(key);
		let current = buckets[index];

		while (current !== null) {
			if (current.key === key) {
				current = null;
				return true;
			}
			current = current.nextNode;
		}

		return false;
	};

	return {
		hash,
		set,
		get,
		has,
		remove,
		debug: () => buckets,
	};
}
