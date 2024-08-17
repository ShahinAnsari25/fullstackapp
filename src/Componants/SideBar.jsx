import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [currentActivePage, setCurrentActivePage] = useState("");
  useEffect(() => {
    if (pathname.includes("peopleDirectory")) {
      setCurrentActivePage("peopleDirectory");
    } else {
      setCurrentActivePage("dashboard");
    }
  }, [pathname]);
  return (
    <div className="p-4">
      <div className="dashboard flex items-center gap-x-1">
        <svg
          className="h-7 w-7 fill-customPurple"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M384 96l0 128-128 0 0-128 128 0zm0 192l0 128-128 0 0-128 128 0zM192 224L64 224 64 96l128 0 0 128zM64 288l128 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
        </svg>
        <Link
          to={"/"}
          className={`text-lg font-semibold ${
            currentActivePage === "dashboard" ? "text-customPurple" : ""
          }`}
          onClick={() => {
            setCurrentActivePage("dashboard");
          }}
        >
          Dashboard
        </Link>
      </div>
      <div className="peopleDirectory flex items-center gap-x-1 mt-2">
        <svg
          className="h-7 w-7 fill-customPurple"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M384 96l0 128-128 0 0-128 128 0zm0 192l0 128-128 0 0-128 128 0zM192 224L64 224 64 96l128 0 0 128zM64 288l128 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
        </svg>
        <Link
          to={"/peopleDirectory"}
          className={`text-lg font-semibold ${
            currentActivePage === "peopleDirectory" ? "text-customPurple" : ""
          }`}
          onClick={() => {
            setCurrentActivePage("peopleDirectory");
          }}
        >
          People Directory
        </Link>
      </div>
    </div>
  );
};
export default SideBar;
