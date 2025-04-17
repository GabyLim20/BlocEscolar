const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const rolController = require("../controllers/rolController")
const blocController = require("../controllers/blocController")
const commentsController = require("../controllers/commentsController")
const middleware = require("../middleware/authMiddleware");

router.post("/users", userController.crearUsuario);
router.get("/users", middleware.verifyToken, userController.getAllUser);
router.get("/users/:id", middleware.verifyToken, userController.getUserId);
router.post('/login', userController.loginUsuario);
router.put("/users/:id", middleware.verifyToken, userController.updateUser);
router.put("/user/change/:id", userController.changePassword);

router.post("/rol", middleware.verifyAdmin, rolController.createRol);
router.put("/rol/:id", middleware.verifyAdmin, rolController.editRol);
router.get("/rol", middleware.verifyAdmin, rolController.getRol);
router.delete("/rol/:id", middleware.verifyAdmin, rolController.deleteRol);

router.post("/bloc", middleware.verifyToken, blocController.createBloc);
router.put("/bloc/:id", middleware.verifyToken, blocController.editBloc);
router.delete("/bloc/:id", middleware.verifyToken, blocController.deletBloc);
router.get("/blocs", middleware.verifyToken, blocController.getBlocByTeacher);

router.post("/comments", middleware.verifyLogin, commentsController.create);
router.put("/comments/:id", middleware.verifyToken, commentsController.editComent);
router.delete("/comments/:id", middleware.verifyToken, commentsController.deletComent);
router.get("/comments/:id", commentsController.getCommentBybloc);

module.exports = router