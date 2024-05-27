import { useNavigate } from "react-router-dom";
import IMAGE from "../assets/footer/footer.jpg";

/**
 * COMPONENT: Footer
 * PURPOSE: Displays the footer of the website with an image background, title, project information, and copyright details.
 *
 * USAGE: Place on the bottom of the page layout.
 */

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="relative p-10 w-full bg-green-700 border-t-8 border-green-300 flex items-center justify-center">
      <img
        src={IMAGE}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm opacity-30"
      />

      <div className="flex flex-col items-center pl-12 z-10">
        <h1 className="font-black text-2xl text-white xl:inline ">
          FARM-TO-TABLE
        </h1>
        <h2 className="text-xl text-white">A CMSC 100 Project</h2>
        <h3 className="text-sm text-white">
          © University of the Philippines Los Baños 2024
        </h3>
      </div>
    </div>
  );
}
