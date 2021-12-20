const getData = (str) => {
    return fetch(
        `https://test-88c6a-default-rtdb.firebaseio.com/goods.json?${str ? `search=${str}` : ''}`
        )
    .then(response => response.json())
}

export default getData;