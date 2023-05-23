import { Repository } from "typeorm";
import Country from "./Country.entity";
import { getRepository } from "../database/init";
import CountryFixtures from "../data/country";
import { CountryType } from "../data/country";

export default class CountryRepository {
  private static repository: Repository<Country>;

  static async initializeRepository() {
    this.repository = await getRepository(Country);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  static async initializeData(): Promise<void> {
    const countries = CountryFixtures.Countries;
    for (const country of countries) {
      await this.repository.save(country);
    }
  }

  static async getAllCountries(): Promise<Country[] | null> {
    return this.repository.find();
  }

  static async getCountryByCode(code: string): Promise<Country | null> {
    return this.repository.findOneBy({ code });
  }

  static async getCountriesByContinent(
    continent: string
  ): Promise<Country[] | null> {
    return this.repository.findBy({ continent });
  }

  static async createCountry(
    country: string,
    code: string,
    capital: string,
    continent: string,
    flag: string
  ): Promise<Country> {
    const newCountry = new Country(country, code, capital, continent, flag);
    return this.repository.save(newCountry);
  }
}
