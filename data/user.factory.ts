export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DD
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string; // option value in the country <select>
  phone: string;
}

/** A seeded account that already exists on the Toolshop. */
export const existingCustomer: Credentials = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

/** Fresh user on every call: unique email, so reruns never collide. */
export function createUser(): User {
  const unique = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  return {
    firstName: 'Test',
    lastName: 'Student',
    dob: '1999-05-20',
    street: '1 Abai Avenue',
    houseNumber: '42',
    postalCode: '050000',
    city: 'Almaty',
    state: 'Almaty',
    country: 'KZ',
    phone: '0701234567',
    email: `student.${unique}@example.com`,
    password: 'Str0ng!Passw0rd#2026',
  };
}
