import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

const codeRegex = /^[A-Z]{2}$/;
const unicodeRegex = /^[\u0000-\uFFFF]$/;

@ArgsType()
class CreateCountryArgs {
  @Field()
  @IsString({ message: "Le nom du pays doit être une chaine de caractère." })
  @MinLength(1, { message: "Le nom du pays doit faire au moins un caractère de long." })
  @MaxLength(255, {
    message: "Le nom du pays doit faire au maximum 255 caractères de long.",
  })
  country: string;

  @Field()
  @IsString({ message: "Le code du pays doit être une chaine de caractère." })
  @Matches(codeRegex, {
    message: "Le code du pays doit être une chaine de 2 caractères majuscules."
  })
  code: string;

  @Field()
  @IsString({ message: "La capitale du pays doit être une chaine de caractère." })
  @MinLength(1, { message: "La capitale du pays doit faire au moins un caractère de long." })
  @MaxLength(255, {
    message: "La capitale du pays doit faire au maximum 255 caractères de long.",
  })
  capital: string;

  @Field()
  @IsString({ message: "Le continent doit être une chaine de caractère." })
  @MinLength(1, { message: "Le continent doit faire au moins un caractère de long." })
  @MaxLength(255, {
    message: "Le continent doit faire au maximum 255 caractères de long.",
  })
  continent: string;

  @Field()
  @IsString({ message: "Le drapeau doit être une chaine de caractère." })
  @Matches(unicodeRegex, {
    message: "Le drapeau doit être une chaine de caractère unicode."
  })
  flag: string;
}

export default CreateCountryArgs;