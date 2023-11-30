const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generarPregunta() {
  const operaciones = ["+", "-", "*", "/"];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operacion = operaciones[Math.floor(Math.random() * operaciones.length)];

  let pregunta;
  let respuestaCorrecta;

  if (operacion === "/") {
    pregunta = `¿Cuánto es ${num1 * num2} / ${num2}?`;
    respuestaCorrecta = num1;
  } else {
    pregunta = `¿Cuánto es ${num1} ${operacion} ${num2}?`;
    respuestaCorrecta = eval(`${num1} ${operacion} ${num2}`);
  }

  return { pregunta, respuestaCorrecta };
}

function pedirRespuesta(pregunta, callback) {
  rl.question(pregunta, (respuestaUsuario) => {
    callback(respuestaUsuario);
  });
}

function iniciarJuego(preguntasRestantes, puntaje) {
  if (preguntasRestantes === 0) {
    console.log(`Tu puntaje es ${puntaje} de 5.`);
    rl.close();
    return;
  }

  const { pregunta, respuestaCorrecta } = generarPregunta();
  pedirRespuesta(pregunta + " Tu respuesta: ", (respuestaUsuario) => {
    if (parseFloat(respuestaUsuario) === respuestaCorrecta) {
      console.log("¡Correcto!");
      iniciarJuego(preguntasRestantes - 1, puntaje + 1);
    } else {
      console.log(
        `Incorrecto. La respuesta correcta era ${respuestaCorrecta}.`
      );
      iniciarJuego(preguntasRestantes - 1, puntaje);
    }
  });
}

iniciarJuego(5, 0);
