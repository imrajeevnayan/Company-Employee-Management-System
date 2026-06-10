import { useEffect, useState, type ChangeEvent, type FormEvent} from "react";
import axios from "axios";

interface Employee {
  id?: number;
  empName: string;
  empEmail: string;
  empMob: string;
  empCountry: string;
  empState: string;
  empDistrict: string;
  empGender: string;
  empLanguage: string[];
}

function CheckBox() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    empName: "",
    empEmail: "",
    empMob: "",
    empCountry: "",
    empState: "",
    empDistrict: "",
    empGender: "Male",
    empLanguage: []
  });
  const [editId, setEditId] = useState<number | null>(null);

  const baseUrl = "http://localhost:8080/employees";

  const fetchEmployees = async () => {
    try {
      const res = await axios.get<Employee[]>(`${baseUrl}/all`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedLanguages = checked
        ? [...formData.empLanguage, value]
        : formData.empLanguage.filter((lang) => lang !== value);
      setFormData({ ...formData, empLanguage: updatedLanguages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${baseUrl}/update/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(`${baseUrl}/add`, formData);
      }
      setFormData({
        empName: "",
        empEmail: "",
        empMob: "",
        empCountry: "",
        empState: "",
        empDistrict: "",
        empGender: "Male",
        empLanguage: []
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (emp: Employee) => {
    setFormData(emp);
    setEditId(emp.id!);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Employee</h2>
      <form className="p-3 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="empEmail"
              value={formData.empEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control"
              name="empMob"
              value={formData.empMob}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Country"
              className="form-control"
              name="empCountry"
              value={formData.empCountry}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter State"
              className="form-control"
              name="empState"
              value={formData.empState}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Enter District"
              className="form-control"
              name="empDistrict"
              value={formData.empDistrict}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">Gender</label>
            {["Male", "Female", "Other"].map((gender) => (
              <div className="form-check form-check-inline" key={gender}>
                <input
                  type="radio"
                  name="empGender"
                  className="form-check-input"
                  value={gender}
                  checked={formData.empGender === gender}
                  onChange={handleChange}
                />
                <label className="form-check-label">{gender}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <label className="form-label d-block">Languages</label>
            {["Hindi", "English", "German"].map((lang) => (
              <div className="form-check form-check-inline" key={lang}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={lang}
                  checked={formData.empLanguage.includes(lang)}
                  onChange={handleChange}
                />
                <label className="form-check-label">{lang}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4 d-flex align-items-end justify-content-end">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Gender</th>
            <th>Languages</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.empName}</td>
              <td>{emp.empEmail}</td>
              <td>{emp.empMob}</td>
              <td>{emp.empCountry}</td>
              <td>{emp.empState}</td>
              <td>{emp.empDistrict}</td>
              <td>{emp.empGender}</td>
              <td>{emp.empLanguage.join(", ")}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(emp)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id!)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckBox;
