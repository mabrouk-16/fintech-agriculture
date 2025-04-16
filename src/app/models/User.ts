
export interface RetailerModel {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  img?: string;
  companyName?: string;
  taxNumber?: string;
  type?: string;
  taxImage?: string;
  description?: string;
  lon?: number;
  lat?: number;
}
export interface FarmerModel {
  profileImage?: string;
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  phone?: string;
  personalID?: string;
  farmImages?: string[]; // Assuming List<string>
  farmName?: string;
  farmServices?: string[]; // Assuming List<string>
  farmState?: string;
  farmCredentialImage?: string; // Corrected the typo "farmCredentilaImage"
  latitude?: number;
  longitude?: number;
}
export enum UserRoles {
  farmer = 'farmer',
  retailer = 'retailer',
}
export interface logBody {
  email: string;
  password: string;
}
export interface UserLinks {
  linkedIn?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  github?: string | null;
  website?: string | null;
}
