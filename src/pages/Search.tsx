import { useQuery } from "@tanstack/react-query";
import { getImage, getSearchMovie } from "../api";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
// import { useState } from "react";

type movieProps = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
};

export default function Search() {
  const { query } = useParams();
  //   const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: searchData, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchMovie(query),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading data ....</p>
      </div>
    );
  }
  console.log(query);
  return (
    <div className="w full h-full grid grid-cols-6 gap-6 overflow-auto p-3">
      {searchData?.results.map((result: movieProps, index: number) => (
        <div key={index} className="grid grid-cols-5 gap-4">
          <div className="w-64 bg-white shadow-md rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="relative">
              <img
                src={getImage(result.poster_path)}
                alt={result.title}
                className="w-full h-80 object-cover bg-center"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                onClick={() => console.log("first")}
              >
                <Heart className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
