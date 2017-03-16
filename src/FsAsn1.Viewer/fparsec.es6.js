
import {parse, text, lang} from "bennu"
import {stream} from "nu-stream"
import * as List from "fable-core/List"

//TODO class
function LastConsumedPosition(index, line, column, previous) {
    this.index = index;
    this.line = line;
    this.column = column;
    this.previous = previous;
}

LastConsumedPosition.initial = new LastConsumedPosition(0, 1, 1, null);

LastConsumedPosition.prototype.toString = function() { return `Line: ${this.line} Column: ${this.column}` }; 

LastConsumedPosition.prototype.increment = function(tok, restOfInput) {
    let isNewLine = tok === "\n" || (tok === "\r" && (!restOfInput || restOfInput.first !== "\n"));

    if (isNewLine) {
        return new LastConsumedPosition(this.index + 1, this.line + 1, 1, tok); 
    } else {
        return new LastConsumedPosition(this.index + 1, this.line, this.column + 1, tok); 
    }    
};
    
LastConsumedPosition.prototype.eq = function(other) {
    return other && other.index === this.index && other.previous === this.previous; 
};

let eagerList = function (p) {
	return parse.bind(parse.eager(p), arr => parse.of(List.ofArray(arr)));
}
		
let manyString = (p) => parse.bind(parse.eager(parse.many(p)), arr => parse.of(arr.join("")));
let many1String = (p) => parse.bind(parse.eager(parse.many1(p)), arr => parse.of(arr.join("")));
		

let newline = parse.choice(text.string("\n"), text.string("\r\n"), text.string("\r"));

let wrapInSuccess = (p) =>
    parse.bind(p, 
        r => parse.bind(parse.getParserState, 
            s => parse.of({ Case: 'Success', Fields: [r, s.userState, s.position]})))


export let choice = ps =>
    parse.choicea(Array.from(ps))

//TODO turn into separate non-default exports
export default {
    eof: parse.eof,
	fail: (msg) => parse.never(msg),
    attempt: p => parse.attempt(p),
    preturn: parse.of,
    choice,
    skipManyTill: (p, endp) => parse.sequence(parse.eager(parse.manyTill(p, endp)), endp, parse.of(null)),
    //TODO false not supported
    skipRestOfLine: (skipNewline) => parse.sequence(parse.eager(parse.manyTill(parse.anyToken, newline)), newline),
    manyTill: (p, endp) => lang.then(parse.eager(parse.manyTill(p, endp)), endp),
	op_GreaterGreaterEquals: (p, f) => parse.bind(p, f),
	anyChar: parse.anyToken,
	skipString: (s) => parse.next(text.string(s), parse.of(null)),	
    skipNewline: parse.next(parse.choice(text.string("\n"), text.string("\r\n"), text.string("\r")), parse.of(null)),
    newline,
    getPosition: parse.getPosition,
    getUserState: parse.getState,
	//TODO check this one
	op_DotGreaterGreaterQmark: (p1, p2) =>
		parse.attempt(lang.then(p1, p2)),
    run: (p, str) => { 
        try {    
            return parse.runState(wrapInSuccess(p), new parse.ParserState(stream.from(str), LastConsumedPosition.initial));             
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
	},
    runParserOnSubstring: (p, userState, streamName, str, index, count) => { 
        try {
            return parse.runState(wrapInSuccess(p), new parse.ParserState(stream.from(str.substring(index, index + count)), LastConsumedPosition.initial, userState)); 
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
    },
    runParserOnString: (p, userState, streamName, str) => { 
        try {
            return parse.runState(wrapInSuccess(p), new parse.ParserState(stream.from(str), LastConsumedPosition.initial, userState));             
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
    },
	pstring: (str) => text.string(str),
	pint32:
		parse.bind(many1String(text.digit), n => parse.of(Number.parseInt(n))),
	spaces:
		parse.next(manyString(text.space), parse.of(null)),
	numberLiteral: (opts, label) =>
		parse.bind(many1String(text.digit), s => parse.of({ string: s })),
	opt: p => parse.optional(null, p),
	many: p => eagerList(parse.many(p)),
	sepBy: (p, sep) => eagerList(lang.sepBy(sep, p)),
	op_BarGreaterGreater: (p, f) => parse.bind(p, x => parse.of(f(x))),
	op_LessBarGreater: parse.either,
	op_LessBarGreaterPercent: (p, v) => parse.either(p, parse.of(v)),
	op_GreaterGreaterDot:  parse.next,
	op_DotGreaterGreater:  lang.then,
	op_DotGreaterGreaterDot: (p1, p2) => parse.bind(p1, x => parse.bind(p2, y => parse.of([x,y]))),
	op_GreaterGreaterPercent: (p1, v) => parse.next(p1, parse.of(v)),
	between: lang.between,
	pipe4: (p1,p2,p3,p4,f) =>
		parse.bind(p1, 
			x => parse.bind(p2, 
				y => parse.bind(p3, 
					z => parse.bind(p4,
                        w => parse.of(f(x)(y)(z)(w)))))),
    pipe3: (p1,p2,p3,f) =>
        parse.bind(p1, 
            x => parse.bind(p2, 
                y => parse.bind(p3, 
                    z => parse.of(f(x)(y)(z))))),
	tuple3: (p1,p2,p3,f) =>
        parse.bind(p1, 
            x => parse.bind(p2, 
                y => parse.bind(p3, 
                    z => parse.of([x, y, z])))),
	pipe2: (p1, p2, f) =>
		parse.bind(p1, x => parse.bind(p2, y => parse.of(f(x)(y)))),
	createParserForwardedToRef: () =>
		{ let ref = {contents: undefined}; return [parse.late(() => ref.contents), ref]},	
    many1Satisfy2L: (f1, f, p3) =>
        parse.bind(parse.token(f1), 
            x => parse.bind(manyString(parse.token(f)),
                y => parse.of(x + y)))
};
