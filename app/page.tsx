"use client";

import { useLayoutEffect } from "react";
import { Box, Container, VStack, Text, Grid, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import DashboardMenu from "@/components/DashboardMenu";
import ChatInput from "@/components/ChatInput";
import agentIcon from "@/public/icons/agent_icon.svg";
// import billingIcon from "@/public/icons/billing_icon.svg";
// import billingWhiteIcon from "@/public/icons/billing_white_icon.svg";
// import ticketIcon from "@/public/icons/ticket_icon.svg";
// import ticketWhiteIcon from "@/public/icons/ticket_white_icon.svg";
import usersIcon from "@/public/icons/users_icon.svg";
import usersWhiteIcon from "@/public/icons/users_white_icon.svg";
import { useUserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";

export default function Home() {
  const bg = useColorModeValue("#F9F9FA", "#333333");
  const cardBg = useColorModeValue("#FFFFFF", "#2A2A2A");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  // const ticket_Icon = useColorModeValue(ticketIcon, ticketWhiteIcon);
  // const billing_Icon = useColorModeValue(billingIcon, billingWhiteIcon);
  const users_Icon = useColorModeValue(usersIcon, usersWhiteIcon);
  const { user } = useUserContext();
  const dashboardMenu = [
    {
      text: "AI Agents",
      icon: agentIcon,
      link: "/agents",
    },
    // {
    //   text: "Ticket Copilot",
    //   icon: ticket_Icon,
    //   link: "/agents",
    // },
    // {
    //   text: "Billing",
    //   icon: billing_Icon,
    //   link: "/agents",
    // },
    {
      text: "User & Access",
      icon: users_Icon,
      link: "/useraccess",
    },
  ];

  useLayoutEffect(() => {
    console.log(user, "this is user");
    if (!user) {
      redirect("/signup");
    }
  }, [user]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
      padding={"20px"}
      bg={bg}
    >
      <Container
        margin={"0 auto"}
        // marginTop={"60px"}
        maxW={"3xl"}
        bg={cardBg}
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
            <Text mb={"20px"} fontWeight={"bold"} color={textColor}>
              Your Copilot for work
            </Text>
          </VStack>
          <Text
            textAlign={"left"}
            fontWeight={"semibold"}
            textStyle="xs"
            color={textColor}
            mt={"60px"}
          >
            Jumpstart collaboration with a spark of Al
          </Text>
          <Text mb={"50px"} textAlign={"left"} textStyle="xs" color={textColor}>
            Cycle through examples with the buttons below, or start writing if
            you have something in mind.
          </Text>

          <Grid
            gap={"10px"}
            mb={"50px"}
            templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }}
          >
            {dashboardMenu.map((menuItem) => (
              <DashboardMenu
                key={menuItem.text}
                text={menuItem.text}
                icon={menuItem.icon}
                link={menuItem.link}
              />
            ))}
          </Grid>

          <Text
            textAlign={"center"}
            fontWeight={"semibold"}
            color={textColor}
            paddingBottom={"50px"}
            fontSize={"14px"}
          >
            Talk to your data
          </Text>
          <ChatInput />
        </Box>
      </Container>
    </Flex>
  );
}
