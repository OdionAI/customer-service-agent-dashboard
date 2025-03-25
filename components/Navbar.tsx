"use client";

import { Box, Button, Flex, Portal, Text, CloseButton } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import { Image } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Drawer } from "@chakra-ui/react";

import NextImage from "next/image";
function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <Box zIndex={100} pos={"fixed"} h={"60px"} bg={"transparent"} w={"100%"}>
        <Flex
          padding={"5px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Image
            visibility={
              !pathname.startsWith("/agents/supportagent")
                ? "visible"
                : "hidden"
            }
            alt="odion logo"
            asChild
          >
            <NextImage
              width={30}
              height={30}
              src="/icons/odion_logo.svg"
              alt="odion logo"
            />
          </Image>

          {!pathname.startsWith("/agents/supportagent") ? (
            <Box>
              <ColorModeButton />
            </Box>
          ) : (
            <Drawer.Root size={"md"}>
              <Drawer.Trigger asChild>
                <Button
                  color={"white"}
                  bg={"#000000"}
                  borderRadius={"100px"}
                  paddingX={"15px"}
                  w={"110px"}
                  fontSize={"13px"}
                  h={"35px"}
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
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Chat</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body></Drawer.Body>
                    {/* <Drawer.Footer>
                      <Drawer.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Drawer.ActionTrigger>
                      <Button>Save</Button>
                    </Drawer.Footer> */}
                    <Drawer.CloseTrigger
                      pos={"absolute"}
                      top={"10px"}
                      right={"10px"}
                      asChild
                    >
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
