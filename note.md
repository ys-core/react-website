
new()实际上做了哪些事情？

new Person("John") = {
    var obj = {};
	obj.__proto__ = Person.prototype; // 此时便建立了obj对象的原型链：
	// obj->Person.prototype->Object.prototype->null
	var result = Person.call(obj,"John"); // 相当于obj.Person("John")
	return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
}

/////////////////////////////////寄生组合式继承////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////