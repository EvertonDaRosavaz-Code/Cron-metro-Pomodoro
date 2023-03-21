//Variaveis globais
let minutos = 25; //Inicia com 25 min
let segundos = 0; // Inicia com 00 segundos
let Ciclo = 0;
let Pausa = true;
let timerClear;
let numPausa = 1;
let onlyRunOnce = false;

function NotificationWindow(parametrotext) {
    if(Notification.permission === 'granted'){
            new Notification(parametrotext, {
            icon: 'https://cdn-icons-png.flaticon.com/512/6874/6874397.png',
            body:'Sua notificação'
       })
    }
    
    else if(Notification.permission !== 'denied'){
        Notification.requestPermission(
            function (permission) {
                if(permission === 'granted'){
                    new Notification(parametrotext,{
                      icon: 'https://cdn-icons-png.flaticon.com/512/6874/6874397.png',
                      body:'Sua notificação'
                    })
                }
            }
        )
    }
}
   
window.onload = async () =>{
    document.getElementById('minutos').innerHTML =String(minutos).padStart(2, '0');   
    document.getElementById('segundos').innerHTML =String(segundos).padStart(2,'0'); 
    document.getElementById('TextCilcos').innerHTML = `Total de ciclos de estudo: ${Ciclo}`;
    document.getElementById('aviso').innerHTML = 'Pronto para estudar ?';
}

document.getElementById('ButtonStar').onclick = () =>{
    Check() ; 
}

function Check (){
    if(onlyRunOnce === false){
        Start(); 
        onlyRunOnce = true;
    }
}
function Start () {  
    document.getElementById('aviso').innerHTML = 'Em andamento';
    function timerFunction () {
        segundos --;
        if(Ciclo <= 4){
           if(segundos === 0 && minutos === 0){
                if(Pausa === true && numPausa == 4){
                    minutos = 15; // pause de 15 min
                    segundos = 0;
                    Ciclo++;
                    numPausa = 1;
                    document.getElementById('TextCilcos').innerHTML = `Total de ciclos de estudo: ${Ciclo}`;
                    document.getElementById('aviso').innerHTML = 'Tire uma pausa de 15 min';
                    console.log('Pausa de 15 minutos');
                    clearInterval(timerClear);
                    onlyRunOnce = false;
                    Pausa = false;
                    NotificationWindow('Termine esse ultimo Ciclo')
                }
                else if(Pausa === true){
                    minutos = 5; // pause de 5 min
                    segundos = 0;
                    Ciclo++;
                    numPausa++;
                    document.getElementById('TextCilcos').innerHTML = `Total de ciclos de estudo: ${Ciclo}`;
                    document.getElementById('aviso').innerHTML = 'Tire uma pausa de 5 min';
                    console.log('Pausa de cinco minutos');
                    clearInterval(timerClear);
                    onlyRunOnce = false;
                    Pausa = false;
                    console.log(numPausa);
                    NotificationWindow('Pausa de 5 minutos')
                }
                else{
                    minutos = 25; // Retornar a 25 minutos
                    segundos = 0; // Retorna a 00 segundos
                    document.getElementById('aviso').innerHTML = 'Ora de estudar';
                    Pausa = true;
                    NotificationWindow('Volte aos estudos')
                    clearInterval(timerClear);
                    onlyRunOnce = false;
                }
            }
        }

        if(Ciclo == 5){
            Ciclo = 0
        }
        
        if(segundos <= 0){//Decrementar os minutos após os segundos chegar a zero
            minutos--;
            segundos = 59;
        }
        document.getElementById('minutos').innerHTML =String(minutos).padStart(2, '0');   
        document.getElementById('segundos').innerHTML =String(segundos).padStart(2,'0') ;
    }
    timerClear = setInterval(timerFunction, 1000);
}
//Botão Stop
//document.getElementById('ButtonStop').onclick = 
function StopBtn(){
    clearInterval(timerClear);
    onlyRunOnce = false;
};