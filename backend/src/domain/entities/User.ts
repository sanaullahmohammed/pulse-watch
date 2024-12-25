export interface User {
  id?: string;
  email: string;
  name: string;
  authorizationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
