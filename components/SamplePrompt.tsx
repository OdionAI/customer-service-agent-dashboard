import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface SamplePromptProps {
  prompt: string;
}

function SamplePrompt({ prompt }: SamplePromptProps) {
  const textColor = useColorModeValue("#000000", "#FFFFFF");
  const bgColor = useColorModeValue("#F9F9FA", "#333333");
  return (
    <Flex
      paddingY={"5px"}
      paddingX={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      aspectRatio={"180/30"}
      shrink={"0"}
      bg={bgColor}
      color={textColor}
      borderRadius={"10px"}
    >
      <Text fontSize={"14px"}>{prompt}</Text>
    </Flex>
  );
}

export default SamplePrompt;
