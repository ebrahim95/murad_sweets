// Form type definitions - to be implemented in task 2
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
