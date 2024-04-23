import PokemonData from '@/components/PokemonData';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';

export default function ModalPokemonData({
  pokemonDataModal,
  selectedPokemon,
  getPokes,
  catched,
}) {
  return (
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
  );
}
