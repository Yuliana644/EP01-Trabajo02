var arreglo = [];
var simbo = ["+","-","*"];
var select = selector;
    for (var i = 0; i<= 9; i++)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

 function mostrar (ent,ent2) {
 	console.log(ent+ent2) 
 }