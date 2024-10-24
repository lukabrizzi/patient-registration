import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import Modal from "./Modal";
import PatientForm from "./PatientForm";
import { Plus } from "lucide-react";
import Button from "./Button";
import axios from "axios";
import EmptyState from "./EmptyState";
import PatientProfile from "./PatientProfile";

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  document_photo: string;
}

const PageWrapper = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [patientToShow, setPatientToShow] = useState<Patient | null>(null);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
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
        <div className="flex flex-col p-10 space-y-4">
          <Button onClick={handleOpenCreateModal}>
            <div className="flex flex-row gap-2">
              <Plus />
              Create Patient
            </div>
          </Button>

          {patients.length > 0 ? (
            <PatientList
              patients={patients}
              setPatientToShow={setPatientToShow}
            />
          ) : (
            <EmptyState entity="patients" />
          )}
        </div>
      </div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Create Patient"
      >
        <PatientForm
          setIsCreateModalOpen={setIsCreateModalOpen}
          fetchPatients={fetchPatients}
        />
      </Modal>
      <Modal
        isOpen={!!patientToShow}
        onClose={() => setPatientToShow(null)}
        title="Patient Profile"
      >
        {/* Added ! because when we show the modal is because patientToShow is not null */}
        <PatientProfile patient={patientToShow!} />
      </Modal>
    </>
  );
};

export default PageWrapper;
