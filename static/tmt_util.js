// am_util.js
// depósito de funções utilitárias

function id(
    p_id
){
    // return null se no HTML
    // não existir elemento com id p_id
    return document.getElementById(p_id)
}//id

// qc para "Quality Control"
function qc(
    p_col
){
    for (var coisa of p_col){
        // havendo uma coisa null, o QC falha
        if (coisa==null) return false
    }//for
    return true
}//qc


