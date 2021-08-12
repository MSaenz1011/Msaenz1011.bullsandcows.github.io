
// Variable para el número Aleatorio
let numeroAleatorio = '0';

//Función que genera el número aleatorio
function generadorNumber() {
    let randomNum1 = Math.floor(Math.random() * 9);
    let randomNum2;
    let randomNum3;
    let randomNum4;

    do {
        randomNum2 = Math.floor(Math.random() * 9);
    } while (randomNum2 === randomNum1);

    do {
        randomNum3 = Math.floor(Math.random() * 9);
    } while (randomNum3 === randomNum1 || randomNum3 === randomNum2);

    do {
        randomNum4 = Math.floor(Math.random() * 9);
    } while (randomNum4 === randomNum1 || randomNum4 === randomNum2 || randomNum4 === randomNum3);

    let num1 = randomNum1.toString();
    let num2 = randomNum2.toString();
    let num3 = randomNum3.toString();
    let num4 = randomNum4.toString();

    return num1 + num2 + num3 + num4;
}

//Verifica el número que el usuario ingresó

function verifyUserNum(numero) {
    let numstr = numero.toString()
    for (let i = 0; i < numstr.length; i++) {
        for (let j = 0; j < numstr.length; j++) { 
            if (numstr[i] === numstr[j] && i != j) {
                return false
            }
        }
    }
    return true
}

//El disparador del evento y sus respectivos callbacks (Main event)
$(document).ready(function () {
    $('#usernumber').keypress(function (e) {
        if (e.which === 13) {
            if (numeroAleatorio === '0') {
                numeroAleatorio = generadorNumber()
                console.log(numeroAleatorio)
            }
            checkNumber();
        }
    })

})

//Chequea si el número cumple con los requisitos 
function checkNumber() {
    let numeroUsuario = $('#usernumber').val()
    if (numeroUsuario.length != 4) {
        $('.seccion').addClass('danger')
    }
    else {
        $('.seccion').removeClass('danger')
        let verificador = verifyUserNum(numeroUsuario)
        if (verificador === false) {
            $('.repeat').addClass('danger')
        }
        else {
            $('.repeat').removeClass('danger')
            
            
            resultados = playGame(numeroUsuario);
            const tablita =
                `<tr class="text-center">` +
                `<td>${numeroUsuario}</td>` +
                `<td>${resultados[0]}</td>` +
                `<td>${resultados[1]}</td>` +
                `</tr>`
            $('.tabla').append(tablita);
            console.log('Fijas: ' + resultados[0] + ' ; ' + 'Picas: ' + resultados[1])
            
            //Reiniciador del juego
            if (resultados[0] === 4) {
                $('.tabla').html('')
                numeroAleatorio='0';
                alert('GANASTE!!!!!')
            }
        }
    }
}

//El actual juego
function playGame(numeroUsuario) {
    let picas = 0;
    let fijas = 0;

    for (let i = 0; i < numeroAleatorio.length; i++) {
        for (let j = 0; j < numeroUsuario.length; j++) {
            if (numeroUsuario[i] === numeroAleatorio[j]) {
                if (i === j) {
                    fijas++
                } else {
                    picas++
                }
            }
        }
    }
    $('#usernumber').val('')
    return [fijas, picas];
}




