import "swiper/swiper-bundle.css";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQuery } from "@tanstack/react-query";
import { getImage, getMovieDetails, getPopularMovies } from "../../api";
import { useState } from "react";
import { Button } from "../../components/Button";
import TrendingMovies from "../TrendingMovies";
import TrendingSeries from "../TrendingSeries";
import SmoothModal from "../../components/Modal";
import { Star, XCircle } from "lucide-react";

type movieProps = {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  overview: string;
};

export default function Home() {
  const [page] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | undefined>();

  const {
    data: populaMovies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["populaMovies", page],
    queryFn: () => getPopularMovies(page),
  });

  const { data: movieDetails, isLoading: loadMovieDetails } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (id: number) => {
    setIsModalOpen(true);
    setMovieId(id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load popular movies...</p>;
  }

  return (
    <div className=" flex flex-col my-5 mx-10">
      <div className="w-full h-[700px]">
        <Swiper
          className="w-full"
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {populaMovies?.results.map((movies: movieProps, index: number) => (
            <SwiperSlide key={index}>
              <div key={index} className="w-full h-[700px]">
                <div
                  className="h-full rounded-3xl relative"
                  style={{
                    backgroundImage: `url(${getImage(movies.poster_path)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex flex-col absolute bottom-1/3 ml-10">
                    <span className="text-white text-3xl font-bold">Movie</span>
                    <span className="text-white uppercase font-bold text-4xl">
                      {movies.title}
                    </span>
                    <span className="text-white text-xl">
                      {movies.release_date}
                    </span>
                    <span className="text-white text-xl w-1/2 my-2 mb-5 text-pretty">
                      {movies.overview}
                    </span>
                    <span className="flex gap-5">
                      <Button
                        label="Watch trailer"
                        className="bg-blue-700 text-white py-3 px-5 rounded-lg"
                      />
                      <Button
                        onClick={() => handleModalOpen(movies.id)}
                        label="More Info"
                        className=" bg-gray-600 text-white py-3 px-5 rounded-lg"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-20">
        <TrendingMovies />
      </div>

      <div className="mt-20">
        <TrendingSeries />
      </div>

      <SmoothModal isOpen={isModalOpen} onClose={handleModalClose}>
        {loadMovieDetails ? (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center">Loading movie details....</p>
          </div>
        ) : (
          <>
            {movieDetails && (
              <div className="">
                <div
                  className="rounded-2xl rounded-b-none h-[600px]"
                  style={{
                    backgroundImage: `url(${getImage(
                      movieDetails.poster_path
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="px-8 py-5 flex items-center justify-between">
                    <h3 className="text-xl text-white font-bold uppercase leading-6">
                      {movieDetails?.original_title}
                    </h3>
                    <XCircle
                      onClick={handleModalClose}
                      className="hover:cursor-pointer"
                      size={36}
                      color="white"
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-col px-5 mb-1">
                  <span className="underline italic">Description</span>
                  <span>{movieDetails.overview}</span>
                </div>

                <div className="mt-2 flex flex-col px-5 mb-1">
                  <span className="underline italic">Tagline</span>
                  <span>{movieDetails.tagline}</span>
                </div>

                <div className="flex flex-col px-5 mb-1">
                  <span className="underline italic">Genre</span>
                  <span>
                    {movieDetails?.genres.map(
                      (genre: { name: string }, index: number) => (
                        <span key={index} className="mr-5">
                          {genre.name}
                        </span>
                      )
                    )}
                  </span>
                </div>
                <div className="flex flex-col px-5 mb-1">
                  <span className="underline italic">Release date</span>
                  <span>{movieDetails.release_date}</span>
                </div>
                <div className="flex flex-col px-5 mb-1">
                  <span className="underline italic">Languages</span>
                  <span>
                    {movieDetails?.spoken_languages.map(
                      (language: { english_name: string }, index: number) => (
                        <span key={index} className="mr-5">
                          {language.english_name}
                        </span>
                      )
                    )}
                  </span>
                </div>
                <div className="mt-2 flex flex-col px-5 mb-1">
                  <span className="underline italic">Rating</span>
                  <div className="flex gap-2">
                    <Star fill="yellow" color="yellow" />
                    <span>{movieDetails.vote_average}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </SmoothModal>
    </div>
  );
}
