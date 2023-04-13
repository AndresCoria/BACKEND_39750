const socket = io()

const dataForm = document.querySelector('#formDelete')
const id = document.querySelector('#deleteProd')

dataForm.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('client:productDelete', {
        id: id.value
    })
})
socket.on('newList', data => {
    if(data.status === 'error'){
        Swal.fire({
            title: 'Product not Found',
            text: 'Enter another id',
            icon: 'error'
        })
    }
    let tablaHTML = ''
    let sarasa= ''
    for (let i = 0; i < data.length; i++) {
        let sarasa = [
        // tablaHTML = '<tr>',
        tablaHTML = `<td>${data[i].id}</td>`,
        tablaHTML = `<td>${data[i].title}</td>`,
        tablaHTML = `<td>${data[i].price}</td>`,
        tablaHTML = `<td>${data[i].code}</td>`,
        tablaHTML = `<td>${data[i].stock}</td>`,
        tablaHTML = `<td>${data[i].category}</td>`,
        tablaHTML = `<td>${data[i].description}</td>`,
        tablaHTML = `<td>${data[i].status}</td>`,
        tablaHTML = `<td><img class="img" src="${data[i].thumbnail}" alt="imagen del producto" /></td>`
        // tablaHTML = '</tr>'
        ]
        console.log(sarasa);
    }
    // Actualizar la tabla en la página HTML

    document.getElementById('tableProduct').innerHTML = sarasa
})
