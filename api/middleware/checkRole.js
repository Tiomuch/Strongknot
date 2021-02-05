const Role = {
  admin : {
    updateAnyPost: true,
    updateOwnPost: true,
    deleteAnyPost: true,
    deleteOwnPost: true
  },
  basic : {
    updateAnyPost: false,
    updateOwnPost: true,
    deleteAnyPost: false,
    deleteOwnPost: true
  }
}

module.exports = Role
