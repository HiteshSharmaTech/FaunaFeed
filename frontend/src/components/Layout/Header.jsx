import { useSelector } from "react-redux";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Links({ to = "#", text }) {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
    >
      {text}
    </Link>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Logo />

          {/* Navigation Links and Buttons */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Links text={"Home"} to="/" />
              <Links text={"All Posts"} to="/animals"/>
              <Links text={"Add Post"} to="/animals/new"/>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/donate")}
                className="px-4 py-2 bg-[#DFFFD5] text-black rounded-md hover:bg-[#97ee84] transition-colors font-medium border border-[#1b9708]"
              >
                Donate
              </button>
              {!isUserAuthenticated ? (
                <>
                  {" "}
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="px-4 py-2 bg-[#f1f8b5] text-black rounded-md hover:bg-[#E0EF6C] transition-colors font-medium border border-amber-300"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/auth/signup")}
                    className="px-4 py-2 bg-[#DFFFD5] text-black rounded-md hover:bg-[#97ee84] transition-colors font-medium border border-[#1b9708]"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-pink-300 text-black rounded-md bg-[#ffb8f1] transition-colors font-medium border border-pink-300"
                  >
                    Profile
                  </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (hidden by default) */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <Links text={"Home"} />
            <Links text={"About Us"} />
            <Links text={"Features"} />
            <Links text={"Our Work"} />
            <Links text={"Contact"} />
            <div className="flex flex-col space-y-2 pt-2 ">
              <button className="px-4 py-2 bg-[#DFFFD5] text-black rounded-md hover:bg-green-300 transition-colors font-medium">
                Contact
              </button>
              <button className="px-4 py-2 bg-[#D4EFFF] text-black rounded-md hover:bg-blue-300 transition-colors font-medium border border-blue-300">
                Join Us
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
