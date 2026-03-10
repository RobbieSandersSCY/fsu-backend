import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFaculty } from "./queries/faculty.js";
import { createDepartment } from "./queries/departments.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const depos = [
    "Cat Herding",
    "Basket Weaving",
    "Musical Arts",
    "Engineering",
  ];

  //create departments
  for (let i = 0; i <= 3; i++) {
    await createDepartment({
      name: depos[i],
      description: faker.lorem.words(5),
      contact_info: faker.internet.email(),
      image_path: "./images/departments" + i + ".png",
    });
  }
  // create faculty
  for (let i = 1; i <= 12; i++) {
    await createFaculty({
      name: faker.person.fullName(),
      bio: faker.lorem.words(5),
      contact_info: faker.internet.email(),
      image_path: "./images/faculty" + i + ".png",
    });
  }
}
