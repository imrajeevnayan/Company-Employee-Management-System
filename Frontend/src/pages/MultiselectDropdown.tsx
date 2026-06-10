
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

// ✅ Type definitions
interface LanguageOption {
  value: string;
  label: string;
}

interface Employee {
  id?: number;
  empDName: string;
  empDEmail: string;
  empDMob: string;
  empDCountry: string;
  empDState: string;
  empDDistrict: string;
  empDGender: string;
  empDLanguage: string[];
}

function MultiselectDropdown() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageOption[]>([]);
  const [formData, setFormData] = useState<Employee>({
    empDName: "",
    empDEmail: "",
    empDMob: "",
    empDCountry: "",
    empDState: "",
    empDDistrict: "",
    empDGender: "Male",
    empDLanguage: [],
  });
  const [editId, setEditId] = useState<number | null>(null);

  const baseUrl = "http://localhost:8080/employeesddl";

  // ✅ Language dropdown options
  const languageOptions: LanguageOption[] = [
    { value: "Hindi", label: "Hindi" },
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "French", label: "French" },
    { value: "Spanish", label: "Spanish" },
  ];

  // ✅ Load employees
  const loadEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      console.log("Employees:", res.data);
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      Swal.fire("Error!", "Failed to fetch employees!", "error");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const employeeData = {
      ...formData,
      empDLanguage: selectedLanguages.map((lang) => lang.value),
    };

    try {
      if (editId === null) {
        await axios.post(`${baseUrl}/add`, employeeData);
        Swal.fire("Success!", "Employee added successfully!", "success");
      } else {
        await axios.put(`${baseUrl}/update/${editId}`, employeeData);
        Swal.fire("Updated!", "Employee updated successfully!", "success");
      }

      // Reset form
      setFormData({
        empDName: "",
        empDEmail: "",
        empDMob: "",
        empDCountry: "",
        empDState: "",
        empDDistrict: "",
        empDGender: "Male",
        empDLanguage: [],
      });
      setSelectedLanguages([]);
      setEditId(null);

      loadEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  // ✅ Delete employee
  const deleteEmployee = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseUrl}/delete/${id}`);
        Swal.fire("Deleted!", "Employee deleted successfully!", "success");
        loadEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
        Swal.fire("Error!", "Failed to delete employee!", "error");
      }
    }
  };

  // ✅ Edit employee
  const editEmployee = (emp: Employee) => {
    setEditId(emp.id || null);
    setFormData({
      empDName: emp.empDName,
      empDEmail: emp.empDEmail,
      empDMob: emp.empDMob,
      empDCountry: emp.empDCountry,
      empDState: emp.empDState,
      empDDistrict: emp.empDDistrict,
      empDGender: emp.empDGender,
      empDLanguage: emp.empDLanguage,
    });

    setSelectedLanguages(
      emp.empDLanguage.map((lang) => ({ value: lang, label: lang }))
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Manage Employees</h2>

      {/* ✅ Employee Form */}
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="empDName"
              placeholder="Enter Name"
              className="form-control"
              value={formData.empDName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="email"
              name="empDEmail"
              placeholder="Enter Email"
              className="form-control"
              value={formData.empDEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="empDMob"
              placeholder="Enter Mobile"
              className="form-control"
              value={formData.empDMob}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="empDCountry"
              placeholder="Enter Country"
              className="form-control"
              value={formData.empDCountry}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="empDState"
              placeholder="Enter State"
              className="form-control"
              value={formData.empDState}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="empDDistrict"
              placeholder="Enter District"
              className="form-control"
              value={formData.empDDistrict}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">Gender</label>
            {["Male", "Female", "Other"].map((g) => (
              <div className="form-check form-check-inline" key={g}>
                <input
                  type="radio"
                  name="empDGender"
                  className="form-check-input"
                  value={g}
                  checked={formData.empDGender === g}
                  onChange={handleChange}
                />
                <label className="form-check-label">{g}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <label className="form-label">Languages</label>
            <Select
              options={languageOptions}
              isMulti
              isSearchable
              value={selectedLanguages}
              onChange={(selected) =>
                setSelectedLanguages(selected as LanguageOption[])
              }
              placeholder="Select languages..."
            />
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Employee Table */}
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
            <th>Languages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.empDName}</td>
              <td>{emp.empDEmail}</td>
              <td>{emp.empDMob}</td>
              <td>{emp.empDCountry}</td>
              <td>{emp.empDState}</td>
              <td>{emp.empDDistrict}</td>
              <td>{emp.empDGender}</td>
              <td>{emp.empDLanguage.join(", ")}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => editEmployee(emp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteEmployee(emp.id!)}
                >
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

export default MultiselectDropdown;
