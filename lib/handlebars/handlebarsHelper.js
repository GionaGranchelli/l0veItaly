     var Handlebars = require('handlebars');

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            });
            /**
             * The {{#exists}} helper checks if a variable is defined.
             */
            Handlebars.registerHelper('exists', function (variable, options) {
                if (typeof variable !== 'undefined' && variable !== null && variable !== '') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('notExists', function (variable, options) {
                if (typeof variable === 'undefined' || variable === null || variable === '') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('isEmpty', function (variable, options) {
                if (variable.length === 0) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('twodigit', function (variable, options) {
                if (typeof variable != 'undefined') {
                    var temp = variable.toString();
                    return temp.substring(0, temp.indexOf(".") + 2);
                } else {

                    return variable;
                }
            });
            Handlebars.registerHelper('multiply', function (variable, variable2, options) {
                if ((typeof variable !== 'undefined') & (typeof variable2 !== 'undefined')) {
                    var temp1 = variable * variable2;
                    var temp = temp1.toString();
                    if (((temp.length - 1) - temp.indexOf(".")) > 3) {
                        return temp.substring(0, temp.indexOf(".") + 3);
                    } else {
                        return temp;
                    }
                } else {
                    return "";
                }
            });
            Handlebars.registerHelper('isnullo', function (variable, variable2, options) {
                if ((variable != null) & (variable != undefined) & (variable != "")) {
                    return variable2.toString() + variable.toString();
                } else {
                    return "";
                }
            });
            Handlebars.registerHelper('dataformatter', function (variable, options) {
                if ((variable != null) & (variable != undefined) & (variable != "")) {
                    return variable.slice(8, 10) +"/"+ variable.slice(5, 7) +"/"+ variable.slice(0, 4);
                } else {
                    return "";
                }
            });
            Handlebars.registerHelper('shipaddress', function (variable, options) {
                console.log(variable);
                if ((variable != null) & (variable != undefined) & (variable != "")) {
                    switch (variable) {
                        case "1":
                            return "Castel Frentano (CH)";
                            break;
                        case "2":
                            return "Fossacesia(CH)";
                            break;
                        case "3":
                            return "Frisa (CH)";
                            break;
                        case "4":
                            return "Lanciano (CH)";
                            break;
                        case "5":
                            return "Mozzagrogna (CH)";
                            break;
                        case "7":
                            return "Rocca San Giovanni (CH)";
                            break;
                        case "6":
                            return "Ortona (CH)";
                            break;
                        case "8":
                            return "Santa Maria Imbaro (CH)";
                            break;
                        case "9":
                            return "San Vito Chietino (CH)";
                            break;
                        case "10":
                            return "Treglio (CH)";
                            break;
                        default: return "";
                         }
                } else {
                    return "";
                }
            });
       