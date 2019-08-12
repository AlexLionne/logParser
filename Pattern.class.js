const InstanceException = require('./exceptions').InstanceException;
const ArgumentException = require('./exceptions').ArgumentException;
const ParamException = require('./exceptions').ParamException;


class Pattern {
    constructor(string){
        //console.log(string);
        // let formats = string.match(/(\(.*?\))/g);
        // let separators = string.match(/( [:!@#\-$^&*, .?"{}|<>] )/g);
        let args = string.split(/([:!\-@#$^&;*, .?"{}|<>]+)+(?![^(]*\))/g);

        //console.log(args);
        this._pattern = [];
        let k = 0;


        for(let i = 0;i<args.length;i++){
            let child = {};
            //check if pattern contains array to avoid managing array lines as regular format

            if(args[i].match(/([:!\-@#$^&;*, .?"{}|<>]+)+(?![^(]*\))/g)){
                this._pattern[k].separator = args[i];
                k -= i;
            }else{
                let formats = [];
                //check format
                if(args[i].match(/(?:%)(.*?)(?:\()/g)){ //%type(params

                    if(args[i].match(/(\(.*?\))/g) ) {
                        let res = args[i].match(/(\(.*?\))/g);
                        let values;
                        //check if the params is ok
                        if (res[0].includes(',')/*more than one arg*/) {
                            values = res[0].replace('(', '').replace(')', '').split(',');
                            values.map((value) => {
                                let format = {};
                                //console.log(value.split('::'));
                                let values = value.split(':\'');
                                if(values.length === 1){
                                    throw new ParamException('Format Error, maybe the split operator is malformed (should be : )')
                                }else{
                                    format[values[0]] = values[1];
                                    formats.push(format);
                                }
                            });
                        } else {
                            //check if format output is ok
                            values = res[0].replace('(', '').replace(')', '').split(':\'');
                            if (values.some(value => value.includes('\''))) {
                                values = values.map(value =>  value.replace('\'',''));
                            }
                            if(values.length === 1){
                                throw new ParamException('Format Error, maybe the split operator is malformed (should be : )')
                            }else{
                                let format = {};
                                format[values[0]] = values[1];
                                formats.push(format);
                            }
                        }
                    }
                }else if(args[i].match(/(?:%).+(.*?)/g)){ //%type
                    //throw new ArgumentException('Format Error, missing params')
                    //type = args[i].replace('%','')
                }
                //params %type([params])
                // child.key = args[i].replace('%','');
                child.key = args[i].indexOf('(') > -1 ? args[i].substr(0 , args[i].indexOf('(')).replace('%','') : args[i].replace('%','')  ;
                child.formats = formats;
                child.separator = args[i].match(/([:!\-@#$^&;*, .?"{}|<>]+)+(?![^(]*\))/g) ? args[i] : -1;

                if( i === this._pattern.length -1 ){
                    this._pattern[this._pattern.length-1].separator = -1;
                }
                this._pattern.push(child);
                k += i;
            }
        }
    }
    pattern(){
        return this._pattern;
    }
}
module.exports = Pattern;
