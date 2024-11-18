import { v4 as uuidv4 } from 'uuid';

export const generateQRSecret = (employeeId: string): string => {
    const baseSecret = process.env.QRSECRET || "placeholder";
    const uniqueSecret = `${baseSecret}-${employeeId}-${uuidv4()}`;
    return uniqueSecret;
};
