"use strict";
exports.__esModule = true;
var nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
var nexus_1 = require("nexus");
var types = require("./types");
exports["default"] = nexus_1.makeSchema({
    types: types,
    plugins: [nexus_plugin_prisma_1.nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    }
});
