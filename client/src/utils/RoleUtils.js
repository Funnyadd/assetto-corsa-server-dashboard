exports.getRoleNeeded = (isManager, isAdmin) => {
    if (isManager) return 2
    else if (isAdmin) return 1
    return 3
}