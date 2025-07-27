import React, { useState, useRef } from "react";
import { X, Plus, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAnimal } from "../../features/animal/animalSlice";
import { useNavigate } from "react-router-dom";

export default function AnimalForm() {
  const predefinedTags = [
    "mammal",
    "bird",
    "reptile",
    "amphibian",
    "fish",
    "invertebrate",
    "endangered",
    "extinct",
    "domestic",
    "wild",
    "carnivore",
    "herbivore",
    "omnivore",
    "nocturnal",
    "diurnal",
    "aquatic",
    "terrestrial",
    "aerial",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      imageFile: "",
      tags: [],
    },
  });

  const watchedTags = watch("tags") || [];
  const watchedTitle = watch("title") || "";
  const watchedDescription = watch("description") || "";
  const watchedImageFile = watch("imageFile") || "";

  const addTag = (tag) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !watchedTags.includes(tag)) {
      setValue("tags", [...watchedTags, trimmedTag], { shouldValidate: true });
    }
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const handleAddNewTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(newTag);
    }
  };

  const filteredTags = predefinedTags.filter(
    (tag) =>
      tag.toLowerCase().includes(newTag.toLowerCase()) &&
      !watchedTags.includes(tag)
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);

    if (data.imageFile[0]) formData.append("title", data.title);

    try {
      // Api call for submitting
      dispatch(getAnimal(formData)).then((data) => {
        if (data) setAnimalData(data);
        navigate(`/animals/${data.slug}`);
      });

      setSubmitSuccess(true);

      setTimeout(() => {
        reset();
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(errors.title);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#f5f9f5] p-5">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Animal
            </h2>
            <p className="text-gray-600">
              Fill in the details to add a new animal to the database
            </p>
          </div>

          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title *
              </label>
              <div className="relative">
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 10,
                      message: "Title must be atleast 10 character long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title must not be greater than 100 characters",
                    },
                    validate: {
                      noSpecialChars: (value) =>
                        /^[a-zA-Z0-9 ]*$/.test(value) ||
                        "No special characters allowed",
                    },
                  })}
                  id="title"
                  name="title"
                  type="text"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.title
                      ? "border-red-500 bg-red-50"
                      : dirtyFields.title && !errors.title
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g., African Elephant"
                />
                <div className="absolute right-3 top-3">
                  {dirtyFields.title && !errors.title && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {watchedTitle.length}/100
                </p>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 100,
                    message: "Description must be atleast 100 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Description can have atmost 1000 characters",
                  },
                })}
                id="description"
                name="description"
                rows={4}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.description
                    ? "border-red-500 bg-red-50"
                    : dirtyFields.description && !errors.description
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                placeholder="Provide a detailed description of the animal..."
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {watchedDescription.length}/1000 (min: 100)
                </p>
              </div>
            </div>

            {/* Image URL Field */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                htmlFor="imageFile"
              >
                Upload file *
              </label>
              <input
                {...register("imageFile", {
                  required: "Please select a file to upload",
                  validate: {
                    lessThan10MB: (files) =>
                      files[0].size < 10 * 1024 * 1024 ||
                      "Files must be less than 10MB",
                    acceptedFormat: (files) =>
                      ["image/jpeg", "image/png", "application/pdf"].includes(
                        files[0]?.type
                      ) || "Only JPEG, PNG, and PDF files are allowed",
                  },
                })}
                // ref={(e) => {
                //   register(e);
                //   imageFileInputRef.current = e;
                // }}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg 
              bg-gray-50
              h-8 
              cursor-pointer"
                id="imageFile"
                type="file"
              />
              {watchedImageFile?.[0] && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {watchedImageFile[0].name} (
                  {Math.round(watchedImageFile[0].size / 1024)} KB)
                </div>
              )}

              {errors.file && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.file.message}
                </p>
              )}
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags * (Select or add custom tags)
              </label>

              {/* Selected Tags Display */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem] p-3 border rounded-lg bg-gray-50">
                {watchedTags.length > 0 ? (
                  watchedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No tags selected
                  </span>
                )}
              </div>

              {/* Tag Input */}
              <div className="relative">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddNewTag}
                  onFocus={() => setShowTagDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowTagDropdown(false), 200)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type to add or search tags..."
                />
                <button
                  type="button"
                  onClick={() => addTag(newTag)}
                  className="absolute right-2 top-2 p-1 text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Tag Dropdown - Static example */}
              {showTagDropdown && (newTag || filteredTags.length > 0) && (
                <div className="mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                  {newTag && !predefinedTags.includes(newTag.toLowerCase()) && (
                    <button
                      type="button"
                      onClick={() => addTag(newTag)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 border-b"
                    >
                      Add "{newTag}" as new tag
                    </button>
                  )}
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {errors.tags && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.tags.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                // disabled={isSubmitting || !isValid}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : submitSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding Animal...
                  </span>
                ) : submitSuccess ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Animal Added Successfully!
                  </span>
                ) : (
                  "Add Animal"
                )}
              </button>
            </div>

            {/* Alternative states for the button - uncomment as needed */}
            {/* Loading state */}
            {/* <div className="pt-4">
            <button
              type="submit"
              disabled
              className="w-full py-4 px-6 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed transition-all duration-200"
            >
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Adding Animal...
              </span>
            </button>
          </div> */}

            {/* Success state */}
            {/* <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-200"
            >
              <span className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Animal Added Successfully!
              </span>
            </button>
          </div> */}
          </div>
          {submitSuccess && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">Success!</p>
              <p>
                The animal has been added to the database. The form will reset
                automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
