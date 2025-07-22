import React, { useEffect } from "react";
import { Droplets } from "lucide-react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals } from "../../features/animal/animalSlice";
import { Link } from "react-router-dom";

function AllAnimalsPage() {
  const dispatch = useDispatch();
  const allAnimalPosts = useSelector((state) => state.animals.animals);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  return (
    <div className="h-min pt-5">
      <div className="mx-8 flex justify-between">
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
      <div className="grid grid-cols-4 grid-rows-2 gap-2 px-9 py-5">
        {allAnimalPosts.map((post, index) => {
          if (index < 8)
            return (
              <Link to={`/animals/${post.id}`}>
                <div className="flex items-center justify-center">
                  <Card
                    image={post.imageFile}
                    title={post.title}
                    description={post.description}
                    tag={post.tags}
                    size="sm"
                    orientation="vert"
                    date={Date.now()}
                  />
                </div>
              </Link>
            );
        })}
      </div>
    </div>
  );
}

export default AllAnimalsPage;
