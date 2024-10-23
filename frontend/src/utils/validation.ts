export interface ValidationErrors {
  name: string;
  email: string;
  phone: string;
  documentPhoto: string;
}

export const validateForm = (formData: any) => {
  const errors: ValidationErrors = {
    name: "",
    email: "",
    phone: "",
    documentPhoto: "",
  };
  let isValid = true;
  let errorCount = 0;

  if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    errors.name = "Name must contain only letters.";
    isValid = false;
    errorCount++;
  }

  if (!/^[\w-\.]+@gmail\.com$/.test(formData.email)) {
    errors.email = "Email must be a valid @gmail.com address.";
    isValid = false;
    errorCount++;
  }

  const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
  if (!/^\+?\d{10,15}$/.test(fullPhoneNumber)) {
    errors.phone = "Phone number must be valid and 10-15 digits long.";
    isValid = false;
    errorCount++;
  }

  if (!formData.documentPhoto || formData.documentPhoto.type !== "image/jpeg") {
    errors.documentPhoto = "Please upload a valid .jpg image.";
    isValid = false;
    errorCount++;
  }

  return { isValid, errors, errorCount };
};
