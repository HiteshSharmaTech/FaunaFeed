import { useEffect, useState } from "react";
import { Droplets } from "lucide-react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchAnimals } from "../../features/animal/animalSlice";

function HomePage() {
  const dispatch = useDispatch();
  const animalsPosts = useSelector((state) => state.animals.animals);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const searchPosts = () => {
    console.log(searchInput);
    const foundPost = animalsPosts.find((post) => post.title === searchInput);
    console.log(foundPost);
    navigate(`/animals/${foundPost.id}`);
    setSearchInput("");
  };

  return (
    <div className="h-200">
      {/* Hero section */}
      <div className="h-80 w-full bg-[url('./assets/images/pexels-phreewil-535431.jpg')] bg-cover bg-center flex items-center p-10">
        <div className="flex flex-col">
          <p className="text-gray-100 mb-1">Home &#60; What We Do</p>
          <div style={{ width: "665px" }}>
            <h1 className="text-white text-4xl mb-3">
              Nature Is Essential For The Survival Of All Life On Earth. But
              It's Diminishing, Fast.
            </h1>
          </div>
          <div className="flex">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              type="text"
              className="bg-white rounded-xl w-70 pl-3 mr-2"
              placeholder="🔍 Search News..."
              id="searchInput"
            />
            <button
              onClick={() => {
                if (!searchInput) return;
                searchPosts();
              }}
              className="text-black bg-[#E8F9A1] rounded-xl w-18 hover:bg-[#e0ef6c]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Popular article section */}
      <div>
        <div className="mt-5 mx-8 flex justify-between">
          <h4 className="text-gray-900 ">What We Do</h4>
          <Droplets className="text-gray-500" />
        </div>
        <div className="mx-8 flex justify-between">
          <h1 className="text-4xl">Popular Articles</h1>
          <p
            className="text-xs text-gray-400 text-wrap mt-1 "
            style={{ width: "245px" }}
          >
            Flora & Fauna has been using the collective knowledge and experience
            to consever nature
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-2 h-min m-5">
          <div className="row-span-3">
            <Link to={`/animals/${animalsPosts[0].id}`}>
              <Card
                id={animalsPosts[0].id}
                image={animalsPosts[0].imageFile}
                title={animalsPosts[0].title}
                description={animalsPosts[0].description}
                tags={animalsPosts[0].tags}
                size="md"
                orientation="vert"
                date={Date.now()}
              />
            </Link>
          </div>
          {animalsPosts.map((post, index) => {
            if (index >= 1 && index < 4)
              return (
                <div>
                  <Link to={`/animals/${post.id}`}>
                    <Card
                      id={post.id}
                      image={post.imageFile}
                      title={post.title}
                      description={post.description}
                      tags={post.tags}
                      size="hsm"
                      orientation="horiz"
                      date={Date.now()}
                    />
                  </Link>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
