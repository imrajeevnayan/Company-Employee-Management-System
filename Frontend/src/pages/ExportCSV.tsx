import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

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

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const baseUrl = "http://localhost:8080/students";

  // Fetch paginated students
  const fetchStudents = async (page: number = 0, size: number = 5) => {
    try {
      const res = await axios.get(`${baseUrl}/page`, { params: { pageNo: page, pageSize: size } });
      setStudents(res.data.content);
      setPageNo(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents(pageNo, pageSize);
  }, [pageNo, pageSize]);

  // Delete student
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchStudents(pageNo, pageSize); // refresh table
    } catch (error) {
      console.error(error);
    }
  };

  // Export CSV
  const handleExport = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      const data = res.data;
      const csvRows = [
        ["Name","Email","Mobile","Country","State","District","Gender"],
        ...data.map((s: Student) => [
          s.stdName, s.stdEmail, s.stdMob, s.stdCountry, s.stdState, s.stdDistrict, s.stdGender
        ])
      ];
      const csvContent = csvRows.map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "students.csv");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Students</h2>
        <button className="btn btn-outline-success btn-sm d-flex align-items-center gap-1 shadow-sm rounded-pill " onClick={handleExport}>
          <i className="bi bi-download"></i> Export
        </button>
      </div>

      <table className="table table-bordered table-striped text-center align-middle">
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
                <td className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-primary btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
                  <button className="btn btn-warning btn-sm">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${pageNo === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNo(pageNo - 1)}>
              <ChevronLeft />
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i} className={`page-item ${i === pageNo ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPageNo(i)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${pageNo === totalPages - 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNo(pageNo + 1)}>
              <ChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentTable;
