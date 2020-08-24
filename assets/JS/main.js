//Función principal

//Falta entender/pensar llamado de funciones y pasaje de variables u orden de generación

const app = function () { 
var m2 = document.getElementById('metros2').value;
var tamb = '2';

    //Función de inicio
    function init () {
        setbtnMed();
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

    function setbtnChi () {
        document.getElementById('btnMed').classList.remove('is-info');
        document.getElementById('btnGde').classList.remove('is-info');
        document.getElementById('btnChi').classList.add('is-info');
        tamb = '1';
        GetValues(m2,tamb);
    }

    function setbtnMed () {
        document.getElementById('btnChi').classList.remove('is-info');
        document.getElementById('btnGde').classList.remove('is-info');
        document.getElementById('btnMed').classList.add('is-info');
        tamb = '2';
        GetValues(m2,tamb);
    }

    function setbtnGde () {
        document.getElementById('btnChi').classList.remove('is-info');
        document.getElementById('btnMed').classList.remove('is-info');
        document.getElementById('btnGde').classList.add('is-info');
        tamb = '3';
        GetValues(m2,tamb);
    }
    
    //Comunicación con API
    function GetValues (m2, tamb) {
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
        CTot = (Number(CTot)/1000000).toFixed(2);
        CUnit = (Number(CUnit)/1000).toFixed(2);
        document.getElementById('MontoTot').innerHTML = 'Total $ ' + CTot + ' millones';
        document.getElementById('UnitxM2').innerHTML = 'Unitario $ ' + CUnit + ' mil./m2';
        document.getElementById('MsgCostos').innerHTML = '¡Listo! los costos estimados para ' + m2 + 'm2 son...';
    }


    return {
		init: init
 	};

}();