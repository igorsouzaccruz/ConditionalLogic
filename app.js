function insertAt(array, index, ...elements){
    array.slice(index, 0, ...elements);
}

function vetorToString(input){
    var output =''
    for(var i = 0; i<input.length; i++){
        var output = output + input[i];
    }
    return output;
}

function tratandoNot(expr){
    for(var i = 0; i <expr.length; i++){
        if(expr[i] == "~" && (expr[i+1] == "F" || expr[i+1] == "V"))
        {
            if(expr[i+1] == "F"){
                expr[i+1] = "V";
            }
            else if(expr[i+1] == "V"){
                expr[i+1] = "F";
            }
            //Remover o elemento i
            expr.slice(i,1);
        }
    }
    return expr;
}

function verificaNOT(expr){

    var verificador = 0;

    for(var i = 0; i <expr.length; i++){
        if(expr[i] == "~" && (expr[i+1] == "V" || expr[i+1] == "F")){
            verificador = 1;
        }
    }
    return verificador;
}

function avaliar(expr){
    var i;
    var log;

    //Primeiro na ordem de precedencia
    do{
        expr = tratandoNot(expr);

    } while(verificaNOT(expr) == 1)
   

    //Segundo na ordem de precedencia
    for(i = 0; i< expr.length; i++){
        if(expr[i] == "^"){
            if((expr[i-1] == "V" || expr[i-1] == "F") && (expr[i+1] == "V" || expr[i+1] == "F")){
                log = expr[i-1] + expr[i+1];
                log = vetorToString(log);
                expr.slice(i,1);
                if(log == "VV")
                {
                    resposta = "V";
                }
                else
                {
                    resposta = "F";
                }
                expr.slice(i,1);
                expr.slice(i-1,1);
                insertAt(expr, i-1, resposta)
            }
        }
    }

    //Segundo na ordem de precedencia
    for(i = 0; i < expr.length; i++){
        if(expr[i] == "v"){
            if((expr[i-1] == "V" || expr[i-1] == "F") && (expr[i+1] == "V" || expr[i+1] == "F")){
                log = expr[i-1] + expr[i+1];
                log = vetorToString(log);
                expr.slice(i,1);
                if(log == "FF")
                {
                    resposta = "F";
                }
                else
                {
                    resposta = "V";
                }
                expr.slice(i,1);
                expr.slice(i-1,1);
                insertAt(expr, i-1, resposta)
            }
        }
    }
    //Terceira ba irden de orecencia
    for(i = 0; i < expr.length; i++){
        if(expr[i] == "→"){
            if((expr[i-1] == "V" || expr[i-1] == "F") && (expr[i+1] == "V" || expr[i+1] == "F")){
                log = expr[i-1] + expr[i+1];
                log = vetorToString(log);
                expr.slice(i,1);
                if(log == "VF")
                {
                    resposta = "F";
                }
                else
                {
                    resposta = "V";
                }
                expr.slice(i,1);
                expr.slice(i-1,1);
                insertAt(expr, i-1, resposta)
            }
        }
    }
    //Quarto na ordem de precedencia
    for(i = 0; i < expr.length; i++){
        if(expr[i] == "⟷"){
            if((expr[i-1] == "V" || expr[i-1] == "F") && (expr[i+1] == "V" || expr[i+1] == "F")){
                log = expr[i-1] + expr[i+1];
                log = vetorToString(log);
                expr.slice(i,1);
                if(log == "VV" || log =="FF")
                {
                    resposta = "V";
                }
                else
                {
                    resposta = "F";
                }
                expr.slice(i,1);
                expr.slice(i-1,1);
                insertAt(expr, i-1, resposta)
            }
        }
    }
    for(i = 0; i < expr.length; i++)
    {
        if(expr[i] == "(" && expr[i+2] == ")")
        {
            expr.slice(i,1)
            expr.slice(i+1,1)
        }
    }
    return expr;
}

function valores(expr, A = "F", B = "F", C = "F"){
    for(var i = 0; i < expr.length; i++){
        if(expr[i] == "A"){
            expr[i] = A;
        }
        else if(expr[i] == "B"){
            expr[i] = B;
        }
        else if(expr[i] == "C"){
            expr[i] = C;
        }
    }
    return expr;
}

function calcular(){
    //Declaração de variáveis
    var expr = "";
    var qtd = 0;
    var letras = ["A", "B", "C"];
    var atr = [];
    var atr1 = [];
    var atr2= [];
    
    //Recebimento da expressão
    expr =  document.getElementById('equacao').innerHTML;
   
    //Recebimento de valores lógicos das proposições

    for(var i = 0; i < letras.length; i++)
    {
        if(expr.includes(letras[i]))
        {
            qtd++;
        }
    }

    /* var tabela = tabelaVerdade(qtd);
   
    
 
        for(var i = 0; i< parseInt(Math.pow(2,qtd));i++)
        {
            atr[i]= tabela.A[i];
            atr1[i]= tabela.B[i];
            atr2[i]= tabela.C[i];
        }  */

        expr = valores(expr, A = "V", B = "V", C = "V")

        var texto = document.getElementById('resposta').innerHTML = "Solução: "  
        
        if(expr.length == 1)
        {
           document.getElementById('resposta').innerHTML = texto + vetorToString(valores(expr)) + "y"; 
        }
        else{
            
            while(expr.includes("(")){
                expr = avaliar(expr);
            }
            expr = avaliar(expr);
            document.getElementById('resposta').innerHTML = vetorToString(expr) + "x";
            //texto = document.getElementById('resposta').innerHTML = texto + valores(expr) +"<hr>"; 
        }     
         
        //document.getElementById('resposta').innerHTML = texto + "</br>"+ atr + "</br>"+ atr1 + "</br>" + atr2;
       
    
}

function insert(param){
    let equacao = document.getElementById('equacao').innerHTML;
    document.querySelector('#equacao').innerHTML = equacao + param;
}

function limpar(){
    document.querySelector('#equacao').innerHTML = "";
}

function back(){
    let equacao = document.getElementById('equacao').innerHTML;
    document.querySelector('#equacao').innerHTML = equacao.substring(0,equacao.length-1);
}

function tabelaVerdade(n){
 //cria os valores da tabela verdade para as variáveis A,B,C 
    let tabela = {
        A: [],
        B: [],
        C: []
    }

    var repeat = parseInt(Math.pow(2,n));
    for(var i = 0; i < repeat;i++){
        // Gera valor de A 
        if(i < (repeat/2) && n >= 1){
            tabela.A.push("V");
        }else{
            tabela.A.push("F");
        }
        // Gera valor de B
        if(i <(repeat/4) || ((repeat/2) <= i && i < (repeat - repeat/4)) && n >= 2){
            tabela.B.push("V");
        }else{
            tabela.B.push("F");
        }
        // Gera valor de C
        if(i%2 == 0 && n == 3){
            tabela.C.push("V");
        }else{
            tabela.C.push("F");
        }
    }

    return tabela;
}