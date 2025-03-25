import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Flex,
  Input,
  Field,
  NativeSelect,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

function Tools() {
  return (
    <Container ml={"30px"} mt={"100px"}>
      <HStack>
        <Image alt="file icon" mr={"15px"} asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/settings_icon.svg"
            alt="file icon"
          />
        </Image>
        <Text mr={"40px"} fontSize={"32px"}>
          Add tool
        </Text>
        <Button
          bg={"#007AFF"}
          borderRadius={"100px"}
          paddingX={"15px"}
          w={"110px"}
          fontSize={"13px"}
          h={"35px"}
          mr={"5px"}
        >
          Save Changes
        </Button>
        <Button
          w={"110px"}
          fontSize={"13px"}
          h={"35px"}
          borderRadius={"100px"}
          paddingX={"15px"}
        >
          <Image alt="Odion logo" asChild>
            <NextImage
              width={15}
              height={15}
              src="/icons/odion_white_logo.svg"
              alt="Odion logo"
            />
          </Image>
          <Text>Test Agent</Text>
        </Button>
      </HStack>

      <Box mt={"30px"}>
        <Text mb={"10px"}>Tool type</Text>
      </Box>

      <Flex
        position="relative"
        border={`1px solid #c4c4c4`}
        p={"30px"}
        bg={"#f5f5f5"}
        gap={"10px"}
        borderRadius={"8px"}
        // textAlign={"center"}
        w={"500px"}
        mt={"20px"}
        flexDir={"column"}
      >
        <Text
          // w={"500px"}

          mb={"10px"}
          color={"#000000"}
          fontSize={"24px"}
        >
          API Configuration
        </Text>
        <Flex gap={"10px"} w={"100%"} alignItems={"center"}>
          <Box flex={1}>
            <Text mb={"15px"}>Method</Text>
            <NativeSelect.Root bg={"white"}>
              <NativeSelect.Field px={"10px"}>
                <option value="1">POST</option>
                <option value="2">GET</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          <Field.Root flex={4}>
            <Field.Label mb={"10px"}>URL</Field.Label>
            <Input
              border={"1px solid #D9D9D9"}
              p={"5px"}
              bg={"white"}
              placeholder=""
            />
          </Field.Root>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Tools;
