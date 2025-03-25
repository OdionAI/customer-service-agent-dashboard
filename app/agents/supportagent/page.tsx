"use client";

import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

function Dashboard() {
  return (
    <Container ml={"30px"} mt={"100px"}>
      <HStack>
        <Image alt={`settings icon`} mr={"5px"} asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/settings_icon.svg"
            alt={`settings icon`}
          />
        </Image>
        <Text color={"#000000"} mr={"40px"} fontSize={"32px"}>
          Customize your AI Agent
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
      <Box mt={"30px"}>
        <Text mb={"10px"}>Name</Text>
        <Text mb={"20px"} color={"#808080"} fontSize={"14px"}>
          Your AI Agent&apos;s Name
        </Text>
        <Input
          border={"1px solid #D9D9D9"}
          p={"10px"}
          h={"60px"}
          w={"400px"}
          placeholder=""
        />
      </Box>
      <Box mt={"30px"}>
        <Text mb={"10px"}>First Message</Text>
        <Text w={"500px"} mb={"20px"} color={"#808080"} fontSize={"14px"}>
          The first message the agent will say. If empty, the agent will wait
          for the user to start the conversation.
        </Text>
        <Input
          p={"10px"}
          h={"100px"}
          w={"500px"}
          color={"black"}
          border={"1px solid #D9D9D9"}
          placeholder="Hi, my name is Eric. How can I help you today?"
        />
      </Box>
      <Box mt={"30px"}>
        <Text mb={"10px"}>Language</Text>
        <Text w={"500px"} mb={"20px"} color={"#808080"} fontSize={"14px"}>
          Specify additional languages that the caller will be able to choose
          from. If language detection system tool is enabled, agent will
          automatically detect the language and switch to it, otherwise the
          language must be specified upfront.
        </Text>
        <NativeSelect.Root w={"500px"}>
          <NativeSelect.Field border={"1px solid #D9D9D9"} px={"10px"}>
            <option value="1">English</option>
            <option value="2">Pidgin</option>
            <option value="2">Yoruba</option>
            <option value="2">Igbo</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator mr={"10px"} />
        </NativeSelect.Root>
        <Input
          p={"10px"}
          h={"100px"}
          w={"500px"}
          my={"10px"}
          color={"black"}
          border={"1px solid #D9D9D9"}
          placeholder=""
        />
      </Box>
      <Box mt={"30px"}>
        <Text mb={"10px"}>Tone</Text>
        <Text w={"500px"} mb={"20px"} color={"#808080"} fontSize={"14px"}>
          Used to determine the persona of the agent while engaging in a
          conversation.
        </Text>
        <NativeSelect.Root w={"500px"}>
          <NativeSelect.Field border={"1px solid #D9D9D9"} px={"10px"}>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator mr={"10px"} />
        </NativeSelect.Root>
      </Box>
    </Container>
  );
}

export default Dashboard;
