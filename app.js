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


for(var i = 0; i< parseInt(Math.pow(2,n));i++){
    console.log(tvl.not(tabela.B[i]));
}

function insert(param){
    var equacao = document.querySelector('#resultado').innerHTML;
    document.querySelector('#resultado').innerHTML = equacao + param;
}

function tabelaVerdade(n){

    let tabela = {
        A: [],
        B: [],
        C: []
    }

    var repeat = parseInt(Math.pow(2,n));
    for(var i = 0; i < repeat;i++){
        if(i < (repeat/2)){
            tabela.A.push(true);
        }else{
            tabela.A.push(false);
        }
        if(i <(repeat/4) || ((repeat/2) <= i && i < (repeat - repeat/4))){
            tabela.B.push(true);
        }else{
            tabela.B.push(false);
        }
        if(i%2 == 0){
            tabela.C.push(true);
        }else{
            tabela.C.push(false);
        }
    }

    return tabela;
}