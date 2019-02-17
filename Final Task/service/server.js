"use strict";
var xsjs = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;

var options = {
    anonymous: true, 
    redirectUrl: "/index.xsjs"
};

try {
    options = Object.assign(options, xsenv.getServices({
        hana: {
            tag: "hana"
        }
    }));
} catch (err) {
    console.log("[ERROR]", err.message);
}

try {
    options = Object.assign(options, xsenv.getServices({
        uaa: "pt_uaa"
    }));
} catch (err) {
    console.log("[ERROR]", err.message);
}

xsjs(options).listen(port);
console.log("Server listening on port %d", port);