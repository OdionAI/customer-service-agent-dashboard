"use client";

import {
  Box,
  Button,
  Flex,
  Portal,
  Text,
  CloseButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ColorModeButton } from "./ui/color-mode";
import { Image } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "@chakra-ui/react";

import NextImage from "next/image";
import { Message } from "@/app/c/page";
function Navbar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Here we would normally send the message via WebSocket
    // For now, let's simulate an AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "This is a simulated AI response.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

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
            cursor={"pointer"}
            onClick={() => router.push("/")}
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
                    <Drawer.Body>
                      <Flex direction="column" h="90vh" bg={"white"}>
                        <VStack flex={1} p={4} gap={4} overflowY="auto">
                          {messages.map((message) => (
                            <Box
                              key={message.id}
                              alignSelf={
                                message.isUser ? "flex-end" : "flex-start"
                              }
                              bg={message.isUser ? "blue.500" : "gray.100"}
                              color={message.isUser ? "white" : "black"}
                              p={3}
                              borderRadius="lg"
                              maxW="70%"
                            >
                              <Text>{message.text}</Text>
                              {/* <Text fontSize="xs" opacity={0.8} mt={1}>
                                {message.timestamp.toLocaleTimeString()}
                              </Text> */}
                            </Box>
                          ))}
                          <div ref={messagesEndRef} />
                        </VStack>

                        <Flex p={4} borderTop="1px" borderColor={"gray"}>
                          <Input
                            flex={1}
                            mr={2}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                            }
                            placeholder="Type your message..."
                          />
                          <Button
                            colorScheme="blue"
                            onClick={handleSendMessage}
                          >
                            Send
                          </Button>
                        </Flex>
                      </Flex>
                    </Drawer.Body>

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
