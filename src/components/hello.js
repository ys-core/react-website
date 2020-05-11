



function object(o){
    function F(){}
    F.prototype = o
    return new F()
}

function inherit(subType,superType){
    const prototype = object(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}

function superType(){
    this.name = name
}
superType.prototype.sayName = function(){

}
function subType(name,age){
    superType.call(this,name)
    this.age = age
}

subType.prototype.sayAge = function(){

}

inherit(subType,superType)

var instance = new subType('Yang',26);

