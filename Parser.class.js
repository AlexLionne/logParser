const moment = require("moment");
const STRING = require('./Constants').STRING; 
const DATE = require('./Constants').DATE;
const LOCALE = require('./Constants').LOCALE;
const NAME = require('./Constants').NAME;
const INTEGER = require('./Constants').INTEGER;





class Parser {

    constructor(locale = null,args = null,pattern = null) {
        this._name = args === null ? null : args[0];
        this._path = args === null ? null : args[1];
        this._pattern = pattern === null ? null : pattern;
        moment.locale(locale);
    }

    parseDate(item, row, index) {
        let observer = {item: item, isValid: false, index: index, date: [], time: [], type: DATE, formats:[],originalDate:''};
        let date = undefined;
        if (item.separator === ' ') {
            let value = row.substr(index, row.indexOf(item.separator, row.indexOf(item.separator) + 1));
            observer.originalDate = value;
            date = this.getDateFormat(value);
        } else {
            let value = row.substr(index, row.indexOf(item.separator));
            observer.originalDate = value;
            date = this.getDateFormat(value);
        }

        if(date !== undefined){
            //Console.log({msg:'parsing date for locale '+moment.locale(this._locale)});
            if (date.isValid()) {
                observer.isValid = true;
                const datetime = date.toDate();
                observer.date = [];
                observer.time = [];
                observer.date.push({
                    name: "date",
                    year: datetime.getFullYear().toString(),
                    month: ('0' + (datetime.getMonth() + 1)).slice(-2),
                    day: ('0' + (datetime.getDate())).slice(-2)
                });
                observer.time.push({
                    name: "time",
                    hours: ('0' + datetime.getHours()).slice(-2),
                    minutes: ('0' + datetime.getMinutes()).slice(-2),
                    seconds: ('0' + datetime.getSeconds()).slice(-2),
                    milliseconds: ('00' + datetime.getMilliseconds()).slice(-3)
                });
                if (item.separator === ' ') {
                    observer.index += row.substr(index, row.substr(index, row.indexOf(item.separator, row.indexOf(item.separator) + 1)).length).length + item.separator.length;
                } else {
                    observer.index += row.substr(index, row.indexOf(item.separator)).length + item.separator.length;
                }
            } else {
                observer.isValid = false;
            }
        }

        return observer;
    };
    parseString(item, row, index) {
        let observer = {item: item, row: row, isValid: true, index: index, type: STRING, string: null};
        if (observer.item.separator !== -1) {
            observer.string = row.substr(index, row.substr(index, row.length).indexOf(item.separator));
        } else {
            observer.string = row.substr(index, row.length);
        }
        observer.index += observer.string.toString().length + item.separator.length;
        return observer;
    };


    parseInteger(item, row, index) {
        let observer = {item: item, row: row, isValid: true, index: index, type: STRING, string: null};
        observer.string = observer.item.separator !== -1 ? row.substr(index, row.substr(index, row.length).indexOf(item.separator)) : row.substr(index, row.length);
        isNaN(parseInt(observer.string)) ? observer.string = '0' : observer.index += observer.string.toString().length + item.separator.length;
        return observer;
    };


    getDateFormat(string) {
        //Console.log({name:this._name})
        let members = string.split(' ');
        let date = members[0].split('-').join('/');
        let split = date.split('/');
        split.map(digit => {
            if(digit.length < 2 ){
                split[split.indexOf(digit)] = ('0' + digit).slice(-2)
            }
        });
        date = split.join('/');

        if (members.length === 3){
            let time = members[1];
            let when = members[2];
            let format = moment.localeData(moment.locale()).longDateFormat('L') + ' hh:mm:ss a';
            //Console.log({date:'Date ? '+ moment((date+' '+time+' '+when),format).toDate().toString()});
            return moment((date+' '+time+' '+when),this._name === 'intuifaceagent' ? 'DD/MM/YYYY hh:mm:ss' : format);
        }else if(members.length === 2){
            let time = members[1];
            //Console.log({date:'Locale is '+moment.locale()+' : Date is '+date+' time is '+time});
            let format = moment.localeData(moment.locale()).longDateFormat('L') + ' hh:mm:ss';
            //Console.log({date:'Date ? '+ moment((date+' '+time),format).toDate().toString()});
            return  moment((date+' '+time),this._name === 'intuifaceagent' ? 'DD/MM/YYYY hh:mm:ss' : format);
        }
    }

