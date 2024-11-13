import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import SmoothModal from "../components/Modal";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-1/2 ">
        <h1 className="text-3xl font-bold mb-4 text-center mt-5">Settings</h1>
        <div className="mb-3">
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="******"
          />
        </div>
        <div className="flex gap-6">
          <Button
            label="Update Profile"
            className="bg-blue-700 text-white px-10 py-3 rounded-lg"
          />
          <Button
            label="Logout"
            onClick={handleModalOpen}
            className="bg-red-700 text-white px-10 py-3 rounded-lg"
          />
        </div>
      </div>
      <SmoothModal isOpen={isModalOpen} onClose={handleModalClose}>
        <div>
          <div className="px-8 py-5 flex items-center justify-between">
            <h3 className=" leading-6">Logout</h3>
            <XCircle
              onClick={handleModalClose}
              className="hover:cursor-pointer"
              size={36}
            />
          </div>
          <div className="text-gray-500 text-center mb-1">
            Are you sure you want to logout from moviedb?
          </div>
          <div className="m-5 flex gap-6">
            <Button
              label="Yes"
              className="px-5 py-3 bg-red-700 rounded-lg text-white"
              onClick={handleLogout}
            />
            <Button
              label="No"
              className="px-5 py-3 bg-blue-700 rounded-lg text-white"
              onClick={handleModalClose}
            />
          </div>
        </div>
      </SmoothModal>
    </div>
  );
}
