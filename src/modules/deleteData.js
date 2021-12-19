const deleteData = (id) => {
    return fetch('https://test-88c6a-default-rtdb.firebaseio.com/goods.json'+`/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
}

export default deleteData;