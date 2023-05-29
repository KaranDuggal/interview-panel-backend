module.exports = {
    find: (TableName, findQuery) => {
        return Promise.resolve(TableName.find(findQuery, { __v: 0 }))
    },
    findById: (TableName, id) => {
        return Promise.resolve(TableName.findById(id, { __v: 0 }))
    },
    findOne: (TableName, findQuery) => {
        return Promise.resolve(TableName.findOne(findQuery, { __v: 0 }))
    },
    create: (TableName, body) => {
        return Promise.resolve(TableName.create(body)).then(data=>{
            data = JSON.parse(JSON.stringify(data)); delete data.__v;
            return data
        })
    },
    insertMany: (TableName, body) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(TableName.insertMany(body));
            } catch (err) {
                reject(err);
            }
        })
    },
    update: (TableName, findQuery, updateQuery) => {
        return Promise.resolve(TableName.updateOne(findQuery, updateQuery))
    },
    updateMany: (TableName, findQuery, updateQuery) => {
        return Promise.resolve(TableName.updateMany(findQuery, updateQuery))
    },
    delete: (TableName, findQuery) => {
        return Promise.resolve(TableName.deleteOne(findQuery))
    },
    deleteMany: (TableName, findQuery) => {
        return Promise.resolve(TableName.deleteMany(findQuery))
    },
    aggregate: (TableName, aggregation) => {
        return Promise.resolve(TableName.aggregate(aggregation))
    }
}