"use strict";
exports.__esModule = true;
exports.Order = exports.OrderInput = void 0;
var schema_1 = require("@nexus/schema");
exports.OrderInput = schema_1.inputObjectType({
    name: 'OrderInput',
    definition: function (t) {
        t.nonNull.int('qty');
        t.nonNull.id('productId');
    }
});
exports.Order = schema_1.objectType({
    name: 'Order',
    definition: function (t) {
        t.model.id();
        t.model.qty();
        t.model.product();
    }
});
