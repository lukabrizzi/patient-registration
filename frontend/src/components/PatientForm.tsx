import React, { FC, useState } from "react";
import axios from "axios";
import Button from "./Button";

interface PatientFormProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPatients: () => Promise<void>;
}

const PatientForm: FC<PatientFormProps> = ({ setModalOpen, fetchPatients }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (documentPhoto) {
      formData.append("documentPhoto", documentPhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/patients",
        formData
      );
      console.log("Patient saved:", response.data);
      fetchPatients();
      setModalOpen(false);
    } catch (error) {
      setHasError(true);
      console.error("Error saving patient:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-sm p-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-sm p-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>Phone</span>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border rounded-sm p-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>Patient Image</span>
        <input
          type="file"
          accept=".jpg"
          onChange={(e) => setDocumentPhoto(e.target.files![0])}
          required
          className="border rounded-sm p-1"
        />
      </div>
      {hasError && <span className="text-red-500">Request Error</span>}
      <Button type="submit">Add Patient</Button>
    </form>
  );
};

export default PatientForm;
