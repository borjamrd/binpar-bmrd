/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface InitialStateInterface {
  allPokemon: TYPE;
  pokemon: Pokemon | object;
  pokemonDatabase: Pokemon[];
  searchResults: Partial<Pokemon>[];
  next: string;
  loading: boolean;
}

export type TYPE = any

export type PokemonActions =
  | "LOADING"
  | "GET_POKEMON"
  | "GET_ALL_POKEMON"
  | "GET_ALL_POKEMON_DATA"
  | "GET_SEARCH"
  | "GET_POKEMON_DATABASE"
  | "NEXT";

export const initialState: InitialStateInterface = {
  allPokemon: [],
  pokemon: {},
  pokemonDatabase: [],
  searchResults: [],
  next: "",
  loading: false,
};

export interface PokemonList {
  number: number;
}

export interface PokemonBasicInfo {
  name: string;
  url: string;
}
export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Color[];
  game_indices: GameIndex[];
  height: number;
  held_items: TYPE[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: TYPE[];
  past_types: TYPE[];
  species: Color;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: Color[];
  evolution_chain: EvolutionChain;
  evolves_from_species: Color;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: TYPE[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Color;
  growth_rate: Color;
  habitat: Color;
  has_gender_differences: boolean;
  hatch_counter: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  names: Name[];
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Color;
  varieties: Variety[];
}

export interface Ability {
  ability: Color;
  is_hidden: boolean;
  slot: number;
}

export interface Color {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Color;
  version: Color;
}

export interface GameIndex {
  game_index: number;
  version: Color;
}

export interface Genus {
  genus: string;
  language: Color;
}

export interface Move {
  move: Color;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Color;
  version_group: Color;
}

export interface Name {
  language: Color;
  name: string;
}

export interface PalParkEncounter {
  area: Color;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Color;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: string;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Color;
}

export interface Type {
  slot: number;
  type: Color;
}

export interface Variety {
  is_default: boolean;
  pokemon: Color;
}
