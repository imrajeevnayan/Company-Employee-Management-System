// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// interface StateType {
//   id: number;
//   countryName: string;
//   stateName: string;
// }

// interface DistrictType {
//   id: number;
//   countryName: string;
//   stateName: string;
//   districtName: string;
// }

// function District() {
//   const [allStates, setAllStates] = useState<StateType[]>([]);
//   const [countries, setCountries] = useState<string[]>([]);
//   const [states, setStates] = useState<string[]>([]);
//   const [districts, setDistricts] = useState<DistrictType[]>([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [districtName, setDistrictName] = useState("");
//   const [editId, setEditId] = useState<number | null>(null);

//   const stateBaseUrl = "http://localhost:8080/states";
//   const districtBaseUrl = "http://localhost:8080/district";

//   // Load all states
//   useEffect(() => {
//     axios.get<StateType[]>(`${stateBaseUrl}/all`)
//       .then(res => setAllStates(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // Load countries (distinct)
//   useEffect(() => {
//     const distinctCountries = Array.from(new Set(allStates.map(s => s.countryName)));
//     setCountries(distinctCountries);
//   }, [allStates]);

//   // Filter states when country changes
//   useEffect(() => {
//     if (selectedCountry) {
//       const filteredStates = allStates
//         .filter(s => s.countryName === selectedCountry)
//         .map(s => s.stateName);
//       setStates(Array.from(new Set(filteredStates)));
//     } else {
//       setStates([]);
//       setSelectedState("");
//     }
//   }, [selectedCountry, allStates]);

//   // Load all districts
//   const loadDistricts = () => {
//     axios.get<DistrictType[]>(`${districtBaseUrl}/all`)
//       .then(res => setDistricts(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     loadDistricts();
//   }, []);

//   // ✅ Add / Update District
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedCountry || !selectedState || !districtName) return;

//     const data = {
//       countryName: selectedCountry,
//       stateName: selectedState,
//       districtName
//     };

//     if (editId) {
//       // Update existing
//       axios.put(`${districtBaseUrl}/update/${editId}`, data)
//         .then(() => {
//           Swal.fire("Updated!", "District updated successfully ✅", "success");
//           setEditId(null);
//           resetForm();
//           loadDistricts();
//         })
//         .catch(() => Swal.fire("Error!", "Failed to update district ❌", "error"));
//     } else {
//       // Add new
//       axios.post(`${districtBaseUrl}/add`, data)
//         .then(() => {
//           Swal.fire("Added!", "District added successfully 🎉", "success");
//           resetForm();
//           loadDistricts();
//         })
//         .catch(() => Swal.fire("Error!", "Failed to add district ❌", "error"));
//     }
//   };

//   const resetForm = () => {
//     setDistrictName("");
//     setSelectedCountry("");
//     setSelectedState("");
//   };

//   // ✅ Edit handler
//   const handleEdit = (d: DistrictType) => {
//     setEditId(d.id);
//     setSelectedCountry(d.countryName);
//     setSelectedState(d.stateName);
//     setDistrictName(d.districtName);
//   };

//   // ✅ Delete handler
//   const handleDelete = (id: number) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This district will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`${districtBaseUrl}/delete/${id}`)
//           .then(() => {
//             Swal.fire("Deleted!", "District deleted successfully 🗑️", "success");
//             loadDistricts();
//           })
//           .catch(() => Swal.fire("Error!", "Failed to delete district ❌", "error"));
//       }
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Manage District</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col">
//             <select
//               className="form-control"
//               value={selectedCountry}
//               onChange={e => setSelectedCountry(e.target.value)}
//               required
//             >
//               <option value="">Select Country</option>
//               {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
//             </select>
//           </div>
//           <div className="col">
//             <select
//               className="form-control"
//               value={selectedState}
//               onChange={e => setSelectedState(e.target.value)}
//               required
//             >
//               <option value="">Select State</option>
//               {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
//             </select>
//           </div>
//           <div className="col">
//             <input
//               type="text"
//               placeholder="Enter District"
//               className="form-control"
//               value={districtName}
//               onChange={e => setDistrictName(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="text-center mb-4">
//           <button className="btn btn-primary px-4">
//             {editId ? "Update District" : "Add District"}
//           </button>
//         </div>
//       </form>

