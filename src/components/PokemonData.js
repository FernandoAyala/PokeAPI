import { getPokeTypeColor } from '@/utils/BackgroundTypes';
import {
  AspectRatio,
  Badge,
  Box,
  Checkbox,
  Flex,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PokemonData({ pokemon, getPokes, catched }) {
  const [catchedPoke, setCatchedPoke] = useState(catched);
  //console.log('pokemon', pokemon);

  const baseStatsNames = {
    hp: 'Hp',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'special attack',
    'special-defense': 'special defense',
    speed: 'speed',
  };

  const handleCatchToggle = async () => {
    if (!catchedPoke) {
      try {
        const response = await axios.post('/api/catched', {
          id: pokemon.id,
          name: pokemon.name,
        });
        if (response.status === 200) {
          setCatchedPoke(true);
          getPokes();
          console.log('¡Pokemon atrapado!');
        } else {
          console.error('Error al atrapar:', response.statusText);
        }
      } catch (error) {
        console.error('Error al atrapar:', error.message);
      }
    } else {
      try {
        const response = await axios.delete(`/api/catched/${pokemon.id}`);
        if (response.status === 200) {
          setCatchedPoke(false);
          getPokes();
          console.log('¡Pokemon liberado!');
        } else {
          console.error('Error al liberar el Pokemon:', response.statusText);
        }
      } catch (error) {
        console.error('Error al liberar el Pokemon:', error.message);
      }
    }
  };

  return (
    <Stack spacing="4" pb="4">
      <Stack spacing="2" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Flex alignItems="center" justifyContent="center">
            <Checkbox isChecked={catchedPoke} onChange={handleCatchToggle}>
              Catched
            </Checkbox>
          </Flex>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            alt="Pokemon image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>

        <Stack direction="row" spacing="5" style={{ justifyContent: 'center' }}>
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Badge textAlign="center" size="md">
              {pokemon.weight / 10} Kg{' '}
            </Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Badge textAlign="center" size="md">
              {pokemon.height / 10} m{' '}
            </Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Moves</Text>
            <Badge textAlign="center" size="md">
              {pokemon.moves.length}
            </Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Types</Text>
            <HStack>
              {pokemon.types.map((type) => (
                <Badge
                  style={{
                    backgroundColor: getPokeTypeColor(type.type.name),
                    color: 'white',
                  }}
                  size="xs"
                  key={type.slot}
                >
                  {type.type.name}
                </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="1" p="1" bg="gray.100" borderRadius="xl">
        {pokemon.stats.map((type) => (
          <Stack key={type.stat.name}>
            <Text as="b" fontSize="xs" style={{ textTransform: 'uppercase' }}>
              {baseStatsNames[type.stat.name]}
            </Text>
            <Flex align="center">
              <motion.div initial={{ width: '0%' }} animate={{ width: `100%` }}>
                <Progress
                  bg="gray.300"
                  borderRadius="full"
                  value={type.base_stat}
                />
              </motion.div>
              <Text ml="auto" fontSize="xs">
                {type.base_stat}
              </Text>
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
