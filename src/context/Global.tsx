/* eslint-disable prefer-spread */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import {
  initialState,
  type PokemonActions,
  type InitialStateInterface,
  PokemonBasicInfo,
  type Pokemon,
  type TYPE,
} from "@/models/models";
import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
interface Props {
  children: ReactNode;
}

//
const GlobalContext = createContext<TYPE>(initialState);

// actions

const LOADING: PokemonActions = "LOADING";
const GET_POKEMON: PokemonActions = "GET_POKEMON";
const GET_ALL_POKEMON: PokemonActions = "GET_ALL_POKEMON";
const GET_SEARCH: PokemonActions = "GET_SEARCH";
const GET_POKEMON_DATABASE: PokemonActions = "GET_POKEMON_DATABASE";
const NEXT: PokemonActions = "NEXT";

// reducer
const reducer = (
  state: InitialStateInterface,
  action: { type: PokemonActions; payload?: TYPE }
) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        loading: false,
      };
    case GET_POKEMON:
      return { ...state, pokemon: action.payload, loading: false };
    case GET_POKEMON_DATABASE:
      return { ...state, pokemonDatabase: action.payload, loading: false };
    case GET_SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case NEXT:
      return {
        ...state,
        allPokemon: [...state.allPokemon, ...action.payload.results],
        next: action.payload.next,
        loading: false,
      };
  }
  return state;
};

export const GlobalProvider = ({ children }: Props) => {
  const baseUrl = "https://pokeapi.co/api/v2";

  const limit = 20;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState<Partial<Pokemon>[]>([]);

  const allPokemon = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(`${baseUrl}/pokemon?order_by=id?limit=${limit}`);
    const data = await response.json();

    dispatch({ type: "GET_ALL_POKEMON", payload: data });

    const allPokemonData: TYPE = [];

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const evolutionChainResponse = await fetch(pokemonData.species.url);
      const evolutionData = await evolutionChainResponse.json();

      allPokemonData.push({ ...pokemonData, ...evolutionData });
    }
    setAllPokemonData(allPokemonData);
  };

  const getPokemon = async (name: string) => {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${baseUrl}/pokemon/${name}?order_by=id`);
    const pokemonData = await res.json();

    const evolutionChainResponse = await fetch(pokemonData.species.url);
    const evolutionData = await evolutionChainResponse.json();

    dispatch({
      type: "GET_POKEMON",
      payload: { ...pokemonData, ...evolutionData },
    });
  };

  const getPokemonDatabase = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${baseUrl}/pokemon?limit=100000&offset=0`);
    const data = await res.json();

    dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
  };

  const debounce = (func: TYPE, delay: TYPE) => {
    let timeoutId: TYPE;
    return (...args: TYPE[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const realTimeSearch = debounce(async (search: string) => {
    dispatch({ type: "LOADING" });
    const res = state.pokemonDatabase.filter((pokemon: TYPE) => {
      return pokemon.name.includes(search.toLowerCase());
    });
    dispatch({ type: "GET_SEARCH", payload: res });
  }, 150);

  //next page or load more pokemons

  const next = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(state.next);
    const data = await res.json();
    dispatch({ type: "NEXT", payload: data });

    const nextPagePokemonData: TYPE = [];

    for (const pokemon of data.results) {

      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const evolutionChainResponse = await fetch(pokemonData.species.url);
      const evolutionData = await evolutionChainResponse.json();

      nextPagePokemonData.push({ ...pokemonData, ...evolutionData });
    }


    setAllPokemonData([...allPokemonData, ...nextPagePokemonData]);

  };

  useEffect(() => {
    allPokemon();
    realTimeSearch();
    getPokemonDatabase();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ ...state, allPokemonData, getPokemon, realTimeSearch, next }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
