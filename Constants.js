module.exports = {
    dxDiag : {
        delimiters:['-',': '],
    },
};


module.exports ["DATE"] = 'date';
module.exports ["TIME"] = 'time';
module.exports ["STRING"] = 'string';
module.exports ["INTEGER"] = 'integer';
module.exports ["ARRAY"] = 'array';

module.exports ["FORMAT"] = 'format';
module.exports ["INCLUDES"] = 'includes';
module.exports ["SIZE"] = 'size';
module.exports ["LENGTH"] = 'length';
module.exports ["NAME"] = 'name';
module.exports ["LOCALE"] = 'locale';
module.exports ["PARSER_TASK"] = 'parser_task';


 const zip_result = [
     {
         "name":"Composer",
         "parsable":true,
         "pattern":"%date(format:'YYYY-MM-DD') %time(format:'h:mm:ss') %string(name:'when') : %integer(name:'pid') : %string(name:'type') : %string(name:'description') %array(name:'errors',   at )",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/Composer/Trace.log",
     },
     {
         "name":"Temp",
         "parsable":true,
         "pattern":"%date(format:'YYYY-MM-DD') %time(format:'hh:mm:ss.SSS')   %string(name:'description')",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/Temp/Setup Log 2019-04-18 #003.txt",
     },
     {
         "name":"Composer info",
         "parsable":true,
         "pattern":"%string(name:'info')",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/composer-info.txt",
     },
     {
         "name":"DirectX",
         "pattern":"",
         "parsable":false,
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/dxdiag-result.txt",
     },
     {
         "name":"Analytics",
         "parsable":true,
         "pattern":"%date(format:'YYYY-MM-DD') %time(format:'h:mm:ss') %string(name:'when'):%integer(name:'pid'):%string(name:'type') : %string(name:'description')   %array(name:'errors',   at )",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/Analytics/Trace.log",
     },
     {
         "name":"Agent",
         "parsable":true,
         "pattern":"%date(format:'DD/MM/yyyy') %time(format:'hh:mm:ss') %string(name:'type');%string(name:'description') %array(name:'errors',   at ,   ---)",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/Agent/Log Agent.txt",
     },
     {
         "name":"AppData",
         "parsable":true,
         "pattern":"%string(name:'line') %array(name:'errors',   at )",
         "path":"./assets/tests/2019-Apr-18_13-35-46_TOLX302081969/AppData/error.txt",
     },
 ];
module.exports ["LOGS_TESTS"] = zip_result;











