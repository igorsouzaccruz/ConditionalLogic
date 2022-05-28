const tvl = require("tvl");
var n = 3;

/*
tvl.not(x: true|false|undefined)
tvl.and(x,y: true|false|undefined)
tvl.or(x,y: true|false|undefined)
tvl.imp(x,y: true|false|undefined)
tvl.bi(x,y: true|false|undefined)
*/

var tabela = tabelaVerdade(n);

console.log("A: ");
for(var i = 0; i< parseInt(Math.pow(2,n));i++){
    console.log(tvl.not(tabela.A[i]));
}
console.log("B: ");
for(var i = 0; i< parseInt(Math.pow(2,n));i++){
    console.log(tvl.not(tabela.B[i]));
}
console.log("C: ");
for(var i = 0; i< parseInt(Math.pow(2,n));i++){
    console.log(tvl.not(tabela.C[i]));
}

console.log(equacao);
console.log(eq);
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
            tabela.A.push(true);
        }else{
            tabela.A.push(false);
        }
        // Gera valor de B
        if(i <(repeat/4) || ((repeat/2) <= i && i < (repeat - repeat/4)) && n >= 2){
            tabela.B.push(true);
        }else{
            tabela.B.push(false);
        }
        // Gera valor de C
        if(i%2 == 0 && n == 3){
            tabela.C.push(true);
        }else{
            tabela.C.push(false);
        }
    }

    return tabela;
}