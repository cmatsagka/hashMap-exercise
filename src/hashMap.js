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

	return { hash };
}
