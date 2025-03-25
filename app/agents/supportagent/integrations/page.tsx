import React from "react";
import {
  Button,
  Container,
  HStack,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

function Integrations() {
  return (
    <Container ml={"30px"} mt={"100px"}>
      <HStack>
        <Image alt="settings icon" mr={"5px"} asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/settings_icon.svg"
            alt={`settings icon`}
          />
        </Image>
        <Text color={"#000000"} mr={"40px"} fontSize={"32px"}>
          Integrations
        </Text>
        <Button
          bg={"#007AFF"}
          color={"white"}
          borderRadius={"100px"}
          paddingX={"15px"}
          w={"110px"}
          fontSize={"13px"}
          h={"35px"}
          mr={"5px"}
        >
          Save Changes
        </Button>
      </HStack>
      <Flex
        position="relative"
        border={`1px solid #c4c4c4`}
        py={"20px"}
        px={"25px"}
        bg={"#f5f5f5"}
        alignItems={"center"}
        gap={"10px"}
        borderRadius={"8px"}
        mt={"25px"}
        // textAlign={"center"}
        w={"700px"}
      >
        <VStack alignItems={"start"}>
          <Text>Embed Code</Text>
          <Text w={"500px"} mt={"5px"} color={"#808080"} fontSize={"14px"}>
            Add the code below to your website to add the chat widget
          </Text>

          <Flex
            w={"95%"}
            borderRadius={"10px"}
            py={"15px"}
            alignItems={"center"}
            border={`1px solid #c4c4c4`}
          >
            <Code>{`<elevenlabs-convai agent-id="a3OND4NeoPEXAdAGEXe1"></elevenlabs-convai><script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>`}</Code>
          </Flex>
        </VStack>

        {/* Hidden file input */}
      </Flex>
    </Container>
  );
}

export default Integrations;
