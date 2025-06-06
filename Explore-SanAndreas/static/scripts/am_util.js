// am_util.js

function id(
    pIdDeAlgumElementoHTML
) {
    return document.getElementById(
        pIdDeAlgumElementoHTML
    )

    // NÃO acontecerão estas instruções
    var elemento =
        document.getElementById(
            pIdDeAlgumElementoHTML
        )

    var bExiste = elemento != null;
    if (bExiste)
        return elemento;
    else
        return null;
}//id

function $(p){return id(p);}

/*
retorna true *SE* todos os relevantes são
diferentes de null

retorna false se algum relevante é null
 */
function qualityControl(pRelevantes){
    // ciclo especial para Arrays
    for(var coisa of pRelevantes)
        if(coisa==null)
            return false;
        //if
    //for

    // ciclo for regular
    /*
    var iQuantosElementos = pRelevantes.length;
    for(
        var idx=0; //init
        idx<iQuantosElementos; //continuidade
        idx+=1
    ){
        var coisa = pRelevantes[idx];
        var bValida = coisa!=null;
        if (!bValida)
            return false;
        //if
    }//for
    */
    return true;
}//qualityControl

function inteiroAoCalhas(pMin, pMax){
    /*
    if (pMax<pMin){
        var temp = pMin
        pMin = pMax
        pMax = temp
    }
    */

    //var amplitude = Math.max(pMin, pMax)-Math.min(pMin, pMax)+1

    //+simples, à confiança
    var amplitude = pMax-pMin+1
    var salto = Math.random() * amplitude
    var destino = pMin + salto
    destino = Math.floor(destino)
    return destino
}//inteiroAoCalhas
