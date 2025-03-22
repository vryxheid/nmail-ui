export interface Contact {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  favourite: boolean;
  ownerId: number;
}
