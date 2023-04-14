const socket = io()

const dataForm = document.querySelector('#formDelete')
const id = document.querySelector('#deleteProd')
const addForm = document.querySelector('#addProduct')


dataForm.addEventListener('submit', evt => {
    evt.preventDefault()
    console.log('log linea 63', socket.id);
    console.log(typeof socket.id);
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this product.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, enviamos la petición al servidor para eliminar el producto
            socket.emit('client:productDelete', {
                id: id.value,
                cid: cid.value
            })
            console.log(id.value)
            console.log(cid)
        }
    })
})

socket.on('newList', data => {
    if(data.status === 'error'){
        Swal.fire({
            title: 'Product not Found',
            text: 'Enter another id',
            icon: 'error'
        })
        return {status: 'error', mesage: 'Product not found'}
    }
    let list
    data.forEach(({id, title, price, code, stock, category, description, status, thumbnail}) => {
        list +=`
        <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${code}</td>
        <td>${stock}</td>
        <td>${category}</td>
        <td>${description}</td>
        <td>${status}</td>
        <td><img
            class="img"
            src="${thumbnail}"
            alt="imagen del producto"
            /></td>
        </tr>`
    })
    const listAct = `
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">code</th>
            <th scope="col">stock</th>
            <th scope="col">category</th>
            <th scope="col">description</th>
            <th scope="col">status</th>
            <th scope="col">thumbnail</th>
            </tr>` + list
    document.getElementById('tableProduct').innerHTML = listAct
    Swal.fire({
        title: 'Removed product',
        timer: 5000,
        icon: 'success'
    })
})