import React, { FC } from "react";
import { Patient } from "./PageWrapper";

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      <img
        src={`http://localhost:3000/uploads/${patient.document_photo}`}
        alt="Patient"
        className="w-32 h-32 object-cover rounded-full mb-4"
      />

      <div className="w-full max-w-md space-y-4">
        <div>
          <span className="font-semibold">Name:</span> {patient.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {patient.email}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {patient.phone}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
