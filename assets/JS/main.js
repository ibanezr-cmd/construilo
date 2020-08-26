//Función principal

//Falta entender/pensar llamado de funciones y pasaje de variables u orden de generación

const app = function () { 
var m2 = document.getElementById('metros2').value;
var tamb = '2';

    //Función de inicio
    function init () {
        document.getElementById('btnChi').classList.remove('is-info');
        document.getElementById('btnGde').classList.remove('is-info');
        document.getElementById('btnMed').classList.add('is-info');
        tamb = '2';
    }

// Lógica de eventos de usuario
    //Fijar el valor de m2 ingresados y agregar " m2"
    const inpm2 = document.getElementById('metros2');
    inpm2.addEventListener('change', SumUnid);

    function SumUnid() {
        const nvom2 = document.getElementById('metros2');
        m2 = document.getElementById('metros2').value;
        nvom2.value = m2 + ' m2';
        GetValues(m2,tamb);
    }

    //Fijar el botón seleccionado de Chi/Med/Gde
    const btnChi = document.getElementById('btnChi');
    const btnMed = document.getElementById('btnMed');
    const btnGde = document.getElementById('btnGde');

    btnChi.addEventListener('click', setbtnChi);
    btnMed.addEventListener('click', setbtnMed);
    btnGde.addEventListener('click', setbtnGde);

    function mensaje(mensaje) {
        setTimeout(function(){
            document.getElementById('MsgCostos').innerHTML = mensaje;
        }, 50);
    }

    function setbtnChi () {
        mensaje('Calculando...');
        document.getElementById('btnMed').classList.remove('is-info');
        document.getElementById('btnGde').classList.remove('is-info');
        document.getElementById('btnChi').classList.add('is-info');
        tamb = '1';
        GetValues(m2,tamb);
    }

    function setbtnMed () {
        mensaje('Calculando...');
        document.getElementById('btnChi').classList.remove('is-info');
        document.getElementById('btnGde').classList.remove('is-info');
        document.getElementById('btnMed').classList.add('is-info');
        tamb = '2';
        GetValues(m2,tamb);
    }

    function setbtnGde () {
        mensaje('Calculando...');
        document.getElementById('btnChi').classList.remove('is-info');
        document.getElementById('btnMed').classList.remove('is-info');
        document.getElementById('btnGde').classList.add('is-info');
        tamb = '3';
        GetValues(m2,tamb);
    }
    
    //Comunicación con API
    function GetValues (m2, tamb) {
        if (m2 !== null && m2 !== '') { 
            fetch(SetUrl (m2, tamb))
            .then(response => response.json())
            //.then(json => console.log(json))
            .then((json) => {
                if (json.status !== 'success') {
                    console.log('error de consulta..')
                }
                console.log(json);
                ShowMontos (json.CostTot, json.CostUnit);   
            })
        } else { 
            alert('¡Ingresa los m2!');
            mensaje('Ingresa los m2...');
        }
    }

    //Adecuo la URL de consulta
    function SetUrl (m2, tamb) {
        let url = 'https://script.google.com/macros/s/AKfycbxmitF_5OyizoDUTN7I2C4VaXtioHQGKUQdImzxu17j4eQDcIAm/exec?key=abcdef';
        url += '&m2=' + m2;
        url += '&tamb=' + tamb;
        return url;
    }

    //Muestros los datos consultados en la API
    function ShowMontos (CTot, CUnit) {
        mensaje('Calculando...');
        CTot = (Number(CTot)/1000000).toFixed(2);
        CUnit = (Number(CUnit)/1000).toFixed(2);
        document.getElementById('MontoTot').innerHTML = 'Total $ ' + CTot + ' millones';
        document.getElementById('UnitxM2').innerHTML = 'Unitario $ ' + CUnit + ' mil. por m2';
        mensaje('¡Listo! los costos estimados para ' + m2 + 'm2 son...');
    }


    return {
		init: init
 	};

}();