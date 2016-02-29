window.onload = function()
{
    var mathSquare = [];
    var operadores = ["+", "-", "*"]; //"/"
    //Para cargar el select...
    var select = nom_div("dimenEscenario");
    for (var i = 3; i<= 31; i+=2)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    nom_div("dimenEscenario").addEventListener('change', function(event)
    {
        crearEscenario(Number(this.value));
    });

    //Para validar si la respuesta dada es válida o no...
    /*
    Validar que los valores dados sean igual a la respuesta de la Matriz...
    */
    var validaRespuesta = function(id)
    {
        var valInput = Number(nom_div(id).value);
        var partId = id.split("_");
        var respuestaMatriz = {
                                horizontal : mathSquare[Number(partId[0])][mathSquare.length - 1],
                                vertical : mathSquare[mathSquare.length - 1][Number(partId[1])]

        };

        var respuesta = {
                            horizontal : {
                                            ecuacion : "",
                                            valor : 0,
                                            div : "div_" + partId[0] + "_" + (mathSquare.length - 1)
                            },
                            vertical :
                            {
                                ecuacion : "",
                                valor : 0,
                                div : "div_" + (mathSquare.length - 1) + "_" + partId[1]
                            }
        };

                for(var i = 0; i < mathSquare.length - 1; i++)
                {
                    if(i % 2 === 0)
                    {
                        respuesta.horizontal.ecuacion += nom_div(partId[0]+"_"+i).value.length !== 0 ? nom_div(partId[0]+"_"+i).value : 0;
                        respuesta.vertical.ecuacion += nom_div(i+"_"+partId[1]).value.length !== 0 ? nom_div(i+"_"+partId[1]).value : 0;
                    }
                    else
                {
                        respuesta.horizontal.ecuacion += mathSquare[Number(partId[0])][i];
                        respuesta.vertical.ecuacion += mathSquare[i][Number(partId[1])];
                }
                }

           var vOperacion = {horizontal : "", vertical : ""};
            for(i = 0; i <= mathSquare.length-1; i++)
            {
                if(i % 2 == 0)
                {
                    vOperacion.vertical = vOperacion.horizontal = "";
                    for(c = 0; c < mathSquare.length-1; c++)
                    {
                        vOperacion.horizontal += mathSquare[i][c];
                        vOperacion.vertical += mathSquare[c][i];
                    }
                    mathSquare[i][c] = eval(vOperacion.horizontal);
                    mathSquare[c][i] = eval(vOperacion.vertical);
                    var a,b,c,d;
                    a = vOperacion.horizontal;
                    b = eval(vOperacion.vertical);
                    c = respuesta.horizontal.ecuacion;
                    d = eval(respuesta.vertical.ecuacion);
                }

            }

            if (a>=c) 
                        {
                            var color = true
                        }
                    else
                        {
                            var color = false
                        }
                    if (b>=d) 
                        {
                            var colorv = true
                        }
                    else
                         {
                            var colorv = false
                        }
   
                        nom_div(respuesta.horizontal.div).style.background = color? "green" : "red";
                        nom_div(respuesta.vertical.div).style.background = colorv? "green" : "red"; 
    };

    var eventosInputs = function()
    {
        //Para establecer los eventos de los inputs...
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
        {
            nom_div(inputs[i].id).addEventListener("change", function(e)
            {
                validaRespuesta(this.id);
            });
        }
    };

    var crearEscenario = (function crearEscenario(dimension)

    {
        if(dimension % 2 !== 0)
        {
            mathSquare = [];
            var valorCelda = "";
            var i = c = 0;
            for(i = 0; i <= dimension; i++)
            {
                mathSquare.push([]);
                for(c = 0; c <= dimension; c++)
                {
                    if(i !== dimension && c !== dimension)
                    {
                        if(i % 2 === 0)
                        {
                            valorCelda = c % 2 === 0 ? Math.floor(Math.random() * 9) + 1 : operadores[Math.floor(Math.random() * operadores.length)];

                        }
                        else
                        {
                            valorCelda = c % 2 === 0 ? operadores[Math.floor(Math.random() * operadores.length)] : 0;

                        }
                        mathSquare[i][c] = valorCelda;
                    }
                    else
                    {
                        mathSquare[i][c] = 0;
                    }
                }
            }
            //Recorrer el array para crearlo en el escenario...
            var realizaOperacion = {horizontal : "", vertical : ""};
            var tabla = "<table id = 'chess_board' width = '50%' border = '0' align = 'center' cellpadding = '0' cellspacing = '0'>";
            for(i = 0; i <= dimension; i++)
            {
                if(i % 2 === 0)
                {
                    realizaOperacion.vertical = realizaOperacion.horizontal = "";
                    for(c = 0; c < dimension; c++)
                    {
                        realizaOperacion.horizontal += mathSquare[i][c];
                        realizaOperacion.vertical += mathSquare[c][i];

                    }
                    mathSquare[i][c] = eval(realizaOperacion.horizontal);
                    mathSquare[c][i] = eval(realizaOperacion.vertical);

                }
                //Para crear las celdas en el escenario...
                tabla += "<tr>";
                for(c = 0; c < dimension; c++)
                {
                    if(i % 2 === 0)
                    {
                        tabla += "<td>";
                        if(c % 2 === 0)
                        {
                            tabla += "<input type = 'number' id = '"+(i)+"_"+(c)+"' min = '1' max = '9'/>";
                            //mathSquare[i][c] = 0;
                        }
                        else
                        {
                            tabla += mathSquare[i][c];
                        }
                        tabla += "</td>";
                    }
                    else
                    {
                        if(c % 2 === 0)
                        {
                            tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>" + mathSquare[i][c] + "</td>";
                        }
                        else
                        {
                            tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                        }
                    }
                    tabla += "</td>";
                }
                if(i % 2 === 0)
                {
                    tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>"+(mathSquare[i][c])+"</td>";
                }
                else
                {
                    tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                }
                tabla += "</tr>";
            }
            tabla += "</tabla>";
            nom_div("escenario").innerHTML = tabla;
            eventosInputs();
            console.table(mathSquare);
            console.log(dimension);
        }
        else
        {
            alert("El valor para la matriz debe ser impar");
        }
        return crearEscenario;
    })(3);

    function nom_div(div)
    {
        return document.getElementById(div);
    }
};

            
window.onload = function()
{
    var mathSquare = [];
    var operadores = ["+", "-", "*"]; //"/"
    //Para cargar el select...
    var select = nom_div("dimenEscenario");
    for (var i = 3; i<= 31; i+=2)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    nom_div("dimenEscenario").addEventListener('change', function(event)
    {
        crearEscenario(Number(this.value));
    });

    //Para validar si la respuesta dada es válida o no...
    /*
    Validar que los valores dados sean igual a la respuesta de la Matriz...
    */
    var validaRespuesta = function(id)
    {
        var valInput = Number(nom_div(id).value);
        var partId = id.split("_");
        var respuestaMatriz = {
                                horizontal : mathSquare[Number(partId[0])][mathSquare.length - 1],
                                vertical : mathSquare[mathSquare.length - 1][Number(partId[1])]

        };

        var respuesta = {
                            horizontal : {
                                            ecuacion : "",
                                            valor : 0,
                                            div : "div_" + partId[0] + "_" + (mathSquare.length - 1)
                            },
                            vertical :
                            {
                                ecuacion : "",
                                valor : 0,
                                div : "div_" + (mathSquare.length - 1) + "_" + partId[1]
                            }
        };

        console.log(respuestaMatriz);
               
               var vOperacion = {horizontal : "", vertical : ""};
                for(var i = 0; i < mathSquare.length - 1; i++)
                {
                    if(i % 2 === 0)
                    {
                        respuesta.horizontal.ecuacion += nom_div(partId[0]+"_"+i).value.length !== 0 ? nom_div(partId[0]+"_"+i).value : 0;
                        respuesta.vertical.ecuacion += nom_div(i+"_"+partId[1]).value.length !== 0 ? nom_div(i+"_"+partId[1]).value : 0;
                    }
                    else
                    {
                        respuesta.horizontal.ecuacion += mathSquare[Number(partId[0])][i];
                        respuesta.vertical.ecuacion += mathSquare[i][Number(partId[1])];
                }

                if(i % 2 == 0)
                {
                    vOperacion.vertical = vOperacion.horizontal = "";
                    for(c = 0; c < mathSquare.length-1; c++)
                    {
                        vOperacion.horizontal += mathSquare[i][c];
                        vOperacion.vertical += mathSquare[c][i];
                    }
                    mathSquare[i][c] = eval(vOperacion.horizontal);
                    mathSquare[c][i] = eval(vOperacion.vertical);
                    var a,b,c,d;
                    a = vOperacion.horizontal;
                    b = eval(vOperacion.vertical);
                    c = respuesta.horizontal.ecuacion;
                    d = eval(respuesta.vertical.ecuacion);

                    console.log(a + "\n" + c /* + " " + c + " " + d*/ );
                    

                }
                }

           

            if (a>=c) 
                        {
                            var color = true
                        }
                    else
                        {
                            var color = false
                        }
                    if (b>=d) 
                        {
                            var colorv = true
                        }
                    else
                         {
                            var colorv = false
                        }
   
                        nom_div(respuesta.horizontal.div).style.background = color? "green" : "red";
                        nom_div(respuesta.vertical.div).style.background = colorv? "green" : "red"; 






    };

    var eventosInputs = function()
    {
        //Para establecer los eventos de los inputs...
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
        {
            nom_div(inputs[i].id).addEventListener("change", function(e)
            {
                validaRespuesta(this.id);
            });
        }
    };

    var crearEscenario = (function crearEscenario(dimension)

    {
        if(dimension % 2 !== 0)
        {
            mathSquare = [];
            var valorCelda = "";
            var i = c = 0;
            for(i = 0; i <= dimension; i++)
            {
                mathSquare.push([]);
                for(c = 0; c <= dimension; c++)
                {
                    if(i !== dimension && c !== dimension)
                    {
                        if(i % 2 === 0)
                        {
                            valorCelda = c % 2 === 0 ? Math.floor(Math.random() * 9) + 1 : operadores[Math.floor(Math.random() * operadores.length)];

                        }
                        else
                        {
                            valorCelda = c % 2 === 0 ? operadores[Math.floor(Math.random() * operadores.length)] : 0;

                        }
                        mathSquare[i][c] = valorCelda;
                    }
                    else
                    {
                        mathSquare[i][c] = 0;
                    }
                }
            }
            //Recorrer el array para crearlo en el escenario...
            var realizaOperacion = {horizontal : "", vertical : ""};
            var tabla = "<table id = 'chess_board' width = '50%' border = '0' align = 'center' cellpadding = '0' cellspacing = '0'>";
            for(i = 0; i <= dimension; i++)
            {
                if(i % 2 === 0)
                {
                    realizaOperacion.vertical = realizaOperacion.horizontal = "";
                    for(c = 0; c < dimension; c++)
                    {
                        realizaOperacion.horizontal += mathSquare[i][c];
                        realizaOperacion.vertical += mathSquare[c][i];

                    }
                    mathSquare[i][c] = eval(realizaOperacion.horizontal);
                    mathSquare[c][i] = eval(realizaOperacion.vertical);

                }
                //Para crear las celdas en el escenario...
                tabla += "<tr>";
                for(c = 0; c < dimension; c++)
                {
                    if(i % 2 === 0)
                    {
                        tabla += "<td>";
                        if(c % 2 === 0)
                        {
                            tabla += "<input type = 'number' id = '"+(i)+"_"+(c)+"' min = '1' max = '9'/>";
                            //mathSquare[i][c] = 0;
                        }
                        else
                        {
                            tabla += mathSquare[i][c];
                        }
                        tabla += "</td>";
                    }
                    else
                    {
                        if(c % 2 === 0)
                        {
                            tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>" + mathSquare[i][c] + "</td>";
                        }
                        else
                        {
                            tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                        }
                    }
                    tabla += "</td>";
                }
                if(i % 2 === 0)
                {
                    tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>"+(mathSquare[i][c])+"</td>";
                }
                else
                {
                    tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                }
                tabla += "</tr>";
            }
            tabla += "</tabla>";
            nom_div("escenario").innerHTML = tabla;
            eventosInputs();
            console.table(mathSquare);
            console.log(dimension);
        }
        else
        {
            alert("El valor para la matriz debe ser impar");
        }
        return crearEscenario;
    })(3);

    function nom_div(div)
    {
        return document.getElementById(div);
    }
};
