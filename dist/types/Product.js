"use strict";
exports.__esModule = true;
exports.Product = exports.ProductInput = void 0;
var schema_1 = require("@nexus/schema");
exports.ProductInput = schema_1.inputObjectType({
    name: 'ProductInput',
    definition: function (t) {
        t.nonNull.string('name');
        t.nonNull.int('price');
        t.nullable.string('unit');
        t.nullable.int('ltv');
        t.nullable.string('description');
    }
});
exports.Product = schema_1.objectType({
    name: 'Product',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.price();
        t.model.unit();
        t.model.ltv();
        t.model.docs({ pagination: false, filtering: false });
        t.model.createdAt();
        t.model.updatedAt();
        t.model.createdBy();
    }
});
