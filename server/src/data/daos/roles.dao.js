const database = require("../database");
const RoleModel = database.roles;

exports.getRoleById = async (id, roleModel = RoleModel) => {
    return new Promise((resolve, reject) => {
        roleModel.findOne({
            where: { id: id }
        })
        .then(async data => {
            if (data) resolve(data.dataValues)
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}

exports.getAllRoles = async (roleModel = RoleModel) => {
    return new Promise((resolve, reject) => {
        roleModel.findAll()
        .then(async data => {
            if (data) {
                let returnData = []
                for (let r = 0; r < data.length; r++) {
                    returnData.push({
                        id: data[r].dataValues.id,
                        name: data[r].dataValues.name
                    })
                }
                resolve(returnData)
            }
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}