import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createAnimalBlog,
  editAnimalBlog,
  deleteAnimalBlog,
  getAnimalBlog,
  getAllAnimalBlogs,
} from "../controllers/animal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/animals").get(getAllAnimalBlogs);
router
  .route("/animals/:id")
  .get(getAnimalBlog)
  .patch(editAnimalBlog)
  .delete(deleteAnimalBlog);
router.route("/animals/new").post(upload.single("imageFile"), createAnimalBlog);

export default router;
