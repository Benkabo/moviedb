import "swiper/swiper-bundle.css";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Heart, Star, XCircle } from "lucide-react";
import { getImage, getSeriesdetails, getTrendingSeries } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SmoothModal from "../components/Modal";

type trendingSeriesProps = {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
};

export default function TrendingSeries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seriesId, setSeriesId] = useState<number | undefined>();
  const {
    data: trendingShows,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["series"],
    queryFn: () => getTrendingSeries(),
  });

  const { data: seriesDetails, isLoading: loadMovieDetails } = useQuery({
    queryKey: ["movieDetails", seriesId],
    queryFn: () => getSeriesdetails(seriesId),
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (id: number) => {
    setIsModalOpen(true);
    setSeriesId(id);
  };

  const onAddToWishlist = () => {
    console.log("Added");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load popular movies...</p>;
  }

  return (
    <div id="tv">
      <div className="mb-2 ml-2">
        <span className="text-3xl font-extrabold">Trending TV Shows</span>
      </div>

      <Swiper
        className="rounded-3xl"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {trendingShows?.results.map(
          (series: trendingSeriesProps, index: number) => (
            <SwiperSlide key={index}>
              <div className="w-64 bg-white shadow-md rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={getImage(series.poster_path)}
                    alt={"hello"}
                    className="w-full h-80 object-cover bg-center"
                    onClick={() => handleModalOpen(series.id)}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                    onClick={onAddToWishlist}
                  >
                    <Heart className="w-6 h-6 text-gray-700" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <SmoothModal isOpen={isModalOpen} onClose={handleModalClose}>
        {loadMovieDetails ? (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center">Loading movie details....</p>
          </div>
        ) : (
          <>
            {seriesDetails && (
              <div className="">
                <div
                  className="rounded-2xl rounded-b-none h-[600px]"
                  style={{
                    backgroundImage: `url(${getImage(
                      seriesDetails.poster_path
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="px-8 py-5 flex items-center justify-between">
                    <h3 className="text-xl text-white font-bold uppercase leading-6">
                      {seriesDetails?.original_name}
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
                  <span>{seriesDetails.overview}</span>
                </div>

                <div className="mt-2 flex flex-col px-5 mb-1">
                  <span className="underline italic">Tagline</span>
                  <span>{seriesDetails.tagline}</span>
                </div>

                <div className="flex flex-col px-5 mb-1">
                  <span className="underline italic">Genre</span>
                  <span>
                    {seriesDetails?.genres.map(
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
                  <span>{seriesDetails.release_date}</span>
                </div>
                <div className="flex flex-col px-5 mb-1">
                  <span className="underline italic">Languages</span>
                  <span>
                    {seriesDetails?.spoken_languages.map(
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
                    <span>{seriesDetails.vote_average}</span>
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
