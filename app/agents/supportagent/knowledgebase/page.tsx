"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Tabs,
  Flex,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

function Agent() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Append selected files to the list
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(event.target.files as FileList),
      ]);
    }
  };

  // When files are dragged over the drop zone
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  // When the drag leaves the drop zone
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  // Append dropped files to the list
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(event.dataTransfer.files),
      ]);
      event.dataTransfer.clearData();
    }
  };

  // Change the dashed border color when dragging over
  const borderColor = isDragOver ? "#007AFF" : "#cccccc";

  return (
    <Container ml={"30px"} mt={"100px"}>
      <HStack>
        <Image mr={"5px"} asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/file_icon.svg"
            alt="file icon"
          />
        </Image>
        <Text color={"#000000"} mr={"40px"} fontSize={"32px"}>
          Create knowledge base document
        </Text>
        <Button
          bg={"#007AFF"}
          color={"white"}
          borderRadius={"100px"}
          paddingX={"10px"}
          w={"110px"}
          fontSize={"13px"}
          h={"35px"}
          mr={"5px"}
        >
          Save Changes
        </Button>
        <Button
          color={"white"}
          bg={"#000000"}
          borderRadius={"100px"}
          paddingX={"15px"}
          w={"110px"}
          fontSize={"13px"}
          h={"35px"}
        >
          <Image asChild>
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

      <Box mt={"20px"}>
        <Text mb={"10px"}>Item type</Text>
      </Box>

      <Tabs.Root defaultValue="file" variant={"subtle"} w="full">
        <Tabs.List>
          <Tabs.Trigger
            w={"150px"}
            border={"1px solid #cccccc"}
            px={"20px"}
            value="file"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            File
          </Tabs.Trigger>
          <Tabs.Trigger
            mx={"12px"}
            border={"1px solid #cccccc"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"150px"}
            px={"20px"}
            value="url"
          >
            URL
          </Tabs.Trigger>
          <Tabs.Trigger
            border={"1px solid #cccccc"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"150px"}
            px={"20px"}
            value="text"
          >
            Text
          </Tabs.Trigger>
        </Tabs.List>

        {/* FILE TAB CONTENT */}
        <Tabs.Content value="file">
          <HStack mt={"5px"}>
            <Text w={"500px"} mb={"20px"} color={"#808080"} fontSize={"14px"}>
              Upload files that would aid the agent answer customer queries
            </Text>
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
            // textAlign={"center"}
            w={"500px"}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Image width={"80px"} height={"80px"} asChild>
              <NextImage
                width={50}
                height={50}
                src="/icons/upload_icon.svg"
                alt="file icon"
              />
            </Image>
            <Box>
              <Text fontSize={"16px"} color={"#000000"} mb={"5px"}>
                Click or drag files to upload
              </Text>
              <Text fontSize={"14px"} color={"#808080"}>
                Maximum size: 21 MB
              </Text>
              <Text fontSize={"14px"} color={"#808080"} mb={"5px"}>
                Supported types: pdf, txt, docx, html, epub
              </Text>
            </Box>
            {/* Hidden file input */}
            <Input
              type="file"
              multiple
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              opacity="0"
              cursor="pointer"
              onChange={handleFileChange}
              border={"1px solid #D9D9D9"}
            />
          </Flex>

          {/* File Preview */}
          {files.length > 0 && (
            <Box
              mt={4}
              p={2}
              w="500px"
              border="1px solid #e2e2e2"
              borderRadius="8px"
            >
              <Text fontWeight="bold" mb={2}>
                Uploaded Files:
              </Text>
              {files.map((file, index) => (
                <Text key={index} fontSize="14px">
                  {file.name}
                </Text>
              ))}
            </Box>
          )}
        </Tabs.Content>

        {/* URL TAB CONTENT */}
        <Tabs.Content value="url">
          <Flex mt={"5px"} flexDir={"column"}>
            <Text
              alignItems={"start"}
              w={"500px"}
              mb={"20px"}
              color={"#808080"}
              fontSize={"14px"}
            >
              Add a URL that the agent can use to answer questions
            </Text>
            <Input
              p={"10px"}
              w={"500px"}
              color={"black"}
              placeholder="www.wikipedia.com/customer-service"
            />
          </Flex>
        </Tabs.Content>

        {/* TEXT TAB CONTENT */}
        <Tabs.Content value="text">
          <Flex mt={"5px"} flexDir={"column"}>
            <Text
              alignItems={"start"}
              w={"500px"}
              mb={"20px"}
              color={"#808080"}
              fontSize={"14px"}
            >
              Add text that will help the agent answer customer queries{" "}
            </Text>
            <Textarea p={"10px"} w={"500px"} color={"black"} placeholder="" />
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}

export default Agent;
