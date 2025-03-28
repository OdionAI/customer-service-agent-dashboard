"use client";

// components/ChatInterface.tsx
import { Box, Flex, VStack, Input, Button, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useColorModeValue } from "../../components/ui/color-mode";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Auto-scroll to bottom when new messages arrive
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
    <Flex direction="column" h="100vh" bg={bg}>
      {/* <Flex
        p={4}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          AI Chat
        </Text>
        <ColorModeButton />
      </Flex> */}

      <VStack flex={1} p={4} gap={4} overflowY="auto">
        {messages.map((message) => (
          <Box
            key={message.id}
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
            bg={message.isUser ? "blue.500" : "gray.100"}
            color={message.isUser ? "white" : "black"}
            p={3}
            borderRadius="lg"
            maxW="70%"
          >
            <Text>{message.text}</Text>
            <Text fontSize="xs" opacity={0.8} mt={1}>
              {message.timestamp.toLocaleTimeString()}
            </Text>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      <Flex p={4} borderTop="1px" borderColor={borderColor}>
        <Input
          flex={1}
          mr={2}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
        />
        <Button colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
}
