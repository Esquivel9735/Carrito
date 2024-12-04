require('@testing-library/jest-dom'); // para las aserciones extendidas
const { ready } = require('./carrito'); // Importa la función lista para inicializar el carrito

// Simulamos la ventana para capturar alertas
window.alert = jest.fn();

beforeEach(() => {
  
    document.body.innerHTML = `
        <section>
            <div class="carrito">
                <div class="carrito-items"></div>
                <span class="carrito-precio-total">$0,00</span>
                <button class="btn-pagar">Pagar <i class="fa-solid fa-bag-shopping"></i></button>
            </div>
        </section>
        <div class="contenedor-items">
            <div class="item">
                <span class="titulo-item">Producto 1</span>
                <span class="precio-item">$100.00</span>
                <img class="img-item" src="image.jpg" />
                <button class="boton-item">Agregar al carrito</button>
            </div>
        </div>
    `;    
    ready();
});

test('El botón de pagar se activa', () => {
    const buttonPagar = document.getElementsByClassName('btn-pagar')[0];
    expect(buttonPagar).toBeTruthy(); // Verifica que el botón exista
});

test('El carrito se vuelve visible al agregar un artículo', () => {
    const buttonAgregar = document.getElementsByClassName('boton-item')[0];
    buttonAgregar.click(); // Simula el clic en el botón "Agregar al carrito"

    const carrito = document.getElementsByClassName('carrito')[0];
    expect(carrito.style.opacity).toBe('1'); // Verifica que el carrito sea visible
});

test('Actualizar total al agregar un artículo', () => {
    const buttonAgregar = document.getElementsByClassName('boton-item')[0];
    buttonAgregar.click(); // Simula el clic en el botón "Agregar al carrito"

    const total = document.getElementsByClassName('carrito-precio-total')[0].innerText;
    expect(total).toBe('$100.00'); // Verifica que el total sea el correcto
});

test('Eliminar un artículo del carrito', () => {
    const buttonAgregar = document.getElementsByClassName('boton-item')[0];
    buttonAgregar.click(); // Agrega un artículo
    const buttonEliminar = document.getElementsByClassName('btn-eliminar')[0];
    buttonEliminar.click(); // Elimina el artículo

    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    expect(carritoItems.children.length).toBe(0); 
});

test('El botón de pagar muestra un mensaje y vacía el carrito', () => {
    const buttonAgregar = document.getElementsByClassName('boton-item')[0];
    buttonAgregar.click(); 

    const buttonPagar = document.getElementsByClassName('btn-pagar')[0];
    buttonPagar.click(); 

    expect(window.alert).toHaveBeenCalledWith('Gracias por la compra'); 
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    expect(carritoItems.children.length).toBe(0); 
});
