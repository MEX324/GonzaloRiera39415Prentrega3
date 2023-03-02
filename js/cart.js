document.addEventListener('DOMContentLoaded', () => {

    // Variables de Productos: Base de datos para que sean mas facil modificarlos
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Iymrith Doom of the Desert',
            precio: 25,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 50,
            imagen: './DIBUJOS/carta1.png'
        },
        {
            id: 2,
            nombre: 'Dragonlord Dromoka',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta2.png'
        },
        {
            id: 3,
            nombre: 'Dragonlord Ojutai',
            precio: 750,
            descuento: "-25%",
            Juego: "Magic The Gatering",
            precioAnterior: 1000,
            imagen: './DIBUJOS/carta3.png'
        },
        {
            id: 4,
            nombre: 'Risen Executioner',
            precio: 25,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 50,
            imagen: './DIBUJOS/carta4.png'
        },
        {
            id: 5,
            nombre: 'Dragonlord Atarka',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta5.png'
        },
        {
            id: 6,
            nombre: 'Sarulf, Realm Eater',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta6.png'
        },
        {
            id: 8,
            nombre: 'Be´lakor, The Dark Master',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta8.png'
        },
        {
            id: 7,
            nombre: 'Valki, God of Lies',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta7.png'
        },
        {
            id: 9,
            nombre: 'Tibalt, Cosmic Impostor',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta9.png'
        },
        {
            id: 10,
            nombre: 'Dragón del Puente Dorado',
            precio: 250,
            descuento: "-50%",
            Juego: "Magic The Gatering",
            precioAnterior: 500,
            imagen: './DIBUJOS/carta10.png'
        },
    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('productCard');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('productImage');
             // Descuento
            const miNodoDiscount = document.createElement('span');
             miNodoDiscount.classList.add('discountTag');
             miNodoDiscount.textContent = info.descuento;
            // Titulo
            const miNodoTitle = document.createElement('h2');
            miNodoTitle.classList.add('productName');
            miNodoTitle.textContent = info.nombre;
              // Titulo
            const miNodoBrand = document.createElement('P');
            miNodoBrand.classList.add('productBrand');
            miNodoBrand.textContent = info.Juego;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('productThumb');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('span');
            miNodoPrecio.classList.add('actualPrice');
            miNodoPrecio.textContent = `${info.precioAnterior}${divisa}`;
            // Precio Original
            const miNodoPrecioOriginal = document.createElement('span');
            miNodoPrecioOriginal.classList.add('price');
            miNodoPrecioOriginal.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('compraBtn');
            miNodoBoton.textContent = "Comprar";
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            const miNodoVermas = document.createElement('button');
            miNodoVermas.classList.add('cardBtn');
            miNodoVermas.innerHTML = '<a href="./product.html">Ver Producto</a>';
            // Body Info
            const miNodoCardInfo = document.createElement('div');
            miNodoCardBody.classList.add('.productInfo');
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardInfo.appendChild(miNodoTitle);
            miNodoCardInfo.appendChild(miNodoBrand);
            miNodoCardInfo.appendChild(miNodoPrecioOriginal);
            miNodoCardInfo.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(miNodoVermas);
            miNodoCardBody.appendChild(miNodoDiscount);
            miNodo.appendChild(miNodoCardBody);
            miNodo.appendChild(miNodoCardInfo);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

});