    parse(locale, rows, pattern, name, path) {
        moment.locale(locale === 'en-gb' ? 'en' : locale);
        this._name = name;
        this._path = path;
        this._pattern = pattern;
        return new Promise((resolve, reject) => {
            let observer = {pattern: pattern, name: name, path: path, data: [],nRows:rows.length};
            //Console.log({row:JSON.stringify(self.getDateFormat(rows,name, pattern), null, 2)+' HH:mm:ss A'});
            for (let t = 0; t < rows.length; t++) {
                if (rows[t].length > 0 || rows[t] !== "") {
                    let l = {};
                    let row_observers = [];
                    let line = rows[t];
                    if (line.match(/\b((([A-Z])|([A-Z]+_+[A-Z]))+)\b/g)) {
                        l.keywords = line.match(/\b((([A-Z])|([A-Z]+_+[A-Z]))+)\b/g);
                    }
                    let i = 0;
                    for (let p = 0; p < observer.pattern.length; p++) {
                        let item = observer.pattern[p];
                        switch (item.key) {
                            case DATE :
                                item.formats.map((format) => {
                                    switch (Object.keys(format)[0]) {
                                        case LOCALE :
                                            let dateObserver = this.parseDate(item, line, i);
                                            i = dateObserver.index;
                                            if (dateObserver.isValid) {
                                                l.date = dateObserver.date;
                                                l.time = dateObserver.time;
                                                l.formats = dateObserver.formats;
                                                l.originalDate = dateObserver.originalDate;
                                            } else {
                                                l.date = 'invalid date';
                                                l.time = 'invalid time';
                                                dateObserver.row = line;
                                            }
                                            row_observers.push(dateObserver);
                                            break;
                                    }
                                });
                                break;
                            case STRING :
                                item.formats.map((format) => {
                                    switch (Object.keys(format)[0]) {
                                        case NAME :
                                            let observer = this.parseString(item, line, i);
                                            l[format.name] = observer.string;
                                            i = observer.index;
                                            row_observers.push(observer);
                                            break;
                                    }
                                });
                                break;
                            case INTEGER :
                                item.formats.map((format) => {
                                    switch (Object.keys(format)[0]) {
                                        case NAME :
                                            let observer = this.parseInteger(item, line, i);
                                            l[format.name] = observer.string;
                                            i = observer.index;
                                            row_observers.push(observer);
                                            break;
                                    }
                                });
                                break;
                        }
                    }

                    l.errors = [];
                    let end = false;
                    let k = t + 1;
                    while (end === false) {
                        if (k < rows.length) {
                            let DateObserver = this.parseDate(observer.pattern[0], rows[k], 0);
                            if (DateObserver.isValid === false) {
                                l.errors.push(rows[k]);
                                k++;
                            } else {
                                end = true;
                                t = k - 1;
                            }
                        } else {
                            end = true;
                            t = k - 1;
                        }
                    }

                    l.errors.forEach(error => {
                        if (!error.includes('   ')) {
                            l.description += ' ' + error;
                            l.errors.splice(l.errors.indexOf(error), 1);
                        }
                    });
                    if (l.errors.length === 0) delete l.errors;
                    observer.data.push(l);
                }
            }
            resolve(observer);
        });
    }

    exec() {
        let context = this;
        return new Promise(function (resolve, reject) {
            let lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(context._path)
            });
            let rows = [];
            lineReader.on('line', function (line) {
                rows.push(line);
            }).on('close', function () {
                context.parse(rows, context._pattern, context._name, context._path).then(observer => {
                    resolve(observer);
                });

            })
        })
    }

}

module.exports = Parser;

