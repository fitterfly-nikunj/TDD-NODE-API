const UserController = require('../controllers/user.controller');
module.exports = function (app) {
    app.get("/api/users", UserController.getAllUsers);
    app.post("/api/users", UserController.createUser);
    app.get("/api/users/:id", UserController.getUser);    
    app.put("/api/users/:id", UserController.updateUser);
    app.delete("/api/users/:id", UserController.deleteUser);

};
