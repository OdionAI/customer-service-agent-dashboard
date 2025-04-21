import { GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useRouter } from "next/navigation";
import { useAgentContext } from "@/context/AgentContext";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { StaticImageData } from "next/image";

interface DashboardMenuProps {
  text: string;
  icon: StaticImageData;
  link: string;
  agentId?: string;
}

function DashboardMenu({ text, icon, link, agentId }: DashboardMenuProps) {
  const textColor = useColorModeValue("#000000", "#FFFFFF");
  const bgColor = useColorModeValue("#F9F9FA", "#333333");
  const router = useRouter();
  const { setSelectedAgent, agents } = useAgentContext();

  const handleClick = () => {
    const matchingAgent = agents.find((agent) => agent.id === agentId);
    if (matchingAgent) {
      setSelectedAgent(matchingAgent);
    }
    router.push(link);
  };

  return (
    <GridItem onClick={handleClick}>
      <VStack
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"16px"}
        cursor={"pointer"}
        _hover={{ bg: "gray.200" }}
        w={"100%"}
        minW={"100px"}
        h={"100%"}
        bg={bgColor}
        aspectRatio={"191/156"}
      >
        <Image alt="agent icon" asChild>
          <NextImage width={30} height={30} src={icon} alt="agent icon" />
        </Image>
        <Text color={textColor}>{text}</Text>
      </VStack>
    </GridItem>
  );
}

export default DashboardMenu;
