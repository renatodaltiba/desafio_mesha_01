import React, { useContext, useEffect, useState } from "react";
import { Flex, Image, Heading, VStack, Text, Button } from "@chakra-ui/react";
import CardMusic from "../../components/CardMusic";
import { UtilsContext } from "../../context/UtilsContext";

const Playlist = () => {
  const [data, setData] = useState<any>([{}]);

  const {deletePlayListInStorage} = useContext(UtilsContext)

  useEffect(() => {
    async function getData() {
      const dados = await localStorage.getItem("date");

      setData(dados ? JSON.parse(dados) : []);
    }
    getData() 
  }, [data]);

  
  return (
    <Flex w="100%" align="center" justify="center" flexDirection="column">
      <Image src="/logo.png" alt="logo" mt="140px" />
      <Flex flexDir="column" w="100%" maxW="600" mt="134px">
        <Heading color="white" textAlign="left">
          Lista de Playlist
        </Heading>
        <VStack spacing="3" mb="3">
          {data?.map((item: any) => {
            return (
              <Flex flexDir="column" w="100%" key={item.date}>
                <Flex align="center" justify="space-between">
                  <Flex>
                    <Text textAlign="right" color="white">
                      {item.date} - {item.city} - Temp: {item.temp}°
                    </Text>
                  </Flex>

                  <Button
                    bg="#d13f3f"
                    color="#1A0B0B"
                    mb="2"
                    h="60px"
                    borderRadius="8"
                    textAlign="center"
                    onClick={() => deletePlayListInStorage(item.id)}
                  >
                    DELETAR PLAYLIST
                  </Button>
                </Flex>
                <VStack w="100%" mt="3">
                  {item?.playList?.map((i: any) => {
                    return (
                      <CardMusic
                        key={i.track.key}
                        artist={i.track.subtitle}
                        track={i.track.title}
                        banner={i.track.images.background}
                      />
                    );
                  })}
                </VStack>
              </Flex>
            );
          })}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Playlist;
