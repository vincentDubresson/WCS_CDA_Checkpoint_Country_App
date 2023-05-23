import { Args, Mutation, Query, Resolver } from "type-graphql";
import Country from "../../models/Country.entity";
import CreateCountryArgs from "./Country.input";

@Resolver(Country)
export default class CountryResolver {
  // GET ALL
  @Query(() => [Country])
  countries(): Promise<Country[]> {
    return CountryRepository.getAllCountries();
  }

  // GET ONE BY CODE
  @Query(() => Country)
  country(code: string): Promise<Country> {
    return CountryRepository.getCountryByCode(code);
  }

  // GET BY CONTINENT
  @Query(() => [Country])
  countriesByContinent(@Arg("continent") continent: string): Promise<Country> {
    return CountryRepository.getCountriesByContinent(continent);
  }

  // CREATE
  @Mutation(() => Country)
  createCountry(@Args() { country, code, capital, continent, flag}: CreateCountryArgs): Promise<Country> {
    return CountryRepository.createCountry(country, code, capital, continent, flag);
  }
}