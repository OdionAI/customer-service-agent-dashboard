"use client";

import React, { useEffect, useState } from "react";
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
  Badge,
  Dialog,
  VStack,
  Spinner,
  Portal,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { MdDeleteOutline } from "react-icons/md";
// import { useColorModeValue } from "@/components/ui/color-mode";
import { useParams } from "next/navigation";
import {
  useFetchAgent,
  useUpdateAgent,
  useUploadFile,
} from "@/hooks/useAgentMutations";
import { toaster } from "@/components/ui/toaster";
import { useUserContext } from "@/context/UserContext";
import { AxiosError } from "axios";

// Define the KnowledgeItem interface.
export interface KnowledgeItem {
  type: "file" | "url" | "text";
  content: string;
  fileName?: string;
  fileSize?: number;
}

interface AgentKnowledgeUpdate {
  knowledge_base: KnowledgeItem[];
}

// Utility function to shorten a URL or text string.
const truncateLink = (link: string, maxLength: number = 12): string => {
  return link.length <= maxLength ? link : link.slice(0, maxLength) + "...";
};

function Agent() {
  // const bg = useColorModeValue("#FFFFFF", "#333333");
  // const textColor = useColorModeValue("#333333", "#FFFFFF");
  const { user } = useUserContext();
  const params = useParams();
  const agentId = params.agentId as string;
  const companyId = user?.company?.id as string;

  // State for local file selections.
  const [files, setFiles] = useState<File[]>([]);
  // Controlled input states for URL and Text.
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  // State for knowledge base items (existing + new).
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  // File upload loading state.
  const [isFileUploading, setIsFileUploading] = useState(false);

  // Hooks for API actions.
  const { mutateAsync: uploadFile } = useUploadFile();
  const updateAgentMutation = useUpdateAgent();
  const { data: agent, isPending: agentLoading } = useFetchAgent(
    companyId,
    agentId
  );

  // Setup deletion confirmation dialog.
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // When agent data loads, initialize the knowledgeItems state.
  useEffect(() => {
    if (agent && agent.knowledge_base) {
      setKnowledgeItems(agent.knowledge_base as KnowledgeItem[]);
    }
  }, [agent]);

  // Handlers for file selection / drag-drop.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prev) => [
        ...prev,
        ...Array.from(event.target.files as FileList),
      ]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(event.dataTransfer.files)]);
      event.dataTransfer.clearData();
    }
  };

  // Handlers for URL/Text input.
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  // Handler to remove a file from selected files.
  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((f) => f !== fileToRemove));
  };

  // Handler to remove an existing knowledge base item.
  // const handleDeleteKnowledgeItem = (index: number) => {
  //   setDeleteIndex(index);
  // };

  const handleDeleteKnowledgeItem = (deleteIndex: number) => {
    if (deleteIndex !== null) {
      const newItems = knowledgeItems.filter((_, i) => i !== deleteIndex);
      // Immediately update the agent's knowledge base.
      updateAgentMutation.mutateAsync({
        company_id: companyId,
        agent_id: agentId,
        data: { knowledge_base: newItems } as AgentKnowledgeUpdate,
      });
      setKnowledgeItems(newItems);
      toaster.create({
        title: "Success",
        description: "Knowledge base item removed.",
        duration: 5000,
      });
    }
  };

  // const cancelDelete = () => {
  //   setDeleteIndex(null);
  //   // onClose();
  // };

  // Handler for adding files.
  const handleAddFiles = async () => {
    if (files.length === 0) {
      toaster.create({
        title: "No Files",
        description: "Please select files to upload first.",
        duration: 5000,
      });
      return;
    }
    try {
      setIsFileUploading(true);
      const uploadedResults = await Promise.all(
        files.map(async (file) => {
          const fileUrl = await uploadFile(file);
          return { file, fileUrl };
        })
      );
      const newFileItems = uploadedResults.map(({ file, fileUrl }) => ({
        type: "file" as const,
        content: fileUrl,
        fileName: file.name,
        fileSize: file.size,
      }));
      // Update knowledge base immediately via the update mutation.
      const updatedItems = [...knowledgeItems, ...newFileItems];
      await updateAgentMutation.mutateAsync({
        company_id: companyId,
        agent_id: agentId,
        data: { knowledge_base: updatedItems } as AgentKnowledgeUpdate,
      });
      setKnowledgeItems(updatedItems);
      setFiles([]); // Clear selected files.
      toaster.create({
        title: "Success",
        description: "Files uploaded and added to the knowledge base.",
        duration: 5000,
      });
      setIsFileUploading(false);
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "One or more files failed to upload.",
        duration: 5000,
      });
      setIsFileUploading(false);
    }
  };

  // Handler for adding a URL.
  const handleAddUrl = async () => {
    if (urlValue.trim() === "") return;
    const newItem: KnowledgeItem = {
      type: "url",
      content: urlValue.trim(),
    };
    const updatedItems = [...knowledgeItems, newItem];
    try {
      await updateAgentMutation.mutateAsync({
        company_id: companyId,
        agent_id: agentId,
        data: { knowledge_base: updatedItems } as AgentKnowledgeUpdate,
      });
      setKnowledgeItems(updatedItems);
      setUrlValue("");
      toaster.create({
        title: "Success",
        description: "URL added to knowledge base.",
        duration: 5000,
      });
    } catch (error: unknown) {
      let description = "Failed to add URL to knowledge base.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        title: "Error",
        description,
        duration: 5000,
      });
    }
  };

  // Handler for adding text.
  const handleAddText = async () => {
    if (textValue.trim() === "") return;
    const newItem: KnowledgeItem = {
      type: "text",
      content: textValue.trim(),
    };
    const updatedItems = [...knowledgeItems, newItem];
    try {
      await updateAgentMutation.mutateAsync({
        company_id: companyId,
        agent_id: agentId,
        data: { knowledge_base: updatedItems } as AgentKnowledgeUpdate,
      });
      setKnowledgeItems(updatedItems);
      setTextValue("");
      toaster.create({
        title: "Success",
        description: "Text added to knowledge base.",
        duration: 5000,
      });
    } catch (error: unknown) {
      let description = "Failed to add text to knowledge base.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        title: "Error",
        description,
        duration: 5000,
      });
    }
  };

  if (updateAgentMutation.isPending || agentLoading) {
    return (
      <Container ml="30px" mt="100px">
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  const makeAbsoluteUrl = (url: string): string => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <Container ml="30px" mt="100px">
      {/* Preview Section for Knowledge Base */}

      <HStack mb={"20px"}>
        <Image alt="file icon" mr="5px" asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/file_icon.svg"
            alt="file icon"
          />
        </Image>
        <Text color="#000000" mr="40px" fontSize="32px">
          Create knowledge base document
        </Text>
      </HStack>

      <Tabs.Root defaultValue="file" variant="subtle" w="full">
        <Tabs.List>
          <Tabs.Trigger
            w="150px"
            border="1px solid #cccccc"
            px="20px"
            value="file"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            File
          </Tabs.Trigger>
          <Tabs.Trigger
            mx="12px"
            border="1px solid #cccccc"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="150px"
            px="20px"
            value="url"
          >
            URL
          </Tabs.Trigger>
          <Tabs.Trigger
            border="1px solid #cccccc"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="150px"
            px="20px"
            value="text"
          >
            Text
          </Tabs.Trigger>
        </Tabs.List>

        {/* FILE TAB CONTENT */}
        <Tabs.Content value="file">
          <HStack mt="5px">
            <Text w="500px" mb="20px" color="#808080" fontSize="14px">
              Upload files that would aid the agent in answering customer
              queries.
            </Text>
          </HStack>
          <Flex
            position="relative"
            border="1px solid #c4c4c4"
            py="20px"
            px="25px"
            bg="#f5f5f5"
            alignItems="center"
            gap="10px"
            borderRadius="8px"
            w="500px"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            pointerEvents={updateAgentMutation.isPending ? "none" : "auto"}
          >
            <Image alt="file icon" width="80px" height="80px" asChild>
              <NextImage
                width={50}
                height={50}
                src="/icons/upload_icon.svg"
                alt="file icon"
              />
            </Image>
            <Box>
              <Text fontSize="16px" color="#000000" mb="5px">
                Click or drag files to upload
              </Text>
              <Text fontSize="14px" color="#808080">
                Maximum size: 21 MB
              </Text>
              <Text fontSize="14px" color="#808080" mb="5px">
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
              disabled={updateAgentMutation.isPending}
            />
          </Flex>
          <VStack alignItems={"flex-start"} gap="10px" mt="10px">
            {files.length > 0 ? (
              files.map((file, index) => (
                <Badge key={index} colorScheme="blue" px="10px" py="5px">
                  {file.name}
                  <Box
                    cursor={"pointer"}
                    onClick={() => handleRemoveFile(file)}
                  >
                    <MdDeleteOutline size={15} />
                  </Box>
                </Badge>
              ))
            ) : (
              <Text color="#808080" fontSize="14px">
                No files selected.
              </Text>
            )}
          </VStack>
          <Button
            size="sm"
            onClick={handleAddFiles}
            loading={isFileUploading}
            disabled={files.length === 0 || updateAgentMutation.isPending}
          >
            Add Files
          </Button>
        </Tabs.Content>

        {/* URL TAB CONTENT */}
        <Tabs.Content value="url">
          <Flex mt="5px" flexDir="column">
            <Text w="500px" mb="20px" color="#808080" fontSize="14px">
              Add a URL that the agent can use to answer questions.
            </Text>
            <Input
              p="10px"
              w="500px"
              color="black"
              placeholder="www.wikipedia.com/customer-service"
              value={urlValue}
              onChange={handleUrlChange}
              disabled={updateAgentMutation.isPending}
            />
            <Button
              size="sm"
              mt="10px"
              w="500px"
              onClick={handleAddUrl}
              disabled={!urlValue.trim() || updateAgentMutation.isPending}
            >
              Add URL
            </Button>
          </Flex>
        </Tabs.Content>

        {/* TEXT TAB CONTENT */}
        <Tabs.Content value="text">
          <Flex mt="5px" flexDir="column">
            <Text w="500px" mb="20px" color="#808080" fontSize="14px">
              Add text that will help the agent answer customer queries.
            </Text>
            <Textarea
              p="10px"
              w="500px"
              color="black"
              placeholder="Enter text here..."
              value={textValue}
              onChange={handleTextChange}
              disabled={updateAgentMutation.isPending}
            />
            <Button
              size="sm"
              mt="10px"
              w="500px"
              onClick={handleAddText}
              disabled={!textValue.trim() || updateAgentMutation.isPending}
            >
              Add Text
            </Button>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>

      <Box mt="50px">
        <Text fontWeight="bold" mb="10px">
          Current Knowledge Base Items:
        </Text>
        {knowledgeItems.length > 0 ? (
          knowledgeItems.map((item, index) => {
            if (item.type == "text") {
              return (
                <HStack key={index} gap="10px" mb="5px">
                  <Box fontSize="14px">
                    [{item.type.toUpperCase()}]{" "}
                    <Dialog.Root size={"cover"} placement={"center"}>
                      <Dialog.Trigger asChild>
                        {/* <Text color={"#007AFF"}>
                          {truncateLink(item.content, 20)}
                        </Text>{" "} */}
                        <Button color={"#007AFF"} background={"none"}>
                          {truncateLink(item.content, 20)}
                        </Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header></Dialog.Header>
                            <Dialog.Body>
                              <p>{item.content}</p>
                            </Dialog.Body>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                  </Box>

                  <Dialog.Root size={"sm"} placement={"center"}>
                    <Dialog.Trigger asChild>
                      <MdDeleteOutline />
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>
                              Are you sure you want to delete
                            </Dialog.Title>
                          </Dialog.Header>
                          {/* <Dialog.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </Dialog.Body> */}
                          <Dialog.Footer margin={"0 auto"}>
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                              onClick={() => handleDeleteKnowledgeItem(index)}
                            >
                              Delete
                            </Button>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </HStack>
              );
            } else {
              return (
                <HStack key={index} gap="10px" mb="5px">
                  <Text fontSize="14px">
                    [{item.type.toUpperCase()}]{" "}
                    <a
                      href={makeAbsoluteUrl(item.content)}
                      target="_blank"
                      // rel="noopener noreferrer"
                      style={{ textDecoration: "underline", color: "#007AFF" }}
                    >
                      {item.type === "file"
                        ? truncateLink(item.content, 20)
                        : truncateLink(item.content, 20)}
                    </a>
                  </Text>

                  <Dialog.Root size={"sm"} placement={"center"}>
                    <Dialog.Trigger asChild>
                      <MdDeleteOutline />
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>
                              Are you sure you want to delete
                            </Dialog.Title>
                          </Dialog.Header>
                          {/* <Dialog.Body>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </Dialog.Body> */}
                          <Dialog.Footer margin={"0 auto"}>
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                              onClick={() => handleDeleteKnowledgeItem(index)}
                            >
                              Delete
                            </Button>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </HStack>
              );
            }
          })
        ) : (
          <Text color="#808080" fontSize="14px">
            No knowledge base items added.
          </Text>
        )}
      </Box>
    </Container>
  );
}

export default Agent;
