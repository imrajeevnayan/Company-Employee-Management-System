import { useEffect, useState } from "react";
import axios from "axios";

interface StateType {
  id: number;
  countryName: string;
  stateName: string;
}

function State() {
  const [states, setStates] = useState<StateType[]>([]);
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const baseUrl = "http://localhost:8080/states";

  const loadStates = () => {
    axios.get<StateType[]>(`${baseUrl}/all`)
      .then(res => setStates(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadStates();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      axios.put(`${baseUrl}/update/${editId}`, { countryName: country, stateName })
        .then(() => { loadStates(); setCountry(""); setStateName(""); setEditId(null); })
        .catch(err => console.log(err));
    } else {
      axios.post(`${baseUrl}/add`, { countryName: country, stateName })
        .then(() => { loadStates(); setCountry(""); setStateName(""); })
        .catch(err => console.log(err));
    }
  };

  const handleDelete = (id: number) => {
    axios.delete(`${baseUrl}/delete/${id}`)
      .then(() => loadStates())
      .catch(err => console.log(err));
  };

  const handleEdit = (s: StateType) => {
    setCountry(s.countryName);
    setStateName(s.stateName);
    setEditId(s.id);
  };

  return (
    <div className="container">
      <h2>Manage State</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input 
              type="text" 
              placeholder="Enter Country" 
              className="form-control"
              value={country} 
              onChange={e => setCountry(e.target.value)} 
              required
            />
          </div>
          <div className="col">
            <input 
              type="text" 
              placeholder="Enter State" 
              className="form-control"
              value={stateName} 
              onChange={e => setStateName(e.target.value)} 
              required
            />
          </div>
        </div>
        <div className="row mb-3 text-center">
          <div className="col">
            <button className="btn btn-primary">
              {editId ? "Update State" : "Add State"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>State Name</th>
            <th>Country Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((s: StateType) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.stateName}</td>
              <td>{s.countryName}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default State;
