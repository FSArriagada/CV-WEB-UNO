window.addEventListener('load', main);

function main() {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const salario = document.getElementById("salario");
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
                mensaje: mensajeValue
            });

            let th = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.innerText = datosForm.length;
            let td1 = document.createElement('td');
            td1.innerText = nameValue;
            let td2 = document.createElement('td');
            td2.innerText = salarioValue;
            let td3 = document.createElement('td');
            td3.innerText = Math.round(salarioValue / 486);
            let td4 = document.createElement('td');
            td4.innerText = Math.round(salarioValue / 528);

            let tr = document.createElement('tr');

            let appendedTr = tbody.appendChild(tr);

            appendedTr.appendChild(th);
            appendedTr.appendChild(td1);
            appendedTr.appendChild(td2);
            appendedTr.appendChild(td3);
            appendedTr.appendChild(td4);
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
}

