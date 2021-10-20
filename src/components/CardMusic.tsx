import React from "react";
import { Flex, Text, Image, Icon, Link, HStack } from "@chakra-ui/react";
import { AiFillApple, AiFillYoutube } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";

interface MusicProps {
  banner: string;
  track: string;
  artist: string;
  spotify?: string;
  deezer?: string;
  apple?: string;
}

const CardMusic = ({apple, artist, spotify, deezer, track, banner}: MusicProps) => {
  return (
    <Flex bg="white" w="100%" borderRadius="8">
      <Flex w="100%" maxW="400" margin="auto">
        <Flex w="100%" justify="space-between" align="start">
          <Flex flexDir="column" pt="4" fontWeight="bold">
            <Text>Música: {track}</Text>
            <Text>Banda: {artist}</Text>

            <Flex flexDir="row" mt="12px">
              <HStack>
                <Link href={apple}>
                  <Icon as={AiFillApple} fontSize="35px" />
                </Link>
                <Link href={spotify}>
                  <Icon as={BsSpotify} fontSize="35px" />
                </Link>
                <Link href={deezer}>
                  <Icon as={AiFillYoutube} fontSize="35px" />
                </Link>
              </HStack>
            </Flex>
          </Flex>

          <Image
            p="4"
            borderRadius="3xl"
            src={banner}
            alt="ed"
            boxSize="150px"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardMusic;
