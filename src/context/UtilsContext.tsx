import axios from "axios";
import { createContext, useState } from "react";
import { parseISO, isAfter, format } from "date-fns";
import { v4 } from 'uuid'
type UtilsContextType = {
  verifyTemp: (city: string) => void;
  playList: {};
  genrer: string;
  temp: number;
  handleSaveInStorage: (city: string) => void;
  deletePlayListInStorage: (id: string) => Promise<void>
};

type ResponseTemp = {
  main: {
    temp: number;
  };
};

export const UtilsContext = createContext({} as UtilsContextType);

export function UtilsContextProvider({ children }: any) {
  const [playList, setPlayList] = useState([]);
  const [genrer, setGenrer] = useState("");
  const [temp, setTemp] = useState<any>();

  async function verifyTemp(city: string) {
    
    const response = await axios.get<ResponseTemp>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0bce71769ecf032bfaee05d0e0d89e95&units=metric`
    );

    
    setTemp(response.data.main.temp);

    if (response.data.main.temp > 32) {
      const playlist = await axios.get<any>(
        `https://shazam.p.rapidapi.com/search?term=rock&locale=pt-BR&offset=0`,
        {
          headers: {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key":
              "e8a9e0aa74mshe07ec561c6eec92p1fa722jsnf5d72921a200",
          },
        }
      );

      setPlayList(playlist.data.tracks.hits);
      setGenrer("Rock");
      return;
    }

    if (response.data.main.temp <= 32 && response.data.main.temp > 24) {
      const playlist = await axios.get<any>(
        `https://shazam.p.rapidapi.com/search?term=pop&locale=pt-BR&offset=0`,
        {
          headers: {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key":
              "e8a9e0aa74mshe07ec561c6eec92p1fa722jsnf5d72921a200",
          },
        }
      );

      setPlayList(playlist.data.tracks.hits);
      setGenrer("Pop");

      return;
    }
    if (response.data.main.temp <= 24 && response.data.main.temp > 16) {
     
      const playlist = await axios.get<any>(
        `https://shazam.p.rapidapi.com/search?term=classica&locale=pt-BR&offset=0`,
        {
          headers: {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key":
              "e8a9e0aa74mshe07ec561c6eec92p1fa722jsnf5d72921a200",
          },
        }
      );

      setPlayList(playlist.data.tracks.hits);
      setGenrer("Classica");
      return;
    }
    if (response.data.main.temp <= 16) {
      const playlist = await axios.get<any>(
        `https://shazam.p.rapidapi.com/search?term=Lofi&locale=pt-BR&offset=0`,
        {
          headers: {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key":
              "e8a9e0aa74mshe07ec561c6eec92p1fa722jsnf5d72921a200",
          },
        }
      );

      setPlayList(playlist.data.tracks.hits);
      setGenrer("Lofi");
      return;
    }

    
  }

  
  async function handleSaveInStorage(city: string) {
    const dados = localStorage.getItem("date");

    const oldData = dados ? JSON.parse(dados) : [];

    const data = {
      id: v4(),
      date: format(new Date(), "dd/MM/yyyy"),
      city,
      temp,
      genrer,
      playList,
    };

    const newSave = [...oldData, data];

    localStorage.setItem("date", JSON.stringify(newSave));

    
  }

  async function deletePlayListInStorage(id: string) {
    

    const oldData = await localStorage.getItem("date");

    const oldDataObject = oldData ? JSON.parse(oldData) : [];

    const newObject = oldDataObject.filter((i: any) => i.id !== id)

    localStorage.setItem("date", JSON.stringify(newObject))
  }
  return (
    <UtilsContext.Provider
      value={{ verifyTemp, playList, genrer, temp, handleSaveInStorage, deletePlayListInStorage }}
    >
      {children}
    </UtilsContext.Provider>
  );
}
