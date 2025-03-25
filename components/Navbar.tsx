"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { Image } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import NextImage from "next/image";
function Navbar() {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const pathname = usePathname();

  return (
    <>
      {!pathname.startsWith("/agents/supportagent") && (
        <Box
          zIndex={100}
          pos={"fixed"}
          h={"60px"}
          bg={"transparent"}
          w={"100%"}
        >
          <Flex
            padding={"5px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image asChild>
              <NextImage
                width={30}
                height={30}
                src="/icons/odion_logo.svg"
                alt="odion logo"
              />
            </Image>

            <Box>
              <ColorModeButton />
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default Navbar;
