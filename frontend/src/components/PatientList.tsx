import React, { FC } from "react";
import { Patient } from "./PageWrapper";
import Button from "./Button";

interface PatientListProps {
  patients: Patient[];
  setPatientToShow: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientList: FC<PatientListProps> = ({ patients, setPatientToShow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Photo
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider w-1"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <td className="px-6 py-4 border-b border-gray-300 w-1/2">
                {patient.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 w-1/2">
                <img
                  src={`http://localhost:3000/uploads/${patient.document_photo}`}
                  alt="Patient"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-right w-1">
                <Button
                  onClick={() => {
                    setPatientToShow(patient);
                  }}
                >
                  Show patient
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
