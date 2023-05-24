import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Country from "../../models/Country.entity";
import CreateCountryArgs from "./Country.input";
import CountryRepository from "../../models/Country.repository";

@Resolver(Country)
export default class CountryResolver {
  // GET ALL
  @Query(() => [Country])
  countries(): Promise<Country[] | null> {
    return CountryRepository.getAllCountries();
  }

  // GET ONE BY CODE
  @Query(() => Country)
  country(@Arg("code") code: string): Promise<Country | null> {
    return CountryRepository.getCountryByCode(code);
  }

  // GET BY CONTINENT
  @Query(() => [Country])
  countriesByContinent(@Arg("continent") continent: string): Promise<Country[] | null> {
    return CountryRepository.getCountriesByContinent(continent);
  }

  // CREATE
  @Mutation(() => Country)
  createCountry(@Args() { country, code, capital, continent, flag}: CreateCountryArgs): Promise<Country> {
    return CountryRepository.createCountry(country, code, capital, continent, flag);
  }
}