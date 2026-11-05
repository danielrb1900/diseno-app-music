// Validación del formulario de registro.
// Se carga con defer desde registro.html.

const formulario = document.getElementById("formulario-registro");

const inputNombre = document.getElementById("input-nombre");
const inputEmail = document.getElementById("input-email");
const inputPass = document.getElementById("input-pass");
const inputRepass = document.getElementById("input-repass");
const exito = document.getElementById("registro-exito");

if (formulario) {
  formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    comprobarNombre();
    comprobarEmail();
    comprobarContraseña();
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

function comprobarEmail() {
  limpiarError("error-email", inputEmail);

  if (!inputEmail.checkValidity()) {
    crearError("error-email", "Email no válido", inputEmail);
  }
}

function comprobarContraseña() {
  limpiarError("error-pass", inputPass);

  if (!inputPass.checkValidity()) {
    crearError("error-pass", "Contraseña no válida", inputPass);
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
