import React, { FC } from "react";

interface FormResultsProps {
  formStatus: "idle" | "error" | "success" | "multipleErrors";
  errors: {
    name: string;
    email: string;
    phone: string;
    documentPhoto: string;
  };
}

const FormResults: FC<FormResultsProps> = ({ formStatus, errors }) => {
  return (
    <>
      {formStatus === "error" && (
        <div>
          <h2 className="text-red-500 font-bold mb-2">Error in the form:</h2>
          {Object.values(errors).map(
            (error, index) =>
              error && (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              )
          )}
        </div>
      )}
      {formStatus === "multipleErrors" && (
        <div>
          <h2 className="text-red-500 font-bold mb-2">
            Multiple errors in the form:
          </h2>
          {Object.values(errors).map(
            (error, index) =>
              error && (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              )
          )}
        </div>
      )}
      {formStatus === "success" && (
        <p className="text-green-500">Form submitted successfully!</p>
      )}
    </>
  );
};

export default FormResults;
