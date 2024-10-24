import { useState, FC } from "react";
import axios from "axios";
import Button from "./Button";
import FormResults from "./FormResults";
import InputField from "./InputField";
import DragAndDropField from "./DragAndDropField";
import { validateForm, ValidationErrors } from "../utils/validation";

interface PatientFormProps {
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPatients: () => Promise<void>;
}

const PatientForm: FC<PatientFormProps> = ({
  setIsCreateModalOpen,
  fetchPatients,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    documentPhoto: null as File | null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    phone: "",
    documentPhoto: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "error" | "success" | "multipleErrors"
  >("idle");

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationResults = validateForm(formData);

    if (!validationResults.isValid) {
      setErrors(validationResults.errors);
      setFormStatus(
        validationResults.errorCount > 1 ? "multipleErrors" : "error"
      );
      setShowResults(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("countryCode", formData.countryCode);
    formDataToSend.append("phoneNumber", formData.phone);
    if (formData.documentPhoto) {
      formDataToSend.append("documentPhoto", formData.documentPhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/patients",
        formDataToSend
      );
      console.log("Patient saved:", response.data);
      setFormStatus("success");
      fetchPatients();

      const storedPatients = JSON.parse(
        localStorage.getItem("patients") || "[]"
      );
      const newPatient = {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        phoneNumber: formData.phone,
        documentPhoto: formData.documentPhoto
          ? URL.createObjectURL(formData.documentPhoto)
          : null,
      };
      storedPatients.push(newPatient);
      localStorage.setItem("patients", JSON.stringify(storedPatients));
    } catch (error) {
      setFormStatus("error");
    }

    setShowResults(true);
  };

  const handleFileDrop = (file: File) => {
    setFormData((prev) => ({ ...prev, documentPhoto: file }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        required
      />
      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />
      <InputField
        label="Country Code"
        name="countryCode"
        value={formData.countryCode}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        required
      />
      <DragAndDropField
        label="Patient Image"
        file={formData.documentPhoto}
        onFileDrop={handleFileDrop}
        error={errors.documentPhoto}
      />
      {showResults && <FormResults formStatus={formStatus} errors={errors} />}
      {formStatus !== "success" ? (
        <Button type="submit">Add Patient</Button>
      ) : (
        <Button onClick={() => setIsCreateModalOpen(false)}>Close</Button>
      )}
    </form>
  );
};

export default PatientForm;
