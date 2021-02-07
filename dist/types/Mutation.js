"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Mutation = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var schema_1 = require("@nexus/schema");
var utils_1 = require("../utils");
exports.Mutation = schema_1.mutationType({
    definition: function (t) {
        var _this = this;
        // #region auth
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                data: schema_1.arg({ type: 'SignupInput' })
            },
            resolve: function (_parent, _a, ctx) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var name, email, password, hashedPassword, user;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                name = data.name, email = data.email, password = data.password;
                                return [4 /*yield*/, bcryptjs_1.hash(password, 10)];
                            case 1:
                                hashedPassword = _b.sent();
                                return [4 /*yield*/, ctx.prisma.user.create({
                                        data: {
                                            name: name,
                                            email: email,
                                            password: hashedPassword
                                        }
                                    })];
                            case 2:
                                user = _b.sent();
                                return [2 /*return*/, {
                                        token: jsonwebtoken_1.sign({ userId: user.id }, utils_1.APP_SECRET),
                                        user: user
                                    }];
                        }
                    });
                });
            }
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                data: schema_1.arg({ type: 'SigninInput' })
            },
            resolve: function (_parent, _a, context) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var email, password, users, user, passwordValid;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                email = data.email, password = data.password;
                                return [4 /*yield*/, context.prisma.user.findMany({
                                        where: {
                                            email: email
                                        }
                                    })];
                            case 1:
                                users = _b.sent();
                                if (!users.length)
                                    throw new Error("No user found for email: " + email);
                                user = users[0];
                                return [4 /*yield*/, bcryptjs_1.compare(password, user.password)];
                            case 2:
                                passwordValid = _b.sent();
                                if (!passwordValid)
                                    throw new Error('Invalid password');
                                return [2 /*return*/, {
                                        token: jsonwebtoken_1.sign({ userId: user.id }, utils_1.APP_SECRET),
                                        user: user
                                    }];
                        }
                    });
                });
            }
        });
        // #endregion
        // #region product
        t.field('createProduct', {
            type: 'Product',
            args: {
                data: schema_1.arg({ type: 'ProductInput' })
            },
            resolve: function (_parent, _a, context) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var userId, company, product;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                userId = utils_1.getUserId(context);
                                return [4 /*yield*/, context.prisma.company.findFirst({
                                        where: {
                                            ownerId: userId
                                        }
                                    })];
                            case 1:
                                company = _b.sent();
                                return [4 /*yield*/, context.prisma.product.create({
                                        data: {
                                            createdById: userId,
                                            companyId: company.id,
                                            name: data.name,
                                            price: data.price,
                                            description: data.description,
                                            unit: data.unit
                                        }
                                    })];
                            case 2:
                                product = _b.sent();
                                return [2 /*return*/, product];
                        }
                    });
                });
            }
        });
        // #endregion
        // #region company
        t.field('createCompany', {
            type: 'Company',
            args: {
                data: schema_1.arg({ type: 'CompanyInput' })
            },
            resolve: function (_parent, _a, context) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var userId, existingCompany, company;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                userId = utils_1.getUserId(context);
                                return [4 /*yield*/, context.prisma.company.findFirst({
                                        where: {
                                            ownerId: userId
                                        }
                                    })];
                            case 1:
                                existingCompany = _b.sent();
                                if (existingCompany) {
                                    throw new Error('User can have 1 company');
                                }
                                return [4 /*yield*/, context.prisma.company.create({
                                        data: __assign(__assign({}, data), { ownerId: userId })
                                    })];
                            case 2:
                                company = _b.sent();
                                return [2 /*return*/, company];
                        }
                    });
                });
            }
        });
        t.field('updateCompany', {
            type: 'Company',
            args: {
                data: schema_1.arg({ type: 'CompanyUpdateInput' })
            },
            resolve: function (_parent, _a, context) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var userId, existingCompany, company;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                userId = utils_1.getUserId(context);
                                return [4 /*yield*/, context.prisma.company.findFirst({
                                        where: {
                                            ownerId: userId
                                        }
                                    })];
                            case 1:
                                existingCompany = _b.sent();
                                if (!existingCompany) {
                                    throw new Error('User has no company');
                                }
                                return [4 /*yield*/, context.prisma.company.update({
                                        where: {
                                            id: existingCompany.id
                                        },
                                        data: {
                                            address: data.address,
                                            bin: data.bin,
                                            email: data.email,
                                            name: data.name,
                                            phone: data.phone,
                                            website: data.website
                                        }
                                    })];
                            case 2:
                                company = _b.sent();
                                return [2 /*return*/, company];
                        }
                    });
                });
            }
        });
        // #endregion
        // #region client
        t.field('createClient', {
            type: 'Client',
            args: {
                data: schema_1.arg({ type: 'ClientInput' })
            },
            resolve: function (_parent, _a, context) {
                var data = _a.data;
                return __awaiter(_this, void 0, void 0, function () {
                    var userId, company, client;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                userId = utils_1.getUserId(context);
                                return [4 /*yield*/, context.prisma.company.findFirst({
                                        where: {
                                            ownerId: userId
                                        }
                                    })];
                            case 1:
                                company = _b.sent();
                                return [4 /*yield*/, context.prisma.client.create({
                                        data: {
                                            companyName: data.companyName,
                                            iin: data.iin,
                                            contactFullName: data.contactFullName,
                                            contactRole: data.contactRole,
                                            email: data.email,
                                            note: data.note,
                                            address: data.address,
                                            phone: data.phone,
                                            companyId: company.id,
                                            createdById: userId,
                                            accounts: {
                                                create: data.accounts
                                            }
                                        }
                                    })];
                            case 2:
                                client = _b.sent();
                                return [2 /*return*/, client];
                        }
                    });
                });
            }
        });
        t.field('deleteClient', {
            type: 'Client',
            args: {
                id: schema_1.idArg()
            },
            resolve: function (_parent, _a, context) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, context.prisma.client["delete"]({
                                where: {
                                    id: id
                                }
                            })];
                    });
                });
            }
        });
        // t.field('updateClient', {
        //   type: 'Client',
        //   args: {
        //     id: idArg(),
        //     data: arg({ type: 'ClientInput' })
        //   },
        //   resolve: async (_parent, { id, data }, context: Context) => {
        //     const userId = getUserId(context)
        //     const existingClient = await context.prisma.client.({
        //       where: {
        //         id,
        //         createdById: userId
        //       }
        //     })
        //     if (!existingClient) {
        //       throw new Error('Client not found')
        //     }
        //     await context.prisma.client.update({
        //       where: {
        //         id
        //       },
        //       data: {
        //         ...data,
        //         accounts: data
        //       }
        //     })
        //     return client
        //   }
        // })
        // #endregion
        // //#region client api
        //     t.field('createClient', {
        //       type: 'Client',
        //       args: {
        //         data: arg({ type: 'ClientInput' }),
        //         companyId: idArg()
        //       },
        //       resolve: async (_parent, { companyId, data }, context) => {
        //         // todo: check for company ownership
        //         const client = await context.prisma.client.create({
        //           data
        //         })
        //         await context.prisma.company.update({
        //           where: {
        //             id: companyId
        //           },
        //           data: {
        //             clients: {
        //               connect: {
        //                 id: client.id
        //               }
        //             }
        //           }
        //         })
        //         return client
        //       }
        //     })
        //     t.field('updateClient', {
        //       type: 'Client',
        //       args: {
        //         data: arg({ type: 'ClientInput' }),
        //         clientId: idArg()
        //       },
        //       resolve: async (_parent, { clientId, data }, context) => {
        //         return await context.prisma.client.update({
        //           where: {
        //             id: clientId
        //           },
        //           data
        //         })
        //       }
        //     })
        //     t.field('deleteClient', {
        //       type: 'Client',
        //       args: {
        //         clientId: idArg(),
        //         companyId: idArg()
        //       },
        //       resolve: async (_parent, { companyId, clientId }, context) => {
        //         return context.prisma.company.update({
        //           where: {
        //             id: companyId
        //           },
        //           data: {
        //             clients: {
        //               delete: {
        //                 id: clientId
        //               }
        //             }
        //           }
        //         })
        //       }
        //     })
        // //#endregion
        // //#region invoice api
        //   t.field('createInvoice', {
        //     type: 'Invoice',
        //     args: {
        //       data: arg({ type: 'InvoiceInput' })
        //     },
        //     resolve: async (_parent, { data }: { data: IDocInput }, context) => {
        //       const invoice = await context.prisma.invoice.create({
        //         data: {
        //           company: {
        //             connect: {
        //               id: data.companyId
        //             }
        //           },
        //           client: {
        //             connect: {
        //               id: data.clientId
        //             }
        //           },
        //           account: {
        //             connect: {
        //               id: data.accountId
        //             }
        //           },
        //           draft: true,
        //           date: data.date,
        //           productLine: {
        //             create: data.productLine.map(v => ({
        //               product: {
        //                 connect: {
        //                   id: v.product
        //                 }
        //               },
        //               qty: v.qty
        //             }))
        //           }
        //         }
        //       })
        //       return invoice
        //     }
        //   })
        // //#endregion
        // //#region company api
        //     t.field('createCompany', {
        //       type: 'Company',
        //       args: {
        //         data: arg({ type: 'CompanyInput' })
        //       },
        //       resolve: async (_parent, { data }: { data: ICompanyInput }, context) => {
        //         const userId = getUserId(context)
        //         const company = await context.prisma.company.create({
        //           data: {
        //             name: data.name,
        //             user: {
        //               connect: {
        //                 id: userId
        //               }
        //             },
        //             stamp: 'not implemented',
        //             accounts: {
        //               create: data.accounts
        //             }
        //           }
        //         })
        //         return company
        //       }
        //     })
    }
    //#endregion
});
