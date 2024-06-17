
exports.hasPermission = (res, neededRoleId) => {
    if (res.locals.roleId <= neededRoleId)  {
        return true
    }

    res.status(403).send("Forbidden")
    return false
}