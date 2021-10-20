import type { NextPage } from "next";
import {
  Flex,
  Image,
  Text,
  Input,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import CardMusic from "../components/CardMusic";
import { useContext, useState } from "react";
import { UtilsContext } from "../context/UtilsContext";

import Route from 'next/router'

const Home: NextPage = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const { verifyTemp, playList, genrer, temp, handleSaveInStorage } = useContext<any>(UtilsContext);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    await verifyTemp(city);

    setLoading(false);
  }

  async function saveInStorage(e: any) {
    e.preventDefault()

    await handleSaveInStorage(city);

  }

  return (
    <Flex w="100%" align="center" justify="center" flexDirection="column">
      <Image src="/logo.png" alt="logo" mt="140px" />
      <Flex flexDir="column" w="100%" maxW="600" mt="134px">
        <Flex
          as="form"
          onSubmit={handleSubmit}
          flexDir="column"
          color="white"
          h="100%"
        >
          <Text>Escolha sua cidade: </Text>
          <Input
            variant="unstyled"
            bg="white"
            color="black"
            p="4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Flex>
            <Button
              bg="#53EB62"
              type="submit"
              color="#1A0B0B"
              mb="2"
              mt="25"
              w="75%"
              ml="auto"
              mr="auto"
              h="60px"
              borderRadius="8"
            >
              {loading ? <Spinner /> : "PESQUISAR PLAYLIST"}
            </Button>

            <Button
              bg="#53EB62"
              color="#1A0B0B"
              mb="2"
              mt="25"
              w="75%"
              ml="10px"
              mr="auto"
              h="60px"
              borderRadius="8"
              textAlign="center"
              onClick={() => Route.push('playlist')}
            >
              SUAS PLAYLISTS
            </Button>
          </Flex>
        </Flex>

        <Flex color="white" w="100%" justify="space-between" mt="64px">
          {playList.length > 0 ? (
            <>
              {" "}
              <Flex flexDir="column">
                <Text>Temp: {temp}</Text>
                <Text>Gênero: {genrer}</Text>
              </Flex>
              <Button
                bg="transparent"
                color="#53EB62"
                border="2px solid #53EB62"
                onClick={saveInStorage}
              >
                Salvar Playlist
              </Button>
            </>
          ) : (
            ""
          )}
        </Flex>
        <VStack spacing="3" mt="16px" mb="30px">
          {playList.map((i: any) => {
            return (
              <CardMusic
                artist={i?.track?.subtitle}
                track={i?.track?.title}
                key={i?.track?.key}
                banner={i?.track?.images?.background}
              />
            );
          })}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Home;
