import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { api } from "../utilities";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/AccountPageStyle.css";

export const AccountInfoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useOutletContext();
  const [formData, setFormData] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/info/");
      setUser(response.data);
      console.log(response.data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
    setFormData({
      email: user.email,
      display_name: user.display_name,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.put("users/info/", formData);
        setUser(response.data);
        window.location.reload();
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error updating account information:", error);
    }
  };

  const deleteAccount = async (e) => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.delete("users/delete/");
        if (response.status === 204) {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          delete api.defaults.headers.common["Authorization"];
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error, "Error deleting account");
    } finally {
      hideDeleteConfirmationDialog(); // Close the confirmation dialog whether deletion succeeds or fails.
    }
  };

  const showDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="text-white">
      <div>
        <div className="accountPageImage"></div>
        <div className="overlay"></div>
      </div>

      <div className="account-page-container">
        <h1 className="larger-text-h1">Account Information</h1>
        <div className="mt-3 mb-2">
          <p className="larger-text">Email: {user && user.email}</p>
          <p className="larger-text">
            Display Name: {user && user.display_name}
          </p>
        </div>
        <div>
          <Button onClick={handleEditClick} className="btn-lg d-block mb-2">
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={showDeleteConfirmationDialog}
            className="btn-lg d-block"
          >
            Delete
          </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="custom-modal">
          <Modal.Title>Edit Account Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-bg">
          <div className="mb-3">
            {" "}
            {/* Add margin-bottom to create space */}
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            {" "}
            {/* Add margin-bottom to create space */}
            <label>Display Name:</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="text-black">
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} className="text-black">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteConfirmation}
        onHide={hideDeleteConfirmationDialog}
      >
        <Modal.Header closeButton className="custom-modal">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-bg">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteConfirmationDialog} className="text-black">
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAccount} className="text-black">
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
