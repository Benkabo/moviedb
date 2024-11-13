import { Link, Outlet, useNavigate } from "react-router-dom";
import { SearchInput } from "../components/SearchInput";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import { Heart, Settings } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

interface SignedUserProps extends JwtPayload {
  name?: string;
  picture?: string;
  email?: string;
}

export default function Layout() {
  const navigate = useNavigate();
  const [userDetail, setuserDetails] = useState<SignedUserProps>();
  const usercredentials = localStorage.getItem("googleCredential");
  const [searchquery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (usercredentials) {
      const credential = JSON.parse(usercredentials);
      const decode = jwtDecode(credential?.credential);
      setuserDetails(decode);
    }
  }, [usercredentials]);

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.length) {
      navigate(value ? `/search/${value}` : "/");
    }
  };

  const handleEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      navigate(target.value ? `/search/${target.value}` : "/");
    }
  };

  return (
    <>
      <div className=" border-b shadow-sm w-screen">
        <header className="fixed top-0 z-10 flex items-center justify-between px-10 py-3 bg-white shadow-md w-screen ">
          <div className="flex items-center gap-5">
            <Link to={"/"}>
              <p className="uppercase font-bold text-lg">Moviedb</p>
            </Link>
            <nav>
              <ul className="flex gap-5">
                <li>
                  <a href="/#movies">Movies</a>
                </li>
                <li>
                  <a href="/#tv">TV Shows</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full max-w-sm min-w-[500px]">
            <SearchInput
              name="search"
              placeholder="Search movies here..."
              value={searchquery}
              onChange={handleInputValue}
              onKeyDown={handleEnterDown}
            />
          </div>
          <div className="flex">
            {userDetail ? (
              <div className="flex items-center gap-5">
                <div>
                  <p>Welcome</p>
                  {userDetail?.email}
                </div>
                <div>
                  <Settings
                    onClick={() => navigate("/settings")}
                    className="hover:cursor-pointer"
                    size={36}
                  />
                  {/* <LogOutIcon
                    className="hover:cursor-pointer"
                    color="red"
                    onClick={handleLogout}
                  /> */}
                </div>
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </div>
        </header>
      </div>
      <div className="mt-[80px]">
        <Outlet />
      </div>
      <div className=" w-full flex items-center justify-center h-[100px] border-t shadow-lg ">
        <span className="flex">
          @ {new Date().getFullYear()} Made with{" "}
          <Heart color="red" style={{ padding: "0 10" }} /> by Benedict kaboyoka
        </span>
      </div>
    </>
  );
}
