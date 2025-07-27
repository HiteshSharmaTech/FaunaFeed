import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Animal } from "../models/animal.model";

const createSlugFromTitle = (title) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-");
};

export const createAnimalBlog = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  if (!title && !description && tags.length <= 0) {
    throw new ApiError(401, "Title , Description and tags are needed");
  }
  const titleSlug = createSlugFromTitle(title);
  const localFilePath = req.file?.path;
  const uploadedFile = await uploadOnCloudinary(localFilePath);

  if (!uploadedFile) {
    throw new ApiError(402, "Image updated on cloudinary failed");
  }

  const existedBlog = await Animal.findOne({ slug: titleSlug });
  if (!existedBlog) {
    throw new ApiError(
      405,
      "Blog with same title already exists , create blog with different title"
    );
  }
  const createdBlog = await Animal.create({
    title,
    slug: titleSlug,
    imageFile: uploadedFile.url,
    description,
    tags,
  });

  if (!createdBlog) {
    throw new ApiError(406, "Error while creating blog");
  }

  res
    .statusCode(220)
    .json(new ApiResponse(220, createdBlog, "Blog created successfully"));
});

export const editAnimalBlog = asyncHandler(async (req, res) => {
  const blogSlug = req.params?.blogSlug;
  if (!blogSlug) {
    throw new ApiError(401, "Please enter a valid slug");
  }
  const { title, description, tags } = req.body;
  if (!title && !description && !tags) {
    throw new ApiError(404, "All fields are required to edit blog in db");
  }
  // delete on cloudinary

  const response = await uploadOnCloudinary(req.file?.path);
  if (!res) {
    throw new ApiError(405, "Image updating failed");
  }
  const newBlogSlug = createSlugFromTitle(title);

  const updatedBlog = await Animal.findOneAndUpdate(
    { slug: blogSlug },
    {
      title,
      description,
      tags,
      imageFile: response.url,
      slug: newBlogSlug,
    },
    { new: true }
  );

  res
    .statusCode(204)
    .json(new ApiResponse(220, updatedBlog, "Blog updated successfully"));
});

export const deleteAnimalBlog = asyncHandler(async (req, res) => {
  const blogSlug = req.params?.blogSlug;

    const deletedAnimalBlog = await Animal.findOneAndDelete({ slug: blogSlug });
    if (!deletedAnimalBlog) {
        throw new ApiError(405,"Blog deletion failed")
    }
    res.statusCode(204).json(new ApiResponse(220,deletedAnimalBlog,"Blog deleted successfully"))
});

export const getAnimalBlog = asyncHandler(async (req, res) => {
    const blogSlug = req.params?.blogSlug
    const response = await Animal.findOne({slug:blogSlug})
    if (!response) {
        throw new ApiError(402,"Failed to fetch blog")
    }
    res.statusCode(230).json(new ApiResponse(220,response,"Blog fetched successfully"))
});

export const getAllAnimalBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await Animal.find()
    if (!allBlogs) {
        throw new ApiError(404,"Failed to fetch all blogs")
    }
    res.statusCode(210).json(new ApiResponse(220,allBlogs,"Successfully fetched all blogs"))
});

export const changeviewCount = asyncHandler(async (req, res) => { 
    const blogSlug = req.params?.blogSlug
    if (!blogSlug) {
        throw new ApiError(402,"Please choose a valid blog or blog with valid slug")
    }
    const blog = await Animal.findOne({slug:blogSlug})
    const { viewCount } = req.body
    if (!viewCount) {
        throw new ApiError(494,"Something went wrong")
    }
    blog.ViewsCount += viewCount
    blog.isNew = false
    const response = await blog.save()
    if (!response) {
        throw new ApiError(406,"Views count updation failed")
    }
   res.statusCode(230).json(new ApiResponse(220,response,"Views count updated successfully"))
});

export const changeViewCount = asyncHandler(async (req, res) => {
    const blogSlug = req.params?.blogSlug
    if (!blogSlug) {
        throw new ApiError(402,"Please choose a valid blog or blog with valid slug")
    }
    const blog = await Animal.findOne({slug:blogSlug})
    const { viewCount } = req.body
    if (!viewCount) {
        throw new ApiError(494,"Something went wrong")
    }
    blog.viewsCount += viewCount
    blog.isNew = false
    const response = await blog.save()
    if (!response) {
        throw new ApiError(406,"Views count updation failed")
    }
   res.statusCode(230).json(new ApiResponse(220,response,"Views count updated successfully"))
});
