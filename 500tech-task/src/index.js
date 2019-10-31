/*
Implement a cache mechanism.

It should be able to get, set and remove entries using the provided api below.
In addition, we can provide the cache with the max amount of keys we want to store.

If the cache is full when trying to set a key you should do the following:
  1. Remove the most oudated key (the first key that entered the cache)
  2. Save the new key with the value you received.

See usage examples at the bottom of this file.
*/

class Cache {
  constructor(maxKeys) {
    // The cache will store up to maxKeys entries
    this.maxKeys = maxKeys;
    this.cache = new Map();
  }

  get(key) {
    // retrieves value from cache by key
    return this.cache.get(key);
  }

  getOr(key, fallback) {
    // retrieves value from cache by key
    // if value is undefined return the fallback
    return this.cache.get(key) || fallback;
  }

  set(key, value) {
    // stores the value in the cache
    // If the number of entries exceeds 'maxKeys' - remove the most outdated one
    if (!this.cache.has(key) && this.cache.size >= this.maxKeys) {
      let iter = this.cache.keys();
      this.cache.delete(iter.next().value);
    }
    this.cache.set('key', value);
  }

  clear(key) {
    // removes the entry with this key
    this.cache.delete(key);
  }
}

/*
 This code should run and return the expected result
 written as a comment at the end of each row.
*/

const cache = new Cache(100);

cache.get('key'); // returns undefined
cache.getOr('key', 10); // returns 10
cache.set('key', 20); // returns 20
cache.get('key');// returns 20
cache.clear('key');// returns undefined
cache.get('key'); // returns undefined
