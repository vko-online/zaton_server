"use strict";
exports.__esModule = true;
exports.Company = exports.CompanyUpdateInput = exports.CompanyInput = void 0;
var schema_1 = require("@nexus/schema");
exports.CompanyInput = schema_1.inputObjectType({
    name: 'CompanyInput',
    definition: function (t) {
        t.nonNull.string('name');
        t.nonNull.string('address');
        t.nonNull.string('phone');
        t.nullable.string('website');
        t.nullable.string('currency');
        t.nullable.string('email');
        t.nullable.string('bin');
    }
});
exports.CompanyUpdateInput = schema_1.inputObjectType({
    name: 'CompanyUpdateInput',
    definition: function (t) {
        t.nullable.string('name');
        t.nullable.string('address');
        t.nullable.string('phone');
        t.nullable.string('website');
        t.nullable.string('currency');
        t.nullable.string('email');
        t.nullable.string('bin');
        t.nullable.string('currency');
    }
});
exports.Company = schema_1.objectType({
    name: 'Company',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.address();
        t.model.phone();
        t.model.website();
        t.model.email();
        t.model.bin();
        t.model.accounts({ pagination: false, filtering: false });
        t.model.clients({ pagination: true, filtering: true });
        t.model.currency();
        t.model.docs({ pagination: false, filtering: false });
        t.model.products();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.owner();
    }
});
