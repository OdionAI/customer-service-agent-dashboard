"use client";

import DashboardMenu from "@/components/DashboardMenu";
import { Box, Container, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import supportIcon from "@/public/icons/support_icon.svg";

function page() {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");

  const dashboardMenu = [
    {
      text: "Support Agent",
      icon: supportIcon,
      link: "/agents/supportagent",
    },
    {
      text: "Sales Agent",
      icon: supportIcon,
      link: "/agents/supportagent",
    },
    {
      text: "Search Agent",
      icon: supportIcon,
      link: "/agents/supportagent",
    },
    {
      text: "Research Agent",
      icon: supportIcon,
      link: "/agents/supportagent",
    },
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

          <Grid
            gap={"10px"}
            mt={"80px"}
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

export default page;
