import "swiper/swiper-bundle.css";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import * as yup from "yup";
import { useFormik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import { getImage, getNowPlaying } from "../../api";
import { PlayCircleIcon } from "lucide-react";
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).max(18).required("Password is required"),
});

type movieProps = {
  backdrop_path: string;
  poster_path: string;
};

export default function Login() {
  const navigate = useNavigate();

  const { data: nowPlayingMovies } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => getNowPlaying(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      navigate("/");
    },
  });
  return (
    <div className="h-screen">
      <div className="flex h-screen">
        <div className="w-full  flex flex-col items-center justify-center">
          <div className="max-w-sm min-w-[400px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full  mb-3">
                <Input
                  name="email"
                  placeholder="Enter your email..."
                  type="email"
                  label="Email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm italic ml-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="w-full  mb-3">
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="******"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm italic ml-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="w-full ">
                <Button
                  type="submit"
                  label="Login"
                  className="w-full bg-blue-700 text-white py-2 rounded-md"
                />
              </div>
            </form>
          </div>

          <div className="w-full max-w-sm min-w-[400px] mt-5">
            <p className="text-sm text-center text-gray-400 mb-3">login with</p>
            <span>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse) {
                    console.log(credentialResponse);
                    localStorage.setItem(
                      "googleCredential",
                      JSON.stringify(credentialResponse)
                    );
                    navigate("/");
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                  alert("Failed to login");
                }}
              />
            </span>
          </div>
        </div>

        <Swiper
          className="w-full"
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {nowPlayingMovies?.results.map((movie: movieProps, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="h-full"
                style={{
                  backgroundImage: `url(${getImage(movie.poster_path)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex gap-5 items-center ml-5">
                  <PlayCircleIcon
                    size={42}
                    className="animate-pulse"
                    color="blue"
                  />
                  <span className="text-white text-lg font-bold">
                    Now Playing
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
