const registrationNumberRegex = /^\d{2}\/[A-Z]{2,5}\/BU\/R\/\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d\s-]{7,20}$/;

export const sanitizeText = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ");
};

export const isRequired = (value) => {
  return sanitizeText(String(value ?? "")).length > 0;
};

export const isLength = (value, min, max) => {
  const text = sanitizeText(value);
  return text.length >= min && text.length <= max;
};

export const isEmail = (value) => {
  const email = sanitizeText(value);
  return email.length <= 120 && emailRegex.test(email);
};

export const isPhone = (value) => {
  const phone = sanitizeText(value);
  return phoneRegex.test(phone);
};

export const isRegistrationNumber = (value) => {
  return registrationNumberRegex.test(sanitizeText(value));
};

const createResult = (errors) => ({
  isValid: errors.length === 0,
  errors
});

const validateRequiredLength = (errors, value, field, min, max) => {
  if (!isRequired(value)) {
    errors.push(`${field} is required.`);
    return;
  }

  if (!isLength(value, min, max)) {
    errors.push(`${field} must be between ${min} and ${max} characters.`);
  }
};

const validateOptionalMaxLength = (errors, value, field, max) => {
  if (isRequired(value) && sanitizeText(value).length > max) {
    errors.push(`${field} must not exceed ${max} characters.`);
  }
};

const validateRequiredMaxLength = (errors, value, field, max) => {
  if (!isRequired(value)) {
    errors.push(`${field} is required.`);
    return;
  }

  if (sanitizeText(value).length > max) {
    errors.push(`${field} must not exceed ${max} characters.`);
  }
};

const validateContinuingRegistrationNumber = (errors, applicantType, registrationNumber) => {
  if (sanitizeText(applicantType) !== "continuing") {
    return;
  }

  if (!isRequired(registrationNumber)) {
    errors.push("Registration number is required for continuing students.");
    return;
  }

  if (!isRegistrationNumber(registrationNumber)) {
    errors.push("Registration number must use the format 24/BSE/BU/R/0005.");
  }
};

export const validateAdmission = (data = {}) => {
  const errors = [];

  validateRequiredLength(errors, data.fullName, "Full name", 2, 80);

  if (!isEmail(data.email)) {
    errors.push("Email is required and must be valid.");
  }

  if (!isPhone(data.phone)) {
    errors.push("Phone is required and must be 7 to 20 characters using digits, spaces, +, or hyphens.");
  }

  validateRequiredLength(errors, data.address, "Residential address", 5, 180);
  validateRequiredLength(errors, data.previousSchool, "Previous school", 2, 120);
  validateRequiredMaxLength(errors, data.selectedProgram, "Selected program", 150);

  return createResult(errors);
};

export const validateQuickApply = (data = {}) => {
  const errors = [];

  validateRequiredLength(errors, data.fullName, "Full name", 2, 80);

  if (!isEmail(data.email)) {
    errors.push("Email is required and must be valid.");
  }

  if (!isPhone(data.phone)) {
    errors.push("Phone is required and must be 7 to 20 characters using digits, spaces, +, or hyphens.");
  }

  validateRequiredMaxLength(errors, data.program, "Selected program", 150);

  return createResult(errors);
};

export const validateScholarship = (data = {}) => {
  const errors = [];
  const type = sanitizeText(data.type);

  validateRequiredMaxLength(errors, data.type, "Scholarship type", 150);
  validateRequiredMaxLength(errors, data.applicantType, "Applicant type", 150);
  validateRequiredLength(errors, data.fullName, "Full name", 2, 80);
  validateRequiredLength(errors, data.contact, "Contact", 5, 120);
  validateContinuingRegistrationNumber(errors, data.applicantType, data.registrationNumber);

  if (type === "Academic Excellence Scholarship") {
    validateRequiredMaxLength(errors, data.academicGrades, "Academic grades", 1000);
  }

  if (type === "Sports Scholarship") {
    validateRequiredMaxLength(errors, data.sportType, "Sport type", 150);
    validateRequiredMaxLength(errors, data.achievements, "Achievements", 1000);
  }

  return createResult(errors);
};

export const validateBursary = (data = {}) => {
  const errors = [];
  const type = sanitizeText(data.type);

  validateRequiredMaxLength(errors, data.type, "Bursary type", 150);
  validateRequiredMaxLength(errors, data.applicantType, "Applicant type", 150);
  validateRequiredLength(errors, data.fullName, "Full name", 2, 80);
  validateRequiredLength(errors, data.contact, "Contact", 5, 120);
  validateContinuingRegistrationNumber(errors, data.applicantType, data.registrationNumber);

  if (type === "Needy-Based Bursary") {
    validateRequiredLength(errors, data.familyIncome, "Family income", 1, 120);
    validateRequiredMaxLength(errors, data.backgroundInfo, "Background information", 1000);
  }

  if (type === "Church Sponsorship") {
    validateRequiredLength(errors, data.churchName, "Church name", 2, 120);
    validateRequiredMaxLength(errors, data.recommendationDetails, "Recommendation details", 1000);
  }

  return createResult(errors);
};

export const validateWorkApplication = (data = {}) => {
  const errors = [];

  validateRequiredLength(errors, data.fullName, "Full name", 2, 80);
  validateRequiredLength(errors, data.contact, "Contact", 5, 120);
  validateRequiredMaxLength(errors, data.selectedRole, "Selected role", 150);

  if (!isRequired(data.registrationNumber)) {
    errors.push("Registration number is required.");
  } else if (!isRegistrationNumber(data.registrationNumber)) {
    errors.push("Registration number must use the format 24/BSE/BU/R/0005.");
  }

  return createResult(errors);
};

export const validateFeedback = (data = {}) => {
  const errors = [];
  const rating = Number(data.rating);

  validateRequiredMaxLength(errors, data.source, "Source", 80);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    errors.push("Rating is required and must be a number from 1 to 5.");
  }

  validateOptionalMaxLength(errors, data.comment, "Comment", 700);

  return createResult(errors);
};
