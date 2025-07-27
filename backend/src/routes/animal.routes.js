import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createAnimalBlog,
  editAnimalBlog,
  deleteAnimalBlog,
  getAnimalBlog,
  getAllAnimalBlogs,
  changeLikeCount,
  changeViewCount,
} from "../controllers/animal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/animals").get(getAllAnimalBlogs);
router
  .route("/animals/:blogSlug")
  .get(getAnimalBlog)
  .patch(upload.single("imageFile"), editAnimalBlog)
  .delete(deleteAnimalBlog);
router.route("/animals/:blogSlug/like").post(changeLikeCount);
router.route("/animals/:blogSlug/view").post(changeViewCount);
router.route("/animals/new").post(upload.single("imageFile"), createAnimalBlog);

export default router;