//       <table className="table table-bordered table-striped">
//         <thead className="table-dark text-center">
//           <tr>
//             <th>ID</th>
//             <th>State Name</th>
//             <th>Country Name</th>
//             <th>District</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {districts.map((d) => (
//             <tr key={d.id}>
//               <td>{d.id}</td>
//               <td>{d.stateName}</td>
//               <td>{d.countryName}</td>
//               <td>{d.districtName}</td>
//               <td>
//                 <button
//                   className="btn btn-warning btn-sm me-2"
//                   onClick={() => handleEdit(d)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(d.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default District;




import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface StateType {
  id: number;
  countryName: string;
  stateName: string;
}

interface DistrictType {
  id: number;
  countryName: string;
  stateName: string;
  districtName: string;
}

function District() {
  const [allStates, setAllStates] = useState<StateType[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const stateBaseUrl = "http://localhost:8080/states";
  const districtBaseUrl = "http://localhost:8080/district";

  useEffect(() => {
    axios.get<StateType[]>(`${stateBaseUrl}/all`)
      .then(res => setAllStates(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const distinctCountries = Array.from(new Set(allStates.map(s => s.countryName)));
    setCountries(distinctCountries);
  }, [allStates]);

  useEffect(() => {
    if (selectedCountry) {
      const filteredStates = allStates
        .filter(s => s.countryName === selectedCountry)
        .map(s => s.stateName);
      setStates(Array.from(new Set(filteredStates)));
    } else {
      setStates([]);
      setSelectedState("");
    }
  }, [selectedCountry, allStates]);

  const loadDistricts = () => {
    axios.get<DistrictType[]>(`${districtBaseUrl}/all`)
      .then(res => setDistricts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const resetForm = () => {
    setDistrictName("");
    setSelectedCountry("");
    setSelectedState("");
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !selectedState || !districtName) return;

    const data = { countryName: selectedCountry, stateName: selectedState, districtName };

    if (editId) {
      axios.put(`${districtBaseUrl}/update/${editId}`, data)
        .then(() => {
          Swal.fire("Updated!", "District updated successfully ✅", "success");
          resetForm();
          loadDistricts();
        })
        .catch(() => Swal.fire("Error!", "Failed to update district ❌", "error"));
    } else {
      axios.post(`${districtBaseUrl}/add`, data)
        .then(() => {
          Swal.fire("Added!", "District added successfully 🎉", "success");
          resetForm();
          loadDistricts();
        })
        .catch(() => Swal.fire("Error!", "Failed to add district ❌", "error"));
    }
  };

  const handleEdit = (d: DistrictType) => {
    setEditId(d.id);
    setSelectedCountry(d.countryName);
    setSelectedState(d.stateName);
    setDistrictName(d.districtName);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This district will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${districtBaseUrl}/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "District deleted successfully 🗑️", "success");
            loadDistricts();
          })
          .catch(() => Swal.fire("Error!", "Failed to delete district ❌", "error"));
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage District</h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-4">
            <select
              className="form-control"
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col-12 col-md-4">
            <select
              className="form-control"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Enter District"
              className="form-control"
              value={districtName}
              onChange={e => setDistrictName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-primary px-4 w-100 w-md-auto">
            {editId ? "Update District" : "Add District"}
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>State Name</th>
              <th>Country Name</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.stateName}</td>
                <td>{d.countryName}</td>
                <td>{d.districtName}</td>
                <td className="d-flex justify-content-center gap-2 flex-wrap">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default District;
