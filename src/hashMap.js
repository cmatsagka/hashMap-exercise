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
			if (current.key === key) return true;
			current = current.nextNode;
		}
		return false;
	};

	const remove = (key) => {
		const index = hash(key);
		let current = buckets[index];
		let previous = null;

		while (current !== null) {
			if (current.key === key) {
				if (previous === null) {
					buckets[index] = current.nextNode;
				} else {
					previous.nextNode = current.nextNode;
				}
				return true;
			}
			previous = current;
			current = current.nextNode;
		}
		return false;
	};

	const length = () => {
		let count = 0;
		for (let i = 0; i < buckets.length; i++) {
			if (buckets[i] !== null) {
				let current = buckets[i];
				while (current !== null) {
					count++;
					current = current.nextNode;
				}
			}
		}
		return count;
	};

	const clear = () => {
		buckets = new Array(capacity).fill(null);
		return buckets;
	};

	const keys = () => {
		let keysArray = [];

		for (let bucket of buckets) {
			let current = bucket;
			while (current) {
				keysArray.push(current.key);
				current = current.nextNode;
			}
		}
		return keysArray;
	};

	const values = () => {
		let valuesArray = [];

		for (let bucket of buckets) {
			let current = bucket;
			while (current) {
				valuesArray.push(current.value);
				current = current.nextNode;
			}
		}
		return valuesArray;
	};

	const entries = () => {
		let entriesArray = [];

		for (let bucket of buckets) {
			let current = bucket;
			while (current) {
				let entry = [current.key, current.value];
				entriesArray.push(entry);
				current = current.nextNode;
			}
		}
		return entriesArray;
	};

	return {
		hash,
		set,
		get,
		has,
		remove,
		length,
		clear,
		keys,
		values,
		entries,
		debug: () => buckets,
	};
}
