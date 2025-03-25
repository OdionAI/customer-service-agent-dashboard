import { GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useRouter } from "next/navigation";

import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { StaticImageData } from "next/image";

interface DashboardMenuProps {
  text: string;
  icon: StaticImageData;
  link: string;
}

function DashboardMenu({ text, icon, link }: DashboardMenuProps) {
  const textColor = useColorModeValue("#000000", "#FFFFFF");
  const bgColor = useColorModeValue("#F9F9FA", "#333333");
  const router = useRouter();
  console.log(link, "link");
  return (
    <GridItem onClick={() => router.push(link)}>
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
        <Image asChild>
          <NextImage width={30} height={30} src={icon} alt="agent icon" />
        </Image>
        <Text color={textColor}>{text}</Text>
      </VStack>
    </GridItem>
  );
}

export default DashboardMenu;
