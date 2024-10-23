import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import Modal from "./Modal";
import PatientForm from "./PatientForm";
import { Plus } from "lucide-react";
import Button from "./Button";
import axios from "axios";

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  document_photo: string;
}

const PageWrapper = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <div className="w-screen h-screen p-10">
        <h1 className="font-bold text-3xl">Patients</h1>
        <div className="p-10 space-y-4">
          <Button onClick={handleOpenModal}>
            <div className="flex flex-row gap-2">
              <Plus />
              Create Patient
            </div>
          </Button>

          <PatientList patients={patients} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create Patient"
      >
        <PatientForm
          setModalOpen={setModalOpen}
          fetchPatients={fetchPatients}
        />
      </Modal>
    </>
  );
};

export default PageWrapper;
