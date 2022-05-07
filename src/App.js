import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Center, Text } from "@chakra-ui/react";

function App() {
  const [roomtemp, setRoomtemp] = useState(null);
  const [roomhumidity, setRoomhumidity] = useState(null);
  const [remoteTemp, setRemoteTemp] = useState(null);
  const [status, setStatus] = useState(false);
  const [refres, setRefres] = useState(false)

  const gettemp = async () => {
    await axios.get("https://api.thingspeak.com/channels/1699188/feeds.json?api_key=VDUJ37N3H8E12E7H&results=2").then((res) => {
      console.log(res.data.feeds[0]);
      setRemoteTemp(res.data.feeds[0].field3);
      setRoomtemp(res.data.feeds[0].field1);
      setRoomhumidity(res.data.feeds[0].field2);
    })
  }
  setTimeout(() => {
    setRefres(!refres)
  }, 20000);
  
  useEffect(() => {
    if (status) {
      gettemp();
    }
  }, [status, refres])

  return (
    <>
      {status && (
        <Center>
          <Box m={5}>
            <Text>
              Temperature:
              <Text as="h1" fontSize={"2xl"}>{roomtemp}°C</Text>
            </Text>
            <Text>
              Humidity:
              <Text as="h1" fontSize={"2xl"}>{roomhumidity}%</Text>
            </Text>
            <Text>
              Temperature:
              <Text as="h1" fontSize={"2xl"}>{remoteTemp}°C</Text>
            </Text>
          </Box>
        </Center>
      )}
      <Center m="25px">
        <Button bg={"red"} onClick={() => {
          setStatus(!status)
        }}>
          {status ? "OFF" : "ON"}
        </Button>
      </Center>

    </>
  );
}

export default App;
