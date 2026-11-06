// Validación del formulario de registro e inicio de sesión.

// Variables de formulario de registro
const formulario = document.getElementById("formulario-registro");

const inputNombre = document.getElementById("input-nombre");
const inputEmail = document.getElementById("input-email");
const inputPass = document.getElementById("input-pass");
const inputRepass = document.getElementById("input-repass");
const exito = document.getElementById("registro-exito");


// Variables de formulario de inicio de sesión
const formularioInicioSesion = document.getElementById("formulario-inicio-sesion");

const inputEmailInicio = document.getElementById("input-email-inicio");
const inputPassInicio = document.getElementById("input-pass-inicio");
const exitoInicio = document.getElementById("inicio-exito");

// Validación del formulario de registro
if (formulario) {
  formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    comprobarNombre();
    comprobarEmail("registro");
    comprobarContraseña("registro");
    comprobarContraseñaRepetida();

    const primerError = formulario.querySelector(".is-invalid");

    if (exito) {
      exito.hidden = Boolean(primerError);
      exito.textContent = primerError ? "" : "Registro completado correctamente.";
    }

    if (primerError) {
      primerError.focus();
    }
  });
}

// Validación del formulario de inicio de sesión
if (formularioInicioSesion) {
  formularioInicioSesion.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    comprobarEmail("inicio-sesión");
    comprobarContraseña("inicio-sesión")

    const primerError = formularioInicioSesion.querySelector(".is-invalid");

    if (exitoInicio) {
      exitoInicio.hidden = Boolean(primerError);
      exitoInicio.textContent = primerError ? "" : "Sesión iniciada correctamente.";
    }

    if (primerError) {
      primerError.focus();
    }

  });
}

function crearError(id, texto, input) {
  const mensajeError = document.createElement("div");
  mensajeError.id = id;
  mensajeError.className = "invalid-feedback";
  mensajeError.setAttribute("role", "alert");
  mensajeError.textContent = texto;

  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  input.insertAdjacentElement("afterend", mensajeError);
}

function limpiarError(id, input) {
  const mensajeError = document.getElementById(id);

  if (mensajeError) {
    mensajeError.remove();
  }

  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
}

function comprobarNombre() {

  limpiarError("error-nombre", inputNombre);

  if (!inputNombre.checkValidity()) {
    crearError("error-nombre", "Nombre no válido", inputNombre);
  }
}

function comprobarEmail(tipoFormulario) {

  if (tipoFormulario === "registro") {
    limpiarError("error-email", inputEmail);

    if (!inputEmail.checkValidity()) {
      crearError("error-email", "Email no válido", inputEmail);
    }
  } else {
    limpiarError("error-email", inputEmailInicio);

    if (!inputEmailInicio.checkValidity()) {
      crearError("error-email", "Email no válido", inputEmailInicio);
    }
  }


}

function comprobarContraseña(tipoFormulario) {

  if (tipoFormulario === "registro") {
    limpiarError("error-pass", inputPass);

    if (!inputPass.checkValidity()) {
      crearError("error-pass", "Contraseña no válida", inputPass);
    }
  } else {
    limpiarError("error-pass", inputPassInicio);

    if (!inputPassInicio.checkValidity()) {
      crearError("error-pass", "Contraseña no válida", inputPassInicio);
    }
  }


}

function comprobarContraseñaRepetida() {
  limpiarError("error-repass", inputRepass);
  limpiarError("error-repass2", inputRepass);

  if (!inputRepass.checkValidity()) {
    crearError(
      "error-repass",
      "Debes volver a introducir la contraseña",
      inputRepass
    );
  } else if (inputPass.value !== inputRepass.value) {
    crearError(
      "error-repass2",
      "Las contraseñas no coinciden",
      inputRepass
    );
  }
}
