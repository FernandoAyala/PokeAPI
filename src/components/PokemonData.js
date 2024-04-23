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
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PokemonData({ pokemon }) {
  const [catched, setCatched] = useState(false);
  console.log('pokemon', pokemon);

  const baseStatsNames = {
    hp: "Hp",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "special attack",
    "special-defense": "special defense",
    speed: "speed",
  };

  return (
    <Stack spacing="4" pb="4">
      <Stack spacing="2" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox>Catched</Checkbox>
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
            <Badge textAlign="center" size="md">{pokemon.weight/10} Kg </Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Badge textAlign="center" size="md">{pokemon.height/10} m </Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Moves</Text>
            <Badge textAlign="center" size="md">{pokemon.moves.length}</Badge>
          </Stack>
          <Stack>
            <Text fontSize="sm">Types</Text>
            <HStack>
              {pokemon.types.map((type) => (
                <Badge style={{backgroundColor: getPokeTypeColor(type.type.name), color:'white'}} size="xs" key={type.slot}>
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
