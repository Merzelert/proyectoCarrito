//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];//nuestro carrito vacio

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);//se ejecuta la funcion agregarCurso

    //Elimina cursos del carrito cuando se preciona la "X" del carrito
    carrito.addEventListener('click', eliminarCurso);//se ejecuta la funcion eliminarCurso

    //Vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el html
    })
}

//funciones

//agrega un item al carrito
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {//Nos aseguramos que de click en el boton "agragar carrito"
        const cursoSeleccionado = e.target.parentElement.parentElement; //para seleccionar toda la inf del curso
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){//aqui apuntamos a la X del carrito
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();// Iteramos sobre el carrito y lo mostramos de nuevo 
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion
function leerDatosCurso(curso) {
    // console.log(curso);
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,//sacando imagen de la etiqueta img
        titulo: curso.querySelector('h4').textContent,//sacando titulo de la etiqueta h4
        precio: curso.querySelector('.precio span').textContent,//sacando precio con descuento de la etiqueta .precio y etiqueta span 
        id: curso.querySelector('a').getAttribute('data-id'),//sacando el id de la etiqueta a, del atributo data-id
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado 
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else {
        //Agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];//Usamos el spread operator para agragar los items al carrito de forma que el carrito empieza vacio y en cada iteracion se va agregando un item mas
    }

    console.log(articulosCarrito);
    carritoHTML();//Imprimimos el html en el contenedor del carrito
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    //Limpiar el html previo para no tener duplicados
    limpiarHTML();

    //Recorre el carrito y genera el html
    articulosCarrito.forEach((curso) => {
        const row = document.createElement('tr');//creamos una fila en el contenedorCarrito (row)
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo} 
        </td>
        <td>
            ${curso.precio} 
        </td>
        <td>
            ${curso.cantidad} 
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
        </td>
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //Forma con una mejor velocidad para nuestra app 
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)//con removeChild ira limpiando los items previos para que no se dupliquen de forma mas eficiente
    }
}
