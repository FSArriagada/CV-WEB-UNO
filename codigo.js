window.addEventListener('load', main);

function main() {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const salario = document.getElementById("salario");
    const pais = document.getElementById("pais")
    const mensaje = document.getElementById("mensaje");
    const tbody = document.getElementById("tbody");

    let datosForm = [];
    let esValido = false;


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const correoValue = correo.value;
        const correoError = correo.nextElementSibling;

        const nameValue = nombre.value;
        const nameError = nombre.nextElementSibling;

        const salarioValue = salario.value;
        const salarioError = salario.nextElementSibling;
        
        const paisValue = pais.value;

        const mensajeValue = mensaje.value;
        const mensajeError = mensaje.nextElementSibling;

        if (correoValue === '') {
            correo.classList.add('error');
            showError(correo, '* Completa este campo');
        }
        if (correoError && correoError.classList.contains('text-error')) {
            correoError.remove();
        }

        if (nameValue === '') {
            nombre.classList.add('error');
            showError(nombre, '* Completa este campo');
        }
        if (nameError && nameError.classList.contains('text-error')) {
            nameError.remove();
        }

        if (salarioValue === '') {
            salario.classList.add('error');
            showError(salario, '* Completa este campo');
        }
        if (salarioError && salarioError.classList.contains('text-error')) {
            salarioError.remove();
        }

        if (mensajeValue === '') {
            mensaje.classList.add('error');
            showError(mensaje, '* Completa este campo');
        }
        if (mensajeError && mensajeError.classList.contains('text-error')) {
            mensajeError.remove();
        }

        if (esValido) {
            datosForm.push({
                nombre: nameValue,
                correo: correoValue,
                salario: salarioValue,
                pais: paisValue,
                mensaje: mensajeValue
            });

            let th = document.createElement('th');
            th.setAttribute('scope', 'row');
            let td1 = document.createElement('td');
            td1.innerText = nameValue;
            let td2 = document.createElement('td');
            td2.innerText = correoValue;
            let td3 = document.createElement('td');
            td3.innerText = paisValue;
            let td4 = document.createElement('td');
            td4.innerText = salarioValue;
            let td5 = document.createElement('td');
            td5.innerText = Math.round(salarioValue / 486);
            let td6 = document.createElement('td');
            td6.innerText = Math.round(salarioValue / 528);

            let tr = document.createElement('tr');

            let appendedTr = tbody.appendChild(tr);

            appendedTr.appendChild(td1);
            appendedTr.appendChild(td2);
            appendedTr.appendChild(td3);
            appendedTr.appendChild(td4);
            appendedTr.appendChild(td5);
            appendedTr.appendChild(td6);
            alert('Formulario enviado correctamente');
        } else {
            alert('Corrige los campos para enviar el formulario.');
        }
    });

    correo.addEventListener('input', (e) => {
        const correoRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const correoValue = correo.value;

        const existingError = correo.nextElementSibling;
        if (existingError && existingError.classList.contains('text-error')) {
            existingError.remove();
        }

        if (correoValue === '') {
            correo.classList.add('error');
            showError(correo, '* Completa este campo');
        } else if (!correoRegex.test(correoValue)) {
            correo.classList.add('error');
            showError(correo, '* Formato inválido');
        } else {
            correo.classList.remove('error');
            hideError(correo);
        }
    });

    nombre.addEventListener('input', (e) => {
        const nameRegex = /^[a-z ,.'-]+$/i;
        const nameValue = nombre.value;

        const existingError = nombre.nextElementSibling;
        if (existingError && existingError.classList.contains('text-error')) {
            existingError.remove();
        }

        if (nameValue === '') {
            nombre.classList.add('error');
            showError(nombre, '* Completa este campo');
        } else if (!nameRegex.test(nameValue)) {
            nombre.classList.add('error');
            showError(nombre, '* Formato inválido');
        } else {
            nombre.classList.remove('error');
            hideError(nombre)
        }
    });

    salario.addEventListener('input', (e) => {
        const salarioValue = salario.value;

        const existingError = salario.nextElementSibling;
        if (existingError && existingError.classList.contains('text-error')) {
            existingError.remove();
        }

        if (isNaN(salarioValue)) {
            salario.classList.add('error');
            showError(salario, 'Formato inválido');
        } else if (salarioValue < 150000) {
            salario.classList.add('error');
            showError(salario, 'Salario muy bajo');
        } else {
            salario.classList.remove('error');
            hideError(salario);
        }
    });


    function showError(element, errormensaje) {
        const error = document.createElement('p');
        error.classList.add('text-error');
        error.innerText = errormensaje;
        element.insertAdjacentElement('afterend', error);
        esValido = false;
    }

    function hideError(element) {
        const error = element.nextElementSibling;
        if (error && error.classList.contains('text-error')) {
            error.remove();
        };
        esValido = true;
    }

    function ordenarTabla(e) {
        
        const indiceColumna = Array.from(e.target.parentNode.children).indexOf(e.target);
        const filas = tbody.getElementsByTagName('tr');
        const filasArray = Array.from(filas);

        filasArray.sort((a, b) => {
            const valorA = a.getElementsByTagName('td')[indiceColumna].innerText.toLowerCase();
            const valorB = b.getElementsByTagName('td')[indiceColumna].innerText.toLowerCase();
            return valorA.localeCompare(valorB);
        });

        // Si el th clickeado tiene la clase "ascendente", invertir el orden del array de filas para ordenar de forma descendente
        if (e.target.classList.contains('ascendente')) {
            filasArray.reverse();
            e.target.classList.remove('ascendente');
            e.target.classList.add('descendente');
        } else {
            e.target.classList.remove('descendente');
            e.target.classList.add('ascendente');
        }

        // Eliminar las filas existentes en la tabla
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Agregar las filas ordenadas a la tabla
        filasArray.forEach((fila) => {
            tbody.appendChild(fila);
        });
    }

    const ths = tbody.getElementsByTagName('th');
    Array.from(ths).forEach((th) => {
        th.addEventListener('click', ordenarTabla);
    });

}