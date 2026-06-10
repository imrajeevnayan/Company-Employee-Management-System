// import type { ReactNode } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   HouseFill,
//   Globe,
//   Map,
//   MapFill,
//   ImageFill,
//   CircleHalf,
//   Search,
//   ListOl,
//   FileEarmarkArrowDownFill,
//   CheckSquareFill,
//   MenuButtonWideFill,
// } from "react-bootstrap-icons";

// function Layout({ children }: { children: ReactNode }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token"); // 👈 check if user logged in

//   const navItemClass = (path: string) =>
//     `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded fs-6 ${
//       location.pathname === path
//         ? "active fw-semibold shadow-sm bg-primary text-white"
//         : "text-dark"
//     }`;

//   // 👇 Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
//       {/* ---------- Header Section ---------- */}
//       <header className="bg-dark text-white px-4 py-3 sticky-top shadow-sm d-flex align-items-center justify-content-between">
//         <h1 className="fs-5 fw-bold m-0"> <img style={{ height: "50px", width: "200px" }} src="/ShiwanshSolutionsLogo.svg" alt="Logo" /> </h1>


//         {/* Conditionally render buttons based on login status */}
//         <div className="d-flex align-items-center gap-3">
//           {token ? (
//             // ✅ Show Logout when logged in
//             <button
//               className="btn btn-danger btn-sm"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           ) : (
//             // ❌ Show Login & Register when logged out
//             <>
//               <Link
//                 to="/login"
//                 className={`btn btn-outline-light btn-sm ${
//                   location.pathname === "/login" ? "active" : ""
//                 }`}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className={`btn btn-primary btn-sm ${
//                   location.pathname === "/register" ? "active" : ""
//                 }`}
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </header>

//       {/* ---------- Sidebar + Main ---------- */}
//       <div className="d-flex flex-grow-1">
//         {/* Sidebar */}
//         <aside
//           className="bg-white border-end d-flex flex-column p-3 shadow-sm"
//           style={{ width: "240px" }}
//         >
//           <h6 className="text-uppercase text-muted mb-3 ps-2 small">
//             Navigation
//           </h6>
//           <nav className="nav nav-pills flex-column gap-1">
//             <Link to="/" className={navItemClass("/")}>
//               <HouseFill size={16} /> Language
//             </Link>
//             <Link to="/country" className={navItemClass("/country")}>
//               <Globe size={16} /> Country
//             </Link>
//             <Link to="/state" className={navItemClass("/state")}>
//               <Map size={16} /> State
//             </Link>
//             <Link to="/district" className={navItemClass("/district")}>
//               <MapFill size={16} /> District
//             </Link>
//             <Link to="/imageupload" className={navItemClass("/imageupload")}>
//               <ImageFill size={16} /> Image Upload
//             </Link>
//             <Link to="/radiobutton" className={navItemClass("/radiobutton")}>
//               <CircleHalf size={16} /> Radio Button
//             </Link>
//             <Link to="/searching" className={navItemClass("/searching")}>
//               <Search size={16} /> Searching
//             </Link>
//             <Link to="/pagination" className={navItemClass("/pagination")}>
//               <ListOl size={16} /> Pagination
//             </Link>
//             <Link to="/exportcsv" className={navItemClass("/exportcsv")}>
//               <FileEarmarkArrowDownFill size={16} /> Export CSV
//             </Link>
//             <Link to="/checkbox" className={navItemClass("/checkbox")}>
//               <CheckSquareFill size={16} /> Check Box
//             </Link>
//             <Link
//               to="/multiselectdropdown"
//               className={navItemClass("/multiselectdropdown")}
//             >
//               <MenuButtonWideFill size={16} /> Multi Select DDL
//             </Link>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow-1 p-4 bg-light">
//           <div className="card shadow border-0 rounded-3">
//             <div className="card-body">{children}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;



