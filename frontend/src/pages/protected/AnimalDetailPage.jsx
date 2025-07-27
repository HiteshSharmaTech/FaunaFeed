import React, { useEffect, useState } from "react";
import { Calendar, Clock, Eye, Share2, Bookmark, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimal } from "../../features/animal/animalSlice";
import { useParams } from "react-router-dom";

export default function AnimalDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [animalData, setAnimalData] = useState({});
  useEffect(() => {
    dispatch(getAnimal(params.blogSlug)).then((data) => {
      if (data) setAnimalData(data);
    });
  }, [dispatch]);
  console.log(animalData);
  // Sample data that would come from the form submission
  // const animalData = {
  //   title: "African Elephant",
  //   description: "The African elephant is the largest living terrestrial animal and is found throughout sub-Saharan Africa. These magnificent creatures are known for their intelligence, strong family bonds, and complex social structures. They play a crucial role in their ecosystem by creating water holes used by other wildlife and dispersing seeds through their dung. African elephants have large ears shaped like the African continent, which help them regulate body temperature in the hot climate. Their trunks contain over 40,000 muscles and are used for communication, feeding, drinking, and showing affection. Sadly, these gentle giants face threats from poaching for their ivory tusks and habitat loss due to human encroachment.",
  //   imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  //   tags: ["mammal", "endangered", "herbivore", "wild", "terrestrial"]
  // };

  return (
    <article className="max-w-4xl mx-auto bg-white">
      {/* Header Section */}
      <header className="mb-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="hover:text-blue-600 cursor-pointer">Animals</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{animalData.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {animalData.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">March 15, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">5 min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm">2.4k views</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {animalData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={animalData.imageFile}
            alt={animalData.title}
            className="w-full h-96 md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <p className="text-sm text-gray-500 text-center mt-3 italic">
          A magnificent {animalData.title} in its natural habitat
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Article Content */}
        <div className="lg:col-span-3">
          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl leading-relaxed text-gray-700 space-y-6">
              {animalData.description.split(". ").map((sentence, index) => (
                <p key={index} className="mb-4">
                  {sentence}
                  {index < animalData.description.split(". ").length - 1
                    ? "."
                    : ""}
                </p>
              ))}
            </div>
          </div>

          {/* Key Facts Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600">
                  Classification:
                </span>
                <span className="text-gray-900 capitalize">
                  {animalData.tags.find((tag) =>
                    ["mammal", "bird", "reptile", "amphibian", "fish"].includes(
                      tag
                    )
                  ) || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Diet:</span>
                <span className="text-gray-900 capitalize">
                  {animalData.tags.find((tag) =>
                    ["carnivore", "herbivore", "omnivore"].includes(tag)
                  ) || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Habitat:</span>
                <span className="text-gray-900 capitalize">
                  {animalData.tags.find((tag) =>
                    ["aquatic", "terrestrial", "aerial"].includes(tag)
                  ) || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Status:</span>
                <span
                  className={`capitalize font-medium ${
                    animalData.tags.includes("endangered")
                      ? "text-red-600"
                      : animalData.tags.includes("extinct")
                      ? "text-gray-600"
                      : "text-green-600"
                  }`}
                >
                  {animalData.tags.find((tag) =>
                    ["endangered", "extinct"].includes(tag)
                  ) || "Stable"}
                </span>
              </div>
            </div>
          </div>

          {/* Conservation Section */}
          {animalData.tags.includes("endangered") && (
            <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Conservation Status
              </h3>
              <p className="text-red-700 font-medium mb-4">
                ⚠️ This species is currently endangered
              </p>
              <p className="text-gray-700">
                This species faces significant threats to its survival and
                requires immediate conservation efforts. Habitat protection,
                anti-poaching measures, and community involvement are crucial
                for their preservation.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Action Buttons */}
          <div className="sticky top-8 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h4 className="font-semibold text-gray-900 mb-4">
                Engage with this article
              </h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  Like (247)
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            {/* Related Tags */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h4 className="font-semibold text-gray-900 mb-4">
                Related Topics
              </h4>
              <div className="space-y-2">
                {[
                  "Wildlife Conservation",
                  "African Safari",
                  "Endangered Species",
                  "Elephant Behavior",
                  "Habitat Protection",
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm py-1 hover:underline"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h4 className="font-semibold text-gray-900 mb-4">
                About the Author
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  WR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Wildlife Researcher
                  </div>
                  <div className="text-sm text-gray-600">
                    Expert Contributor
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Dedicated to wildlife conservation and education, sharing
                knowledge about endangered species worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16 p-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Help Protect Wildlife</h3>
        <p className="mb-6 text-green-100">
          Learn more about conservation efforts and how you can make a
          difference in protecting endangered species.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Learn More
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
            Donate Now
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <span>← Previous Article</span>
          </button>
          <div className="text-sm text-gray-500">
            Article 1 of 156 in Wildlife Series
          </div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <span>Next Article →</span>
          </button>
        </div>
      </div>
    </article>
  );
}
