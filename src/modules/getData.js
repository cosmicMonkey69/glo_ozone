const getData = () => {
    return fetch('https://test-88c6a-default-rtdb.firebaseio.com/goods.json')
    .then(response => response.json())
}

export default getData;