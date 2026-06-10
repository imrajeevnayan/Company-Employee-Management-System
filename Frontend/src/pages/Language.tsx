import { useEffect, useState, type ChangeEvent, type FormEvent} from "react";
import Swal from "sweetalert2";
import api from "../api/axiosConfig";

interface Language {
  id: number;
  language: string;
}

function LanguageManager() {
  const [lang, setLang] = useState({ language: "" });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

const fetchLanguages = async () => {
  try {
    const res = await api.get("/language/all");
    setLanguages(res.data);
  } catch (err: any) {
    console.error("Fetch error:", err.response?.status, err.message);
  }
};

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/language/update/${editId}`, lang);
        Swal.fire("Success", "Language updated", "success");
      } else {
        await api.post("/language/add", lang);
        Swal.fire("Success", "Language added", "success");
      }
      setLang({ language: "" });
      setEditId(null);
      fetchLanguages();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save language", "error");
    }
  };

  const handleEdit = (l: Language) => {
    setEditId(l.id);
    setLang({ language: l.language });
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/language/delete/${id}`);
      Swal.fire("Deleted", "Language deleted", "success");
      fetchLanguages();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete language", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Manage Language</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="language"
              value={lang.language}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLang({ ...lang, language: e.target.value })
              }
              placeholder="Enter Language"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="text-center mb-3">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update Language" : "Add Language"}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.length ? (
            languages.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.language}</td>
                <td>
                  <button
                    className="btn btn-warning me-2 btn-sm"
                    onClick={() => handleEdit(l)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(l.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LanguageManager;
