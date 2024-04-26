function fetchData(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    xhr.send();
  });
}

function* asyncTask() {
  const ids = [1, 2, 3, 4, 5]; // Array of IDs to fetch
  for (const id of ids) {
    try {
      const data = yield fetchData(id);
      console.log(`Fetched data for ID ${id}:`, data);
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
    }
  }
}

function run(generator) {
  const iterator = generator();
  console.log(`iterator is: ${JSON.stringify(iterator)}`);
  function iterate(iterator, value,count) {
    const result = iterator.next(value);;

    if (result.done) return result.value;
    
    return Promise.resolve(result.value)
      .then((val) => {

        console.log(`Promise resolver coming inside this with count is ${count}`);
        return iterate(iterator, val,count+1)})
      .catch((err) => iterator.throw(err));
  }

  return iterate(iterator,count);
}

run(asyncTask);
