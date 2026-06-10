// import axios from "axios";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// function Country() {
//   const [countries, setCountries] = useState<any[]>([]);
//   const [id, setId] = useState(0);
//   const [countryName, setCountryName] = useState("");
//   const [photoCandidate, setPhotoCandidate] = useState<File | null>(null);

//   const baseUrl = "http://localhost:8080"; // your Spring Boot backend

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   // ✅ Load all countries
//   const loadCountries = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/countries`);
//       setCountries(res.data);
//     } catch (err) {
//       toast("error", "Failed to load countries");
//     }
//   };

//   // ✅ Toast message helper
//   const toast = (icon: "success" | "error" | "warning", title: string) => {
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon,
//       title,
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//     });
//   };

//   // ✅ Save or Update
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!countryName.trim()) {
//       toast("warning", "Enter country name");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("countryName", countryName);
//     if (photoCandidate) formData.append("photoCandidate", photoCandidate);

//     try {
//       if (id === 0) {
//         // Add Country
//         await axios.post(`${baseUrl}/addcountry`, formData);
//         toast("success", "Country added successfully");
//       } else {
//         // Update Country
//         await axios.put(`${baseUrl}/updatecountry/${id}`, formData);
//         toast("success", "Country updated successfully");
//       }

//       resetForm();
//       loadCountries();
//     } catch (error) {
//       toast("error", "Something went wrong");
//       console.error(error);
//     }
//   };

//   // ✅ Edit handler
//   const handleEdit = (country: any) => {
//     setId(country.id);
//     setCountryName(country.countryName);
//     setPhotoCandidate(null);
//   };

//   // ✅ Delete handler
//   const handleDelete = (countryId: number) => {
//     Swal.fire({
//       title: "Delete this country?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseUrl}/deletecountry/${countryId}`);
//           toast("success", "Country deleted");
//           loadCountries();
//         } catch {
//           toast("error", "Failed to delete");
//         }
//       }
//     });
//   };

//   // ✅ Reset form
//   const resetForm = () => {
//     setId(0);
//     setCountryName("");
//     setPhotoCandidate(null);
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-center">Manage Countries</h2>

//       <form onSubmit={handleSave} encType="multipart/form-data">
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter country name"
//               value={countryName}
//               onChange={(e) => setCountryName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="file"
//               className="form-control"
//               accept="image/*"
//               onChange={(e) =>
//                 e.target.files && setPhotoCandidate(e.target.files[0])
//               }
//               required={id === 0}
//             />
//           </div>
//         </div>

//         <div className="text-center mb-4">
//           <button type="submit" className="btn btn-primary me-2">
//             {id === 0 ? "Add Country" : "Update Country"}
//           </button>
//           <button type="button" className="btn btn-secondary" onClick={resetForm}>
//             Reset
//           </button>
//         </div>
//       </form>

//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Country Name</th>
//             <th>Photo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {countries.map((c: any) => (
//             <tr key={c.id}>
//               <td>{c.id}</td>
//               <td>{c.countryName}</td>
//               <td>
//                 {c.imageBase64 ? (
//                   <img
//                     src={`data:image/jpeg;base64,${c.imageBase64}`}
//                     alt={c.countryName}
//                     style={{ width: "60px", height: "40px", objectFit: "cover" }}
//                   />
//                 ) : (
//                   "No Image"
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning me-2"
//                   onClick={() => handleEdit(c)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => handleDelete(c.id)}
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

// export default Country;






import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Country() {
  const [countries, setCountries] = useState<any[]>([]);
  const [id, setId] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [photoCandidate, setPhotoCandidate] = useState<File | null>(null);

  const baseUrl = "http://localhost:8080"; // your Spring Boot backend

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const res = await axios.get(`${baseUrl}/countries`);
      setCountries(res.data);
    } catch (err) {
      toast("error", "Failed to load countries");
    }
  };

  const toast = (icon: "success" | "error" | "warning", title: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryName.trim()) {
      toast("warning", "Enter country name");
      return;
    }

    const formData = new FormData();
    formData.append("countryName", countryName);
    if (photoCandidate) formData.append("photoCandidate", photoCandidate);

    try {
      if (id === 0) {
        await axios.post(`${baseUrl}/addcountry`, formData);
        toast("success", "Country added successfully");
      } else {
        await axios.put(`${baseUrl}/updatecountry/${id}`, formData);
        toast("success", "Country updated successfully");
      }
      resetForm();
      loadCountries();
    } catch (error) {
      toast("error", "Something went wrong");
      console.error(error);
    }
  };

  const handleEdit = (country: any) => {
    setId(country.id);
    setCountryName(country.countryName);
    setPhotoCandidate(null);
  };

  const handleDelete = (countryId: number) => {
    Swal.fire({
      title: "Delete this country?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/deletecountry/${countryId}`);
          toast("success", "Country deleted");
          loadCountries();
        } catch {
          toast("error", "Failed to delete");
        }
      }
    });
  };

  const resetForm = () => {
    setId(0);
    setCountryName("");
    setPhotoCandidate(null);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Manage Countries</h2>

      <form onSubmit={handleSave} encType="multipart/form-data">
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter country name"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                e.target.files && setPhotoCandidate(e.target.files[0])
              }
              required={id === 0}
            />
          </div>
        </div>

        <div className="text-center mb-4 d-flex flex-column flex-md-row justify-content-center gap-2">
          <button type="submit" className="btn btn-primary w-100 w-md-auto">
            {id === 0 ? "Add Country" : "Update Country"}
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 w-md-auto"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Country Name</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c: any) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.countryName}</td>
                <td>
                  {c.imageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${c.imageBase64}`}
                      alt={c.countryName}
                      className="img-fluid rounded"
                      style={{ maxWidth: "80px", maxHeight: "50px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="d-flex flex-wrap justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.id)}
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

export default Country;
