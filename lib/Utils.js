var Utils = Utils || {
    isEven: function(number) {
        return (number % 2 === 0);
    },
    
    randomOption: function(options) {
        var split = 1 / options.length;
        var rand = Math.random();
        var index = (rand / split);
        index = Math.floor(index);
        return options[Math.round(index)];
    }
};

function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}

// Utils.createNS = function (namespace) {
//     var nsparts = namespace.split(".");
//     var parent = Utils;
 
//     // we want to be able to include or exclude the root namespace so we strip
//     // it if it's in the namespace
//     if (nsparts[0] === "Utils") {
//         nsparts = nsparts.slice(1);
//     }
 
//     // loop through the parts and create a nested namespace if necessary
//     for (var i = 0; i < nsparts.length; i++) {
//         var partname = nsparts[i];
//         // check if the current parent already has the namespace declared
//         // if it isn't, then create it
//         if (typeof parent[partname] === "undefined") {
//             parent[partname] = {};
//         }
//         // get a reference to the deepest element in the hierarchy so far
//         parent = parent[partname];
//     }
//     // the parent is now constructed with empty namespaces and can be used.
//     // we return the outermost namespace
//     return parent;
// };
