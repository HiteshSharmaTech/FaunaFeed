import { Link } from "react-router-dom";

function Logo({ style = "", extraStyle = "" }) {
  return (
    <Link to={"/"}>
      <div className={`flex items-center space-x-2 ${style}`}>
        <div
          className={` bg-[#0fa930] rounded flex items-center justify-center ${extraStyle}`}
        >
          <span className="text-white font-bold text-lg">🦚</span>
        </div>
        <h2 className="text-xl font-bold text-[#146826]">FaunaFeed</h2>
      </div>
    </Link>
  );
}

export default Logo;
