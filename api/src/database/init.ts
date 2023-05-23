import { DataSource, EntityTarget } from "typeorm";
import CountryRepository from "../models/Country.repository";

const dataSource = new DataSource({
  type: "sqlite",
  database: "countries.sqlite",
  synchronize: true,
  entities: [__dirname + `/../models/**/*.entity.{js,ts}`],
  logging: ["query", "error"],
});

let initialized = false;
async function getDatabase() {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("Successfully connected to database.");
  }
  return dataSource;
}

async function getRepository(entity: EntityTarget<any>) {
  return (await getDatabase()).getRepository(entity);
}

async function initializeDatabaseRepository() {
  await CountryRepository.initializeRepository();
}

async function clearAllRepository() {
  await CountryRepository.clearRepository();
}

async function closeConnection() {
  await dataSource.destroy();
}

export {
  getDatabase,
  getRepository,
  initializeDatabaseRepository,
  clearAllRepository,
  closeConnection,
};
