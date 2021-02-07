"use strict";
exports.__esModule = true;
var graphql_yoga_1 = require("graphql-yoga");
var context_1 = require("./context");
var schema_1 = require("./schema");
var server = new graphql_yoga_1.GraphQLServer({
    context: context_1["default"],
    schema: schema_1["default"]
});
// tslint:disable-next-line: no-floating-promises
server.start(function () {
    console.log('Server ready at http://localhost:4000');
});
