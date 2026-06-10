import { useEffect, useState } from "react";
import axios from "axios";
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

const PaginationComponent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const baseUrl = "http://localhost:8080/students/page";

  const fetchStudents = async (page: number = 0, size: number = 5) => {
    try {
      const res = await axios.get(baseUrl, {
        params: { pageNo: page, pageSize: size },
      });
      setStudents(res.data.content);
      setPageNo(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  useEffect(() => {
    fetchStudents(pageNo, pageSize);
  }, [pageNo, pageSize]);

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  const handlePageClick = (index: number) => {
    setPageNo(index);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Students</h2>
        <div className="d-flex align-items-center gap-2">
          <label>Rows per page:</label>
          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${pageNo === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrev}>
              <ChevronLeft />
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i} className={`page-item ${i === pageNo ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageClick(i)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${pageNo === totalPages - 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handleNext}>
              <ChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
