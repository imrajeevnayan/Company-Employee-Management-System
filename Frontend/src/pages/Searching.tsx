import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Student {
  id: number;
  stdName: string;
  stdEmail: string;
  stdMob: string;
  stdCountry: string;
  stdState: string;
  stdDistrict: string;
  stdGender: string;
}

const Searching: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState({
    stdName: "",
    stdEmail: "",
    stdMob: "",
    stdCountry: "",
    stdState: "",
    stdDistrict: "",
  });

  const baseUrl = "http://localhost:8080/students";

  // ✅ Load all students on mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // ✅ Advanced Search Function
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = "";
      if (search.stdName) url = `${baseUrl}/search/name/${search.stdName}`;
      else if (search.stdEmail) url = `${baseUrl}/search/email/${search.stdEmail}`;
      else if (search.stdMob) url = `${baseUrl}/search/mob/${search.stdMob}`;
      else if (search.stdCountry) url = `${baseUrl}/search/country/${search.stdCountry}`;
      else if (search.stdState) url = `${baseUrl}/search/state/${search.stdState}`;
      else if (search.stdDistrict) url = `${baseUrl}/search/district/${search.stdDistrict}`;
      else {
        Swal.fire("Please enter at least one field for search!", "", "info");
        return;
      }

      const res = await axios.get(url);
      setStudents(res.data);

      if (res.data.length === 0) {
        Swal.fire("No students found!", "", "warning");
      }
    } catch (error) {
      console.error("Search error", error);
      Swal.fire("Error while searching!", "", "error");
    }
  };

  // ✅ Delete Student
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseUrl}/${id}`);
        Swal.fire("Deleted!", "Student has been deleted.", "success");
        loadStudents();
      } catch (error) {
        Swal.fire("Error while deleting!", "", "error");
      }
    }
  };

  // ✅ Edit Student
  const handleEdit = async (student: Student) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Student",
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${student.stdName}">
        <input id="email" class="swal2-input" placeholder="Email" value="${student.stdEmail}">
        <input id="mob" class="swal2-input" placeholder="Mobile" value="${student.stdMob}">
        <input id="country" class="swal2-input" placeholder="Country" value="${student.stdCountry}">
        <input id="state" class="swal2-input" placeholder="State" value="${student.stdState}">
        <input id="district" class="swal2-input" placeholder="District" value="${student.stdDistrict}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          stdName: (document.getElementById("name") as HTMLInputElement).value,
          stdEmail: (document.getElementById("email") as HTMLInputElement).value,
          stdMob: (document.getElementById("mob") as HTMLInputElement).value,
          stdCountry: (document.getElementById("country") as HTMLInputElement).value,
          stdState: (document.getElementById("state") as HTMLInputElement).value,
          stdDistrict: (document.getElementById("district") as HTMLInputElement).value,
          stdGender: student.stdGender
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(`${baseUrl}/update/${student.id}`, formValues);
        Swal.fire("Updated!", "Student details updated successfully.", "success");
        loadStudents();
      } catch (error) {
        Swal.fire("Error while updating!", "", "error");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Search Student</h2>
      <form onSubmit={handleSearch}>
        <div className="row mb-3">
          <div className="col">
            <input type="text" name="stdName" value={search.stdName} onChange={handleChange} placeholder="Enter Name" className="form-control" />
          </div>
          <div className="col">
            <input type="text" name="stdEmail" value={search.stdEmail} onChange={handleChange} placeholder="Enter Email" className="form-control" />
          </div>
          <div className="col">
            <input type="text" name="stdMob" value={search.stdMob} onChange={handleChange} placeholder="Enter Mobile" className="form-control" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text" name="stdCountry" value={search.stdCountry} onChange={handleChange} placeholder="Enter Country" className="form-control" />
          </div>
          <div className="col">
            <input type="text" name="stdState" value={search.stdState} onChange={handleChange} placeholder="Enter State" className="form-control" />
          </div>
          <div className="col">
            <input type="text" name="stdDistrict" value={search.stdDistrict} onChange={handleChange} placeholder="Enter District" className="form-control" />
          </div>
        </div>

        <div className="text-center mb-4">
          <button type="submit" className="btn btn-primary px-4">Advance Search</button>
          <button type="button" className="btn btn-secondary px-4 ms-3" onClick={loadStudents}>Reset</button>
        </div>
      </form>

      {/* ✅ Display Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>State</th>
              <th>District</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.stdName}</td>
                  <td>{s.stdEmail}</td>
                  <td>{s.stdMob}</td>
                  <td>{s.stdCountry}</td>
                  <td>{s.stdState}</td>
                  <td>{s.stdDistrict}</td>
                  <td>{s.stdGender}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(s.id)}>Delete</button>
                    <button className="btn btn-info btn-sm" onClick={() => Swal.fire(JSON.stringify(s, null, 2))}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={8}>No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Searching;
