export interface Friend {
  _id: string;
  title: string;
  url?: string | null;
  addressUrl?: string | null;
  imageUrl: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  workDays: WorkDay[] | null;
}

export type WorkDay = {
  _id: string;
  isOpen: boolean;
  from: string;
  to: string;
};
