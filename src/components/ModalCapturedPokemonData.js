import PokemonCard from '@/components/PokemonCard';
import PokemonData from '@/components/PokemonData';
import {
  Box,
  Input,
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
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ModalCapturesPokemonData({
  capturedPokemonModal,
  pokemonsCatch,
  getPokes,
}) {
  const pokemonDataModalCatch = useDisclosure();
  const [selectedPokemonCatch, setSelectedPokemonCatch] = useState();
  const [search, setSearch] = useState('');

  function handleViewPokemonCatch(pokemon) {
    setSelectedPokemonCatch(pokemon);
    pokemonDataModalCatch.onOpen();
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filterPokemonsByName = (pokemons) => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleModalClose = () => {
    setSearch('');
    capturedPokemonModal.onClose()
  };

  return (
    <>
      <Modal {...capturedPokemonModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            textTransform="capitalize"
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            Gotta Catch ‘Em All
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Search Pokemon..."
                value={search}
                onChange={handleSearchChange}
              />
              <SimpleGrid spacing="3" columns={{ base: 2, md: 3 }}>
                {filterPokemonsByName(pokemonsCatch).map((pokemon) => (
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
              {pokemonsCatch.length === 0 && (
                <Text color="tomato" textAlign="center" fontWeight="bold">
                  No Pokémon Captured
                </Text>
              )}
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
    </>
  );
}
