import React, { FC } from "react";
import { Patient } from "./PageWrapper";

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQGq3ptp-15BTQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722761918114?e=2147483647&v=beta&t=pZwh6b-wU8uC8I8p_U-TCXRqM2iMhosfdL3Sd3YcgqI"
        //   src={patient.document_photo}
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
