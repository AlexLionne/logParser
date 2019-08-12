
module.exports.InstanceException = class InstanceException extends Error{
    constructor(message) {
        super(message);
        this.name = 'InstanceException';
    }
};
module.exports.ArgumentException = class ArgumentException extends Error{
    constructor(message) {
        super(message);
        this.name = 'ArgumentException';
    }
};
module.exports.NullPointerException = class NullPointerException extends Error{
    constructor(message) {
        super(message);
        this.name = 'NullPointerException';
    }
};
module.exports.ParamException = class ParamException extends Error{
    constructor(message) {
        super(message);
        this.name = 'ParamException';
    }
};
module.exports.SeparatorException = class SeparatorException extends Error{
    constructor(message) {
        super(message);
        this.name = 'SeparatorException';
    }
};
module.exports.TypeException = class TypeException extends Error{
    constructor(message) {
        super(message);
        this.name = 'TypeException';
    }
};
module.exports.InnerTypeException = class InnerTypeException extends Error{
    constructor(message) {
        super(message);
        this.name = 'InnerTypeException';
    }
};
module.exports.ParserResultException = class ParserResultException extends Error{
    constructor(message) {
        super(message);
        this.name = 'ParserResultException';
    }
};





