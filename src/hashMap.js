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

		let previous = buckets[index];
		let tmp = previous.nextNode;

		while (tmp !== null) {
			previous = tmp;
			tmp = tmp.nextNode;
		}
		previous.nextNode = { key, value, nextNode: null };
		return;
	};

	return {
		hash,
		set,
		debug: () => buckets,
	};
}
