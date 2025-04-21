"use client";

import DashboardMenu from "@/components/DashboardMenu";
import {
  Box,
  Button,
  CloseButton,
  Container,
  Dialog,
  Flex,
  Grid,
  Text,
  VStack,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import supportIcon from "@/public/icons/support_icon.svg";
import { BiPlus } from "react-icons/bi";
import { CardSelect, Option } from "@/components/CardSelect";
import { useUserContext } from "@/context/UserContext";

// Import the agent hooks.
import { useCreateAgent, useFetchAgents } from "@/hooks/useAgentMutations";
import { toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";

function Home() {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const [selectedAgent, setSelectedAgent] = useState("");
  const { user } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);

  // For demonstration, assume a companyId is available from user context.
  const companyId = user?.company?.id as string;

  // Instantiate the create agent hook.
  const createAgentMutation = useCreateAgent();

  // Fetch the agents for the current company.
  const {
    data: agents,
    isLoading: agentsLoading,
    error: agentsError,
  } = useFetchAgents(companyId);

  const options: Option[] = [
    { label: "Support Agent", value: "support", icon: supportIcon },
    { label: "Sales Agent", value: "sales", icon: supportIcon },
    { label: "Research Agent", value: "research", icon: supportIcon },
  ];

  // Handler to create a new agent.
  const handleCreateAgent = () => {
    if (!selectedAgent) {
      toaster.create({
        title: "Error",
        description: "Please select an agent type.",
        duration: 5000,
      });
      return;
    }
    createAgentMutation.mutate(
      { company_id: companyId, data: { type: selectedAgent } },
      {
        onSuccess: () => {
          toaster.create({
            title: "Agent Created",
            description: "The new agent has been successfully created.",
            duration: 5000,
          });

          setOpenDialog(false);
        },
        onError: (error: unknown) => {
          let description = "Failed to create agent..";

          if (error instanceof AxiosError && error.response?.data?.detail) {
            description = String(error.response.data.detail);
          }
          toaster.create({
            title: "Error",
            description,
            duration: 5000,
          });
        },
      }
    );
  };

  return (
    <Box minH={"100vh"} padding={"20px"} bg={bg}>
      <Container
        margin={"0 auto"}
        marginTop={"60px"}
        maxW={"3xl"}
        borderRadius={"16px"}
      >
        <Box padding={"20px"}>
          <VStack w={"auto"} margin={"0 auto"}>
            <Box
              borderRadius={"20px"}
              mb={"15px"}
              bg="#5C2684"
              w={"93px"}
              h={"93px"}
            ></Box>
            <Text fontWeight={"bold"} color={textColor}>
              Your AI Agents
            </Text>
          </VStack>

          <Dialog.Root
            size={"lg"}
            placement={"center"}
            motionPreset="slide-in-bottom"
            open={openDialog}
            onOpenChange={(e) => setOpenDialog(e.open)}
          >
            <Dialog.Trigger asChild>
              <Flex
                cursor={"pointer"}
                color={"#007AFF"}
                alignItems={"center"}
                mt={"80px"}
                mb={"20px"}
              >
                <BiPlus />
                <Text ml="2">Create agent</Text>
              </Flex>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Create an Agent</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <CardSelect
                      setSelectedAgent={setSelectedAgent}
                      value={selectedAgent}
                      options={options}
                    />
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      onClick={handleCreateAgent}
                      loading={createAgentMutation.isPending}
                    >
                      Create
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger
                    pos={"absolute"}
                    top={"10px"}
                    right={"10px"}
                    asChild
                  >
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          {/* Render agents fetched from the endpoint */}
          {agentsLoading ? (
            <Box textAlign="center" py="20px">
              <Spinner size="xl" />
            </Box>
          ) : agentsError ? (
            <Text color="red.500" textAlign="center">
              Failed to load agents.
            </Text>
          ) : agents && agents.length > 0 ? (
            <Grid
              gap={"10px"}
              templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }}
            >
              {agents.map((agent) => (
                <DashboardMenu
                  key={agent.id}
                  text={agent.type.toUpperCase()} // or use a specific field e.g., agent.name
                  agentId={agent.id}
                  icon={supportIcon} // Adjust as needed; you may want a different icon per agent type
                  link={`/agents/${agent.id}`}
                />
              ))}
            </Grid>
          ) : (
            <Text textAlign="center" py="20px">
              No agents found.
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
