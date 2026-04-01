# Custom Hash Map & Hash Set (JavaScript)

A from-scratch implementation of **HashMap** and **HashSet** data structures, built as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap) curriculum. This project focuses on hashing algorithms, handling collisions via **Separate Chaining**, and manual memory management through **Dynamic Resizing**.

---

## 🚀 Features

This implementation includes a full API for managing key-value pairs and unique keys:

### 📦 HashMap

- **`set(key, value)`**: Adds a new key-value pair. If the key exists, the value is updated.
- **`get(key)`**: Returns the value assigned to the key, or `null` if not found.
- **`has(key)`**: Returns `true` if the key exists in the map, otherwise `false`.
- **`remove(key)`**: Removes the entry at the given key and returns `true`. Returns `false` if the key wasn't found.
- **`length()`**: Returns the total number of keys currently stored.
- **`clear()`**: Removes all entries and resets the internal buckets.
- **`keys()`**: Returns an array containing all keys in the map.
- **`values()`**: Returns an array containing all values in the map.
- **`entries()`**: Returns an array of `[key, value]` pairs.

### 🎯 HashSet

- **`add(key)`**: Adds a unique key to the set.
- **`has(key)`**: Returns `true` if the key exists, otherwise `false`.
- **`keys()`**: Returns an array of all unique keys.

---

## ⚙️ Core Logic

- **Hashing Algorithm**: Uses a prime number multiplier (`31`) to generate consistent hash codes.
- **Separate Chaining**: Internal buckets are structured as **Linked Lists** to handle multiple keys hashing to the same index.
- **Load Factor & Growth**: Automatically monitors a **Load Factor of 0.75**. When the map becomes too crowded, it doubles the internal capacity and **re-hashes** all existing entries to ensure performance remains $O(1)$.

---

## 🛠️ Installation & Testing

This project uses **Babel** for ES6 module support and **Jest** for comprehensive unit testing of all edge cases (collisions, updates, and resizing).

1. **Clone the repo:**

    ```bash
    git clone git@github.com:cmatsagka/hashMap-exercise.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run tests:**
    ```bash
    npm test
    ```
