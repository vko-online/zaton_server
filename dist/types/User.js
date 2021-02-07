"use strict";
exports.__esModule = true;
exports.User = exports.SignupInput = exports.SigninInput = void 0;
var schema_1 = require("@nexus/schema");
exports.SigninInput = schema_1.inputObjectType({
    name: 'SigninInput',
    definition: function (t) {
        t.nonNull.string('email');
        t.nonNull.string('password');
    }
});
exports.SignupInput = schema_1.inputObjectType({
    name: 'SignupInput',
    definition: function (t) {
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.string('password');
    }
});
exports.User = schema_1.objectType({
    name: 'User',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.company();
        t.model.createdAt();
        t.model.updatedAt();
    }
});
