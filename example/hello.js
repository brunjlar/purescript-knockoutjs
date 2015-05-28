// Generated by psc version 0.6.9.5
var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    
    function numAdd(n1) {
      return function(n2) {
        return n1 + n2;
      };
    }
    ;
    
    function numMul(n1) {
      return function(n2) {
        return n1 * n2;
      };
    }
    ;
    
    function refEq(r1) {
      return function(r2) {
        return r1 === r2;
      };
    }
    ;
    
    function refIneq(r1) {
      return function(r2) {
        return r1 !== r2;
      };
    }
    ;
    var Semigroupoid = function ($less$less$less) {
        this["<<<"] = $less$less$less;
    };
    var Functor = function ($less$dollar$greater) {
        this["<$>"] = $less$dollar$greater;
    };
    var Apply = function ($less$times$greater, __superclass_Prelude$dotFunctor_0) {
        this["<*>"] = $less$times$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    var Applicative = function (__superclass_Prelude$dotApply_0, pure) {
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
        this.pure = pure;
    };
    var Bind = function ($greater$greater$eq, __superclass_Prelude$dotApply_0) {
        this[">>="] = $greater$greater$eq;
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
    };
    var Monad = function (__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
        this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
    };
    var Semiring = function ($times, $plus, one, zero) {
        this["*"] = $times;
        this["+"] = $plus;
        this.one = one;
        this.zero = zero;
    };
    var Eq = function ($div$eq, $eq$eq) {
        this["/="] = $div$eq;
        this["=="] = $eq$eq;
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var semiringNumber = new Semiring(numMul, numAdd, 1, 0);
    var semigroupoidArr = new Semigroupoid(function (f) {
        return function (g) {
            return function (x) {
                return f(g(x));
            };
        };
    });
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_5) {
        return pure(__dict_Monad_5["__superclass_Prelude.Applicative_0"]());
    };
    var liftA1 = function (__dict_Applicative_8) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_8["__superclass_Prelude.Apply_0"]())(pure(__dict_Applicative_8)(f))(a);
            };
        };
    };
    var eqString = new Eq(refIneq, refEq);
    var ap = function (__dict_Monad_16) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_16["__superclass_Prelude.Bind_1"]())(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_16["__superclass_Prelude.Bind_1"]())(a)(function (_1) {
                        return $$return(__dict_Monad_16)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Eq: Eq, 
        Semiring: Semiring, 
        Monad: Monad, 
        Bind: Bind, 
        Applicative: Applicative, 
        Apply: Apply, 
        Functor: Functor, 
        Semigroupoid: Semigroupoid, 
        "==": $eq$eq, 
        "*": $times, 
        "+": $plus, 
        ap: ap, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "<$>": $less$dollar$greater, 
        "$": $dollar, 
        "<<<": $less$less$less, 
        semigroupoidArr: semigroupoidArr, 
        semiringNumber: semiringNumber, 
        eqString: eqString
    };
})();
var PS = PS || {};
PS.Global = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var readFloat = parseFloat;;
    return {
        readFloat: readFloat, 
        isNaN: isNaN
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    
    function returnE(a) {
      return function() {
        return a;
      };
    }
    ;
    
    function bindE(a) {
      return function(f) {
        return function() {
          return f(a())();
        };
      };
    }
    ;
    var monadEff = new Prelude.Monad(function () {
        return applicativeEff;
    }, function () {
        return bindEff;
    });
    var bindEff = new Prelude.Bind(bindE, function () {
        return applyEff;
    });
    var applyEff = new Prelude.Apply(Prelude.ap(monadEff), function () {
        return functorEff;
    });
    var applicativeEff = new Prelude.Applicative(function () {
        return applyEff;
    }, returnE);
    var functorEff = new Prelude.Functor(Prelude.liftA1(applicativeEff));
    return {
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Data_Either = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Extend = PS.Control_Extend;
    var Left = (function () {
        function Left(value0) {
            this.value0 = value0;
        };
        Left.create = function (value0) {
            return new Left(value0);
        };
        return Left;
    })();
    var Right = (function () {
        function Right(value0) {
            this.value0 = value0;
        };
        Right.create = function (value0) {
            return new Right(value0);
        };
        return Right;
    })();
    var functorEither = new Prelude.Functor(function (f) {
        return function (_47) {
            if (_47 instanceof Left) {
                return new Left(_47.value0);
            };
            if (_47 instanceof Right) {
                return new Right(f(_47.value0));
            };
            throw new Error("Failed pattern match");
        };
    });
    var applyEither = new Prelude.Apply(function (_48) {
        return function (r) {
            if (_48 instanceof Left) {
                return new Left(_48.value0);
            };
            if (_48 instanceof Right) {
                return Prelude["<$>"](functorEither)(_48.value0)(r);
            };
            throw new Error("Failed pattern match");
        };
    }, function () {
        return functorEither;
    });
    var applicativeEither = new Prelude.Applicative(function () {
        return applyEither;
    }, Right.create);
    return {
        Left: Left, 
        Right: Right, 
        functorEither: functorEither, 
        applyEither: applyEither, 
        applicativeEither: applicativeEither
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Alternative = PS.Control_Alternative;
    var Control_Extend = PS.Control_Extend;
    var Control_MonadPlus = PS.Control_MonadPlus;
    var Control_Plus = PS.Control_Plus;
    var Nothing = (function () {
        function Nothing() {

        };
        Nothing.value = new Nothing();
        return Nothing;
    })();
    var Just = (function () {
        function Just(value0) {
            this.value0 = value0;
        };
        Just.create = function (value0) {
            return new Just(value0);
        };
        return Just;
    })();
    return {
        Nothing: Nothing, 
        Just: Just
    };
})();
var PS = PS || {};
PS.Data_Foreign = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Function = PS.Data_Function;
    var Data_Array = PS.Data_Array;
    var Data_Either = PS.Data_Either;
    
  function unsafeFromForeign(value) {
    return value;
  }
  ;
    
  function tagOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  ;
    var TypeMismatch = (function () {
        function TypeMismatch(value0, value1) {
            this.value0 = value0;
            this.value1 = value1;
        };
        TypeMismatch.create = function (value0) {
            return function (value1) {
                return new TypeMismatch(value0, value1);
            };
        };
        return TypeMismatch;
    })();
    var unsafeReadTagged = function (tag) {
        return function (value) {
            if (tagOf(value) === tag) {
                return Prelude.pure(Data_Either.applicativeEither)(unsafeFromForeign(value));
            };
            return new Data_Either.Left(new TypeMismatch(tag, tagOf(value)));
        };
    };
    var readString = unsafeReadTagged("String");
    var readNumber = unsafeReadTagged("Number");
    return {
        TypeMismatch: TypeMismatch, 
        readNumber: readNumber, 
        readString: readString, 
        tagOf: tagOf, 
        unsafeReadTagged: unsafeReadTagged, 
        unsafeFromForeign: unsafeFromForeign
    };
})();
var PS = PS || {};
PS.Data_Foreign_Class = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foreign = PS.Data_Foreign;
    var Data_Traversable = PS.Data_Traversable;
    var Data_Array = PS.Data_Array;
    var Data_Foreign_Null = PS.Data_Foreign_Null;
    var Data_Foreign_Undefined = PS.Data_Foreign_Undefined;
    var Data_Foreign_NullOrUndefined = PS.Data_Foreign_NullOrUndefined;
    var Data_Either = PS.Data_Either;
    var Data_Foreign_Index = PS.Data_Foreign_Index;
    var IsForeign = function (read) {
        this.read = read;
    };
    var stringIsForeign = new IsForeign(Data_Foreign.readString);
    var read = function (dict) {
        return dict.read;
    };
    var numberIsForeign = new IsForeign(Data_Foreign.readNumber);
    return {
        IsForeign: IsForeign, 
        read: read, 
        stringIsForeign: stringIsForeign, 
        numberIsForeign: numberIsForeign
    };
})();
var PS = PS || {};
PS.Control_Monad_Knockout = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Foreign_Class = PS.Data_Foreign_Class;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Either = PS.Data_Either;
    var Data_Foreign = PS.Data_Foreign;
    var Data_Maybe = PS.Data_Maybe;
    
    function newObservable() {
        return ko.observable();
    }
    ;
    
    function readObservableCore(obs) {
        return function () {
            return obs();
        };
    }
    ;
    
    function pureComputed(f) {
        return function () {
            return ko.pureComputed(function () {
                return f();
            });
        };
    }
    ;
    
    function readPureComputedCore(comp) {
        return function () {
            return comp();
        };
    }
    ;
    var eitherToMaybe = function (_261) {
        if (_261 instanceof Data_Either.Left) {
            return Data_Maybe.Nothing.value;
        };
        if (_261 instanceof Data_Either.Right) {
            return new Data_Maybe.Just(_261.value0);
        };
        throw new Error("Failed pattern match");
    };
    var foreignToMaybe = function (__dict_IsForeign_179) {
        return Prelude["<<<"](Prelude.semigroupoidArr)(eitherToMaybe)(Data_Foreign_Class.read(__dict_IsForeign_179));
    };
    var readObservable = function (__dict_IsForeign_180) {
        return Prelude["<<<"](Prelude.semigroupoidArr)(Prelude["<$>"](Control_Monad_Eff.functorEff)(foreignToMaybe(__dict_IsForeign_180)))(readObservableCore);
    };
    var readPureComputed = function (__dict_IsForeign_181) {
        return function (comp) {
            return function __do() {
                var _7 = readPureComputedCore(comp)();
                var _278 = foreignToMaybe(__dict_IsForeign_181)(_7);
                if (_278 instanceof Data_Maybe.Just) {
                    return _278.value0;
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    return {
        readPureComputed: readPureComputed, 
        pureComputed: pureComputed, 
        readObservable: readObservable, 
        newObservable: newObservable
    };
})();
var PS = PS || {};
PS.Hello = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Knockout = PS.Control_Monad_Knockout;
    var Global = PS.Global;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Maybe = PS.Data_Maybe;
    var Debug_Trace = PS.Debug_Trace;
    var Data_Foreign_Class = PS.Data_Foreign_Class;
    var main = function __do() {
        var _12 = Control_Monad_Knockout.newObservable();
        var _11 = Control_Monad_Knockout.pureComputed(function __do() {
            var _8 = Control_Monad_Knockout.readObservable(Data_Foreign_Class.stringIsForeign)(_12)();
            if (_8 instanceof Data_Maybe.Nothing) {
                return 0;
            };
            if (_8 instanceof Data_Maybe.Just) {
                var y = Global.readFloat(_8.value0);
                var _283 = Global.isNaN(y);
                if (_283) {
                    return 0;
                };
                if (!_283) {
                    return y;
                };
                throw new Error("Failed pattern match");
            };
            throw new Error("Failed pattern match");
        })();
        var _10 = Control_Monad_Knockout.pureComputed(Prelude["<$>"](Control_Monad_Eff.functorEff)(Prelude["*"](Prelude.semiringNumber)(2))(Control_Monad_Knockout.readPureComputed(Data_Foreign_Class.numberIsForeign)(_11)))();
        var _9 = Control_Monad_Knockout.pureComputed(Prelude["<*>"](Control_Monad_Eff.applyEff)(Prelude["<$>"](Control_Monad_Eff.functorEff)(Prelude["+"](Prelude.semiringNumber))(Control_Monad_Knockout.readPureComputed(Data_Foreign_Class.numberIsForeign)(_11)))(Control_Monad_Knockout.readPureComputed(Data_Foreign_Class.numberIsForeign)(_10)))();
        return {
            text: _12, 
            once: _11, 
            twice: _10, 
            thrice: _9
        };
    };
    return {
        main: main
    };
})();
