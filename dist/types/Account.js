"use strict";
exports.__esModule = true;
exports.Account = exports.AccountInput = void 0;
var schema_1 = require("@nexus/schema");
exports.AccountInput = schema_1.inputObjectType({
    name: 'AccountInput',
    definition: function (t) {
        t.nonNull.string('iban');
        t.nonNull.string('bic');
        t.nonNull.string('name');
    }
});
exports.Account = schema_1.objectType({
    name: 'Account',
    definition: function (t) {
        t.model.id();
        t.model.iban();
        t.model.bic();
        t.model.name();
    }
});
