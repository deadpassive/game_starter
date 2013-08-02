/*global namespace*/
var GClass = namespace("GClass");

// code for extending JS classes taken from 
// http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain
// This is a constructor that is used to setup inheritance without
// invoking the base's constructor. It does nothing, so it doesn't
// create properties on the prototype like our previous example did
function surrogateCtor() {}

GClass.extend = function(base, sub, methods) {
  surrogateCtor.prototype = base.prototype;
  sub.prototype = new surrogateCtor();
  sub.prototype.constructor = sub;
  // Add a reference to the parent's prototype
  sub.base = base.prototype;
 
  // Copy the methods passed in to the prototype
  for (var name in methods) {
    sub.prototype[name] = methods[name];
  }
  // so we can define the constructor inline
  return sub;
};
