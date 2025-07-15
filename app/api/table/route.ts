import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET() {
   const data = Array.from({ length: 50 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      jobType: faker.person.jobTitle(),
      gender: faker.person.sex(),
      address: faker.location.streetAddress(),
      locality: faker.location.country(),
      age: faker.number.int({ min: 1, max: 99 }),
      visits: faker.number.int({ min: 0, max: 1000 }),
      status: faker.helpers.arrayElement(['relationship', 'complicated', 'single']),
      lastUpdate: faker.date.recent(),
   }));

   return NextResponse.json(data);
}
