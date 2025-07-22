import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  function backToHome() {
    navigate("/");
  }

  return (
    <>
      <Header />
      <main>
        <div className="h-90 flex flex-col items-center justify-center">
          <img
            src="https://leetcode.com/static/images/404_face.png"
            alt="error"
            className="h-45"
          />
          <h2 className="text-3xl text-[#424242] font-bold">Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sorry, but we can't find the page you're looking for...
          </p>
          <button
            onClick={backToHome}
            className="mt-5 flex text-md border-1 border-gray-400 p-1 rounded-xl hover:bg-gray-300"
          >
            <House className="mx-1" />
            Back to Home
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;
