export interface EmployeeResponseDTO {
    employeeId: string;
    name: string;
    currentStatus: string;
    lastStatusUpdate: Date;
  }
  
  export interface CreateEmployeeDTO {
    name: string;
    email: string;
    employeeId: string;
    qrSecret: string;
  }
  
  export interface UpdateEmployeeDTO {
    name?: string;
    email?: string;
    currentStatus?: string;
    lastStatusUpdate?: Date;
  }
  