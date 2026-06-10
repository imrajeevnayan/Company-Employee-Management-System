// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from "./components/Layout"
// import "bootstrap/dist/css/bootstrap.min.css";
// import Country from './pages/Country';
// import Language from './pages/Language';
// import State from './pages/State';
// import District from './pages/District';
// import ImageUpload from './pages/ImageUpload';
// import RadioButton from './pages/RadioButton';
// import Searching from './pages/Searching';
// import Pagination from './pages/Pagination';
// import ExportCSV from './pages/ExportCSV';
// import CheckBox from './pages/CheckBox';
// import MultiselectDropdown from './pages/MultiselectDropdown';
// import Authentication from './pages/Authentication';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Language />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/language" element={<Language />} />
//           <Route path="/country" element={<Country />} />
//           <Route path="/state" element={<State />} />
//           <Route path="/district" element={<District />} />
//           <Route path="/imageupload" element={<ImageUpload />} />
//           <Route path="/radiobutton" element={<RadioButton />} />
//           <Route path="/searching" element={<Searching />} />
//           <Route path="/pagination" element={<Pagination />} />
//           <Route path="/exportcsv" element={<ExportCSV />} />
//           <Route path="/checkbox" element={<CheckBox />} />
//           <Route path="/multiselectdropdown" element={<MultiselectDropdown />} />
//           <Route path="/authentication" element={<Authentication />} />
//         </Routes>
//       </Layout>
//     </Router>
//   )
// }

// export default App








// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Country from "./pages/Country";
// import Language from "./pages/Language";
// import State from "./pages/State";
// import District from "./pages/District";
// import ImageUpload from "./pages/ImageUpload";
// import RadioButton from "./pages/RadioButton";
// import Searching from "./pages/Searching";
// import Pagination from "./pages/Pagination";
// import ExportCSV from "./pages/ExportCSV";
// import CheckBox from "./pages/CheckBox";
// import MultiselectDropdown from "./pages/MultiselectDropdown";
// import Authentication from "./pages/Authentication";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import RequireAuth from "./components/RequireAuth";

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route element={<RequireAuth />}>
//             <Route path="/" element={<Language />} />
//             <Route path="/language" element={<Language />} />
//             <Route path="/country" element={<Country />} />
//             <Route path="/state" element={<State />} />
//             <Route path="/district" element={<District />} />
//             <Route path="/imageupload" element={<ImageUpload />} />
//             <Route path="/radiobutton" element={<RadioButton />} />
//             <Route path="/searching" element={<Searching />} />
//             <Route path="/pagination" element={<Pagination />} />
//             <Route path="/exportcsv" element={<ExportCSV />} />
//             <Route path="/checkbox" element={<CheckBox />} />
//             <Route path="/multiselectdropdown" element={<MultiselectDropdown />} />
//             <Route path="/authentication" element={<Authentication />} />
//           </Route>
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;







import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Country from "./pages/Country";
import Language from "./pages/Language";
import State from "./pages/State";
import District from "./pages/District";
import ImageUpload from "./pages/ImageUpload";
import RadioButton from "./pages/RadioButton";
import Searching from "./pages/Searching";
import Pagination from "./pages/Pagination";
import ExportCSV from "./pages/ExportCSV";
import CheckBox from "./pages/CheckBox";
import MultiselectDropdown from "./pages/MultiselectDropdown";
import Authentication from "./pages/Authentication";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/language" element={<Language />} />
            <Route path="/country" element={<Country />} />
            <Route path="/state" element={<State />} />
            <Route path="/district" element={<District />} />
            <Route path="/imageupload" element={<ImageUpload />} />
            <Route path="/radiobutton" element={<RadioButton />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/exportcsv" element={<ExportCSV />} />
            <Route path="/checkbox" element={<CheckBox />} />
            <Route path="/multiselectdropdown" element={<MultiselectDropdown />} />
            <Route path="/authentication" element={<Authentication />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
