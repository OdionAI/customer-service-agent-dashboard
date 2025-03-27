"use client";

import DashboardMenu from "@/components/DashboardMenu";
import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  VStack,
  Dialog,
  Button,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import supportIcon from "@/public/icons/support_icon.svg";
import { BiPlus } from "react-icons/bi";
import { CardSelect, Option } from "@/components/CardSelect";

function Home() {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const [selectedAgent, setSelectedAgent] = useState("");

  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    console.log(selectedAgent);
  }, [selectedAgent]);

  const options: Option[] = [
    { label: "Support Agent", value: "option1", icon: supportIcon },
    { label: "Sales Agent", value: "option2", icon: supportIcon },
    { label: "Research Agent", value: "option3", icon: supportIcon },
    // { label: "Option Three", value: "option3" },
  ];

  const dashboardMenu = [
    // {
    //   text: "Support Agent",
    //   icon: supportIcon,
    //   link: "/agents/supportagent",
    // },
    // {
    //   text: "Sales Agent",
    //   icon: supportIcon,
    //   link: "/agents/supportagent",
    // },
    {
      text: "Search Agent",
      icon: supportIcon,
      link: "/agents/supportagent",
    },
    // {
    //   text: "Research Agent",
    //   icon: supportIcon,
    //   link: "/agents/supportagent",
    // },
  ];
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
          >
            <Dialog.Trigger asChild>
              <Flex
                cursor={"pointer"}
                color={"#007AFF"}
                alignItems={"center"}
                mt={"80px"}
                mb={"20px"}
              >
                <BiPlus /> <Text>Create agent</Text>
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
                    {/* <Grid templateColumns="repeat(2, 1fr)" gap="6"> */}
                    <CardSelect
                      setSelectedAgent={setSelectedAgent}
                      value={selectedAgent}
                      options={options}
                    />
                    {/* </Grid> */}
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button>Create</Button>
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

          <Grid
            gap={"10px"}
            templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }}
          >
            {dashboardMenu.map((item) => (
              <DashboardMenu
                key={item.text}
                text={item.text}
                icon={item.icon}
                link={item.link}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
