import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Customer {
  id: number;
  custName: string;
  custEmail: string;
  custMob: string;
  photoxxx: number[] | null; // byte[] from backend
}

function ImageUpload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Helper: Convert byte[] to Base64 string
  const byteArrayToBase64 = (bytes: number[]) => {
    let binary = '';
    const len = bytes.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/customers/all");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch customers", "error");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      custName: name,
      custEmail: email,
      custMob: mobile,
      photo: photo,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/customers/update/${editId}`, payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Customer updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post("http://localhost:8080/customers/add", payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Customer added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Clear form
      setName("");
      setEmail("");
      setMobile("");
      setPhoto("");
      setEditId(null);

      fetchCustomers(); // Refresh table
    } catch (err: any) {
      console.error(err.response || err);
      Swal.fire("Error", "Failed to save customer", "error");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditId(customer.id);
    setName(customer.custName);
    setEmail(customer.custEmail);
    setMobile(customer.custMob);
    if (customer.photoxxx) {
      setPhoto(`data:image/png;base64,${byteArrayToBase64(customer.photoxxx)}`);
    } else {
      setPhoto("");
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/customers/${id}`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Customer deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchCustomers();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete customer", "error");
        }
      }
    });
  };

  return (
    <div className="container">
      <h2>Manage Customer</h2>
      <form onSubmit={handleSubmit}>
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
        </div>

        <div className="row mb-3">
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
          <div className="col">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required={!editId} // Only required for new customer
            />
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {editId ? "Update Customer" : "Add Customer"}
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
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.custName}</td>
              <td>{c.custEmail}</td>
              <td>{c.custMob}</td>
              <td>
                {c.photoxxx ? (
                  <img
                    src={`data:image/png;base64,${byteArrayToBase64(c.photoxxx)}`}
                    alt="photo"
                    width={50}
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
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
          {customers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ImageUpload;
