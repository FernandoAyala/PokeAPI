import Head from 'next/head';

import { PokeballIconSmall } from '@/assets/pokeball';
import PokemonCard from '@/components/PokemonCard';
import PokemonData from '@/components/PokemonData';
import {
  Box,
  Button,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const pokemonDataModal = useDisclosure();
  const capturedPokemonModal = useDisclosure();
  const pokemonDataModalCatch = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [catched, setCatched] = useState(false);
  const [pokemonsCatch, setPokemonsCatch] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [selectedPokemonCatch, setSelectedPokemonCatch] = useState();
  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'
  );

  useEffect(() => {
    setIsLoading(true);
    axios.get(currentPage).then(async ({ data }) => {
      const promises = data.results.map((result) => axios(result.url));
      const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
      );
      setPokemon((prev) => [...prev, ...fetchedPokemon]);
      setIsLoading(false);
    });
  }, [currentPage]);

  function handleNextPage() {
    const url = new URL(currentPage);
    const offset = parseInt(url.searchParams.get('offset')) || 0;
    const nextOffset = offset + 20;
    const nextPageUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${nextOffset}`;
    setCurrentPage(nextPageUrl);
  }

  function handleViewPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    const foundPokemon = pokemonsCatch.find((poke) => poke.id === pokemon.id);
    setCatched(foundPokemon ? true : false);
    pokemonDataModal.onOpen();
  }

  async function handleViewCapturedPokemon() {
    capturedPokemonModal.onOpen();
  }

  function handleViewPokemonCatch(pokemon) {
    setSelectedPokemonCatch(pokemon);
    pokemonDataModalCatch.onOpen();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const getPokes = async () => {
    try {
      const res = await axios.get(`/api/catched`);
      if (res.data) {
        const pokemonsData = [];
        for (const pokemon of res.data) {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
            );
            pokemonsData.push(response.data);
          } catch (error) {
            console.error(`Error al obtener datos de ${pokemon.name}:`, error);
          }
        }
        setPokemonsCatch(pokemonsData);
      }
    } catch (error) {
      console.error('Error al obtener datos de los Pokémon:', error);
    }
  };

  useEffect(() => {
    getPokes();
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex alignItems="center" justifyContent="center">
        <PokeballIconSmall />
        <Text fontSize="6xl">Pokédex</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
      <Button isDisabled={pokemonsCatch.length === 0} onClick={handleViewCapturedPokemon}>View Captured Pokémon</Button>
      </Flex>
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Stack p="5" alignItems="center" spacing="5">
            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {pokemon.map((pokemon) => (
                <Box
                  key={pokemon.id}
                  as="button"
                  onClick={() => handleViewPokemon(pokemon)}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <PokemonCard pokemon={pokemon} />
                  </motion.div>
                </Box>
              ))}
            </SimpleGrid>

            <Button isLoading={isLoading} onClick={() => handleNextPage()}>
              Load more
            </Button>
          </Stack>
        </Container>
      </Flex>
      <Modal {...pokemonDataModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            textTransform="capitalize"
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            {selectedPokemon?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && (
              <PokemonData
                pokemon={selectedPokemon}
                getPokes={getPokes}
                catched={catched}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal {...capturedPokemonModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Captured Pokémon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <SimpleGrid spacing="2" columns={{ base: 2, md: 3 }}>
                {pokemonsCatch.map((pokemon) => (
                  <Box
                    key={pokemon.id}
                    as="button"
                    onClick={() => handleViewPokemonCatch(pokemon)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <PokemonCard pokemon={pokemon} />
                    </motion.div>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal {...pokemonDataModalCatch}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            textTransform="capitalize"
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            {selectedPokemonCatch?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemonCatch && (
              <PokemonData
                pokemon={selectedPokemonCatch}
                getPokes={getPokes}
                catched={true}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        position="fixed"
        bottom="4"
        right="4"
        zIndex="999"
        onClick={scrollToTop}
      >
        <Button
          colorScheme="blue"
          size="lg"
          style={{ borderRadius: '70%', fontSize: '24px', fontWeight: 'bold' }}
        >
          ↑
        </Button>
      </Box>
    </>
  );
}
