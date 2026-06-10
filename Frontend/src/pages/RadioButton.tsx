import axios from "axios";
import { useEffect, useState } from "react";
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

function RadioButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState("Male");
  const [students, setStudents] = useState<Student[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/students/all");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentData = {
      stdName: name,
      stdEmail: email,
      stdMob: mobile,
      stdCountry: country,
      stdState: state,
      stdDistrict: district,
      stdGender: gender,
    };

    try {
      if (editId) {
        // ✅ Update existing student
        await axios.put(
          `http://localhost:8080/students/update/${editId}`,
          studentData
        );
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Student updated successfully!",
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        // ✅ Add new student
        await axios.post("http://localhost:8080/students/add", studentData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Student added successfully!",
          showConfirmButton: false,
          timer: 1800,
        });
      }

      setName("");
      setEmail("");
      setMobile("");
      setCountry("");
      setState("");
      setDistrict("");
      setGender("Male");
      setEditId(null);

      fetchStudents(); // Refresh table
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error saving student!",
        text: "Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleEdit = (student: Student) => {
    setEditId(student.id);
    setName(student.stdName);
    setEmail(student.stdEmail);
    setMobile(student.stdMob);
    setCountry(student.stdCountry);
    setState(student.stdState);
    setDistrict(student.stdDistrict);
    setGender(student.stdGender);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/students/${id}`);
        Swal.fire("Deleted!", "Student has been deleted.", "success");
        fetchStudents(); // Refresh table
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete student.", "error");
      }
    }
  };

  return (
    <div className="container">
      <h2>Manage Student</h2>
      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Country"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter State"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter District"
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3 text-center align-items-center">
          <div className="col">
            <label className="me-2 fw-bold">Gender:</label>
            {["Male", "Female", "Other"].map((g) => (
              <label className="me-2" key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                {g}
              </label>
            ))}
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {editId ? "Update Student" : "Add Student"}
            </button>
          </div>
          <div className="col"></div>
        </div>
      </form>

      {/* Student Table */}
      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
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
        <tbody className="text-center">
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.stdName}</td>
              <td>{student.stdEmail}</td>
              <td>{student.stdMob}</td>
              <td>{student.stdCountry}</td>
              <td>{student.stdState}</td>
              <td>{student.stdDistrict}</td>
              <td>{student.stdGender}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={9}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RadioButton;
