let sumar = document.getElementById("mas");
let restar = document.getElementById("menos");
let contador = document.getElementById("contador");
let prevValue;


function calcular() {
  var value = contador.value;
  var isValid = /^[1-9][0-9]*$/.test(value);

  if (!isValid) {
          contador.value = prevValue;
        } else {
          prevValue = value;
        }
}

      sumar.onclick = function() {
        contador.value = Number(contador.value) + 1;
        calcular();
      };

      restar.onclick = function() {
        contador.value = Number(contador.value) - 1;
        calcular();
      };

      contador.onchange = function() {
        calcular();
      };

      contador.onkeyup = function() {
        if (contador.value === "") {
          return;
        }
        calcular();
      };

      calcular();