import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HouseFill,
  Globe,
  Map,
  MapFill,
  ImageFill,
  CircleHalf,
  Search,
  ListOl,
  FileEarmarkArrowDownFill,
  CheckSquareFill,
  MenuButtonWideFill,
} from "react-bootstrap-icons";

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // 👈 check if user is logged in

  // Function for active nav styling
  const navItemClass = (path: string) =>
    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded fs-6 ${
      location.pathname === path
        ? "active fw-semibold shadow-sm bg-primary text-white"
        : "text-dark"
    }`;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Hide sidebar for these routes (Landing, Login, Register)
  const hideSidebarOn = ["/", "/login", "/register"];
  const shouldHideSidebar = hideSidebarOn.includes(location.pathname) || !token;

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", overflow:"hidden" }}>
      {/* ---------- Header Section ---------- */}
      <header className=" text-white px-4 py-3 sticky-top d-flex align-items-center justify-content-around" style={{backgroundColor:"#04001693"}}>
        <div className="bg-black d-flex align-items-center justify-content-between g-5" style={{width:"80vw", height:"60px", borderRadius:"9px"}}>
        <h1 className="fs-5 fw-bold m-0" >
          <img
            style={{ height: "50px", width: "200px" }}
            src="/ShiwanshSolutionsLogo.svg"
            alt="Logo"
          />
        </h1>

        {/* Conditionally render buttons based on login status */}
        <div className="d-flex align-items-center gap-3 me-5">
          {token ? (
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`btn btn-outline-light btn-sm ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`btn btn-primary btn-sm ${
                  location.pathname === "/register" ? "active" : ""
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>  
        </div>
      </header>

      {/* ---------- Sidebar + Main ---------- */}
      <div className="d-flex flex-grow-1">
        {/* ✅ Sidebar (only visible after login) */}
        {!shouldHideSidebar && (
          <aside
            className="bg-white border-end d-flex flex-column p-3 shadow-sm"
            style={{ width: "240px" }}
          >
            <h6 className="text-uppercase text-muted mb-3 ps-2 small">
              Navigation
            </h6>
            <nav className="nav nav-pills flex-column gap-1">
              <Link to="/language" className={navItemClass("/language")}>
                <HouseFill size={16} /> Language
              </Link>
              <Link to="/country" className={navItemClass("/country")}>
                <Globe size={16} /> Country
              </Link>
              <Link to="/state" className={navItemClass("/state")}>
                <Map size={16} /> State
              </Link>
              <Link to="/district" className={navItemClass("/district")}>
                <MapFill size={16} /> District
              </Link>
              <Link to="/imageupload" className={navItemClass("/imageupload")}>
                <ImageFill size={16} /> Image Upload
              </Link>
              <Link to="/radiobutton" className={navItemClass("/radiobutton")}>
                <CircleHalf size={16} /> Radio Button
              </Link>
              <Link to="/searching" className={navItemClass("/searching")}>
                <Search size={16} /> Searching
              </Link>
              <Link to="/pagination" className={navItemClass("/pagination")}>
                <ListOl size={16} /> Pagination
              </Link>
              <Link to="/exportcsv" className={navItemClass("/exportcsv")}>
                <FileEarmarkArrowDownFill size={16} /> Export CSV
              </Link>
              <Link to="/checkbox" className={navItemClass("/checkbox")}>
                <CheckSquareFill size={16} /> Check Box
              </Link>
              <Link
                to="/multiselectdropdown"
                className={navItemClass("/multiselectdropdown")}
              >
                <MenuButtonWideFill size={16} /> Multi Select DDL
              </Link>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-grow-1 bg-light">
          {!shouldHideSidebar && (
          <div className="card shadow border-0" style={{backgroundColor: "white"}}>
            <div className="card-body">{children}</div>
          </div>
        )}
          {shouldHideSidebar && (
          <div className="card shadow border-0" style={{backgroundColor: "#040016"}}>
            <div className="card-body">{children}</div>
          </div>
        )}
          {/* <div className="card shadow border-0" style={{backgroundColor: "#040016"}}>
            <div className="card-body">{children}</div>
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
