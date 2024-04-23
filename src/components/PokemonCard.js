import { getPokeTypeColor } from '@/utils/BackgroundTypes';
import {
  AspectRatio,
  Badge,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function PokemonCard({ pokemon }) {
  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
    >
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt="Pokemon image"
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize" fontSize="1.4rem" fontWeight="500">
        {pokemon.name}
      </Text>
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
  );
}
