import React, { FC } from "react";
import { Patient } from "./PageWrapper";

interface PatientListProps {
  patients: Patient[];
}

const PatientList: FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Document
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <td className="px-6 py-4 border-b border-gray-300">
                {patient.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
                {patient.email}
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
                {patient.phone}
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
                <img
                  src={`http://localhost:3000/uploads/${patient.document_photo}`}
                  // src={patient.document_photo}
                  alt="Document"
                  className="w-12 h-12 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
