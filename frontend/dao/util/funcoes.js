var moment = require('moment');

module.exports = {
    //Pega o valor do MySQL e converte para mostrar no inputText
    formatBDToDecimal(str) {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
        var formatado = formatter.format(str);
        return formatado;
    },

    //Pega o valor do Front-end e converte em decimal
    formatDecimalToBD(str) {
        if(str == null || str == '' || str == 0){
            return 0;
        }else{
            return str.replace(".", "").replace(",", ".");
        }        
    },

    //Pega o valor decimal e cobverte em R$ 0,00
    formatDecimalToReais(str) {
        var formatter =
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
            });
        var formatado = formatter.format(str);
        return formatado;
    },

    //Pega a data em AAAA-MM-DD HH:mm:ss e transforma em DD/MM/AAAA HH:mm:ss
    formatBDToDateTime(str) {
        var formatter = '';
        if (str) {
            formatter = new Intl.DateTimeFormat('pt-BR').format(str);
        }
        return formatter;
    },

    //Pega a data em AAAA-MM-DD HH:mm:ss e transforma em DD/MM/AAAA HH:mm:ss
    formatBDToDate(str) {
        let result = '';
        if (str == null || str == '0000-00-00 00:00:00') {
            result = ''
        } else {
            result = moment(str).format('YYYY-MM-DD');
            if (result == 'Invalid date' || result == 'undefined'){
                result = '';
            }
        }
        return result;
    },

    formatBDToDateFront(str) {
        let result = '';
        if (str == null || str == '0000-00-00 00:00:00') {
            result = ''
        } else {
            result = moment(str).format('MM/DD/YYYY');
            if (result == 'Invalid date' || result == 'undefined'){
                result = '';
            }
        }
        return result;
    },

    //Pega a data em DD/MM/AAAA HH:mm:ss e transforma em AAAA-MM-DD HH:mm:ss
    formatDateTimeToBD(str) {        
        if (str == null || str == '' || str == undefined) {
            return '0000-00-00 00:00:00';
        } else {
            return formatter = moment(str, 'DD/MM/YYYY HH:mm:ss', true).format('YYYY-MM-DD HH:mm:ss');
        }
    },

}