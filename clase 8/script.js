var respuestas = new Array();

var reloj={
	idDestino:"reloj",
 
    mostrar:function()
    {
        if (reloj.segundos>0)
        {
            reloj.segundos--;
            if (reloj.segundos < 0)
            {
                reloj.segundos=59;
                reloj.minutos--;
            }
 
            var string=reloj.doscaracteres(reloj.segundos);
            document.getElementById(reloj.idDestino).innerHTML = string;
        }
    },
 
    iniciar:function()
    {
        setInterval(reloj.mostrar, 1000);
    },
 
    doscaracteres:function(numero)
    {
        if(String(numero).length==1)
            return "0"+numero;
        return numero;
    },

}

function tiempo() {
	for (var t = 0; t<4; t++) {
		i=Math.floor((Math.random() * 10) + 1);
		j=Math.floor((Math.random() * 10) + 1);
		k=Math.floor((Math.random() * 10) + 1);
		document.getElementById(i).style.background = "red";
		document.getElementById(j).style.background = "red";
		document.getElementById(k).style.background = "red";
		respuestas[0]=i
		respuestas[1]=j
		respuestas[2]=k
		console.table(respuestas);
		document.getElementById('btn-iniciar').disabled = true;
	}
}

function contar()
{
	if (reloj.segundos==0) {
		document.getElementByClassName('int').style.background="white";
	}
}