"use client";

import {
  initialState,
  PokemonActions,
  InitialStateInterface,
  PokemonBasicInfo,
  Pokemon,
} from "@/models/models";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
interface Props {
  children: ReactNode;
}

//
const GlobalContext = createContext<any>(initialState);

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
  action: { type: PokemonActions; payload?: any }
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
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4500/api"
      : "https://adalab-server.onrender.com/api";

  const limit = 20;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState<Partial<Pokemon>[]>([]);

  const allPokemon = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(`${baseUrl}/pokemon?limit=${limit}`);
    const data = await response.json();

    dispatch({ type: "GET_ALL_POKEMON", payload: data });

    const allPokemonData: any = [];

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
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = await res.json();

    const evolutionChainResponse = await fetch(pokemonData.species.url);
    const evolutionData = await evolutionChainResponse.json();

    dispatch({
      type: "GET_POKEMON",
      payload: { ...pokemonData, ...evolutionData },
    });
  };

  //get all pokemons from database for search

  const getPokemonDatabase = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${baseUrl}/pokemon?limit=100000&offset=0`);
    const data = await res.json();

    dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
  };

  //search pokemon without third library party as lodash

  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const realTimeSearch = debounce(async (search: string) => {
    dispatch({ type: "LOADING" });
    const res = state.pokemonDatabase.filter((pokemon: any) => {
      return pokemon.name.includes(search.toLowerCase());
    });
    dispatch({ type: "GET_SEARCH", payload: res });
  }, 150);

  //next page or load more pokemons

  const next = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(state.next);
    const data = await res.json();

    console.log(data);
    dispatch({ type: "NEXT", payload: data });

    const nextPagePokemonData: any = [];

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      nextPagePokemonData.push(pokemonData);
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
