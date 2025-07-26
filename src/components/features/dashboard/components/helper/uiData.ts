export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

export const uiData: IUser[] = [
  {
    id: 1,
    name: 'Alice Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'alice.smith@example.com',
    phone: '+1987654321',
    address: '456 Oak Ave, Springfield, USA',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'bob.johnson@example.com',
    phone: '+1123456789',
    address: '789 Pine Rd, Metropolis, USA',
  },
  {
    id: 3,
    name: 'Carol Lee',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'carol.lee@example.com',
    phone: '+1098765432',
    address: '321 Maple St, Gotham, USA',
  },
];
