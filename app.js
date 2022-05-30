function insertAt(array, index, ...elements) {
    array.splice(index, 0, ...elements);
}

function vetorToString(input) {
    var output = ''
    for (var i = 0; i < input.length; i++) {
        var output = output + input[i];
    }
    return output;
}

function tratandoNot(expressao) {
    for (var i = 0; i < expressao.length; i++) {
        if (expressao[i] == "~" && (expressao[i + 1] == "F" || expressao[i + 1] == "V")) {
            if (expressao[i + 1] == "F") {
                expressao[i + 1] = "V";
            }
            else if (expressao[i + 1] == "V") {
                expressao[i + 1] = "F";
            }
            //Remover o elemento i      
            expressao.splice(i, 1);
        }
    }
    return expressao;
}

function verificaNOT(expressao) {

    var verificador = 0;

    for (var i = 0; i < expressao.length; i++) {
        if (expressao[i] == "~" && (expressao[i + 1] == "V" || expressao[i + 1] == "F")) {
            verificador = 1;
        }
    }
    return verificador;
}

function avaliar(expressao) {
    var i;
    var log;

    //Primeiro na ordem de precedencia
    do {
        expressao = tratandoNot(expressao);

    } while (verificaNOT(expressao) == 1)


    //Segundo na ordem de precedencia
    for (i = 0; i < expressao.length; i++) {
        if (expressao[i] == "^") {
            if ((expressao[i - 1] == "V" || expressao[i - 1] == "F") && (expressao[i + 1] == "V" || expressao[i + 1] == "F")) {
                log = expressao[i - 1] + expressao[i + 1];
                log = vetorToString(log);
                expressao.splice(i, 1);
                if (log == "VV") {
                    resposta = "V";
                }
                else {
                    resposta = "F";
                }
                expressao.splice(i, 1);
                expressao.splice(i - 1, 1);
                insertAt(expressao, i - 1, resposta)
            }
        }
    }

    //Segundo na ordem de precedencia
    for (i = 0; i < expressao.length; i++) {
        if (expressao[i] == "v") {
            if ((expressao[i - 1] == "V" || expressao[i - 1] == "F") && (expressao[i + 1] == "V" || expressao[i + 1] == "F")) {
                log = expressao[i - 1] + expressao[i + 1];
                log = vetorToString(log);
                expressao.splice(i, 1);
                if (log == "FF") {
                    resposta = "F";
                }
                else {
                    resposta = "V";
                }
                expressao.splice(i, 1);
                expressao.splice(i - 1, 1);
                insertAt(expressao, i - 1, resposta)
            }
        }
    }
    //Terceira ba irden de orecencia
    for (i = 0; i < expressao.length; i++) {
        if (expressao[i] == "→") {
            if ((expressao[i - 1] == "V" || expressao[i - 1] == "F") && (expressao[i + 1] == "V" || expressao[i + 1] == "F")) {
                log = expressao[i - 1] + expressao[i + 1];
                log = vetorToString(log);
                expressao.splice(i, 1);
                if (log == "VF") {
                    resposta = "F";
                }
                else {
                    resposta = "V";
                }
                expressao.splice(i, 1);
                expressao.splice(i - 1, 1);
                insertAt(expressao, i - 1, resposta)
            }
        }
    }
    //Quarto na ordem de precedencia
    for (i = 0; i < expressao.length; i++) {
        if (expressao[i] == "⟷") {
            if ((expressao[i - 1] == "V" || expressao[i - 1] == "F") && (expressao[i + 1] == "V" || expressao[i + 1] == "F")) {
                log = expressao[i - 1] + expressao[i + 1];
                log = vetorToString(log);
                expressao.splice(i, 1);
                if (log == "VV" || log == "FF") {
                    resposta = "V";
                }
                else {
                    resposta = "F";
                }
                expressao.splice(i, 1);
                expressao.splice(i - 1, 1);
                insertAt(expressao, i - 1, resposta)
            }
        }
    }
    for (i = 0; i < expressao.length; i++) {
        if (expressao[i] == "(" && expressao[i + 2] == ")") {
            expressao.splice(i, 1)
            expressao.splice(i + 1, 1)
        }
    }
    return expressao;
}

function valores(expressao, a = "F", b = "F", c = "F") {

    for (var i = 0; i < expressao.length; i++) {
        if (expressao[i] == "A") {
            expressao[i] = a;
        }
        else if (expressao[i] == "B") {
            expressao[i] = b;
        }
        else if (expressao[i] == "C") {
            expressao[i] = c;
        }
    }
    return expressao;
}

function calcular() {
    //Declaração de variáveis
    var expressao = [];
    var qtd = 0;
    var letras = ["A", "B", "C"];
    var atr = [];

    //Recebimento da expressaoessão
    expressao = document.getElementById('equacao').innerHTML.split("");
    var solucao = expressao;

    //Recebimento de valores lógicos das proposições

    for (var i = 0; i < letras.length; i++) {
        if (expressao.includes(letras[i])) {
            qtd++;
        }
    }

   // var tabela = tabelaVerdade(qtd);

    /* for (var i = 0; i < parseInt(Math.pow(2, qtd)); i++) {        
        expressao = valores(solucao, a = tabela.A[i], b = tabela.B[i], c = tabela.C[i]); 
    } */
    for (var j = 0; j < qtd; j++) {
        do {
            atr[j] = prompt("Informe o valor lógico da variável: " + letras[j] + ": ");
        } while (atr[j] != "V" && atr[j] != "F");
    }
    expressao = valores(expressao, a = atr[0], b = atr[1], c = atr[2]);

    var texto = document.getElementById('resposta').innerHTML = "Solução: </br><hr>"

    if (expressao.length == 1) {
        document.getElementById('resposta').innerHTML = texto + vetorToString(valores(expressao));
    }
    else {
        while (expressao.length > 1) {
            expressao = avaliar(expressao);
            console.log("teste");
        }
        expressao = avaliar(expressao);
        document.getElementById('resposta').innerHTML = texto + vetorToString(expressao);
    }
}

function insert(param) {
    let equacao = document.getElementById('equacao').innerHTML;
    document.querySelector('#equacao').innerHTML = equacao + param;
}

function limpar() {
    document.querySelector('#equacao').innerHTML = "";
}

function back() {
    let equacao = document.getElementById('equacao').innerHTML;
    document.querySelector('#equacao').innerHTML = equacao.substring(0, equacao.length - 1);
}

/* function tabelaVerdade(n) {
    //cria os valores da tabela verdade para as variáveis A,B,C 
    let tabela = {
        A: [],
        B: [],
        C: []
    }

    var repeat = parseInt(Math.pow(2, n));
    for (var i = 0; i < repeat; i++) {
        // Gera valor de A 
        if (i < (repeat / 2) && n >= 1) {
            tabela.A.push("V");
        } else {
            tabela.A.push("F");
        }
        // Gera valor de B
        if (i < (repeat / 4) || ((repeat / 2) <= i && i < (repeat - repeat / 4)) && n >= 2) {
            tabela.B.push("V");
        } else {
            tabela.B.push("F");
        }
        // Gera valor de C
        if (i % 2 == 0 && n == 3) {
            tabela.C.push("V");
        } else {
            tabela.C.push("F");
        }
    }

    return tabela;
} */