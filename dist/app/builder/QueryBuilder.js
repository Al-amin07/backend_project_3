"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchFields) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchFields.map((el) => {
                    var _a;
                    return ({
                        [el]: { $regex: (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search, $options: 'i' },
                    });
                }),
            });
        }
        return this;
    }
    sort() {
        var _a, _b, _c, _d;
        let sortBy = 'createdAt';
        let sortOrder = 'asc';
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) {
            sortBy = (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortBy;
        }
        if ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.sortOrder) {
            sortOrder = (_d = this === null || this === void 0 ? void 0 : this.query) === null || _d === void 0 ? void 0 : _d.sortOrder;
        }
        this.modelQuery = this.modelQuery.sort({
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        });
        return this;
    }
    filter() {
        var _a, _b;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.filter) {
            this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.find({ _id: (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.filter });
        }
        return this;
    }
}
exports.default = QueryBuilder;
