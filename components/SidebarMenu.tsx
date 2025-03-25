"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { useColorModeValue } from "@/components/ui/color-mode";
import { usePathname, useRouter } from "next/navigation";

interface SidebarMenuProps {
  title: string;
  icon: string;
  link: string;
  isCollapsed: boolean;
}

function SidebarMenu({ title, link, icon, isCollapsed }: SidebarMenuProps) {
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box cursor="pointer" onClick={() => router.push(link)} w="100%">
      <Flex
        p="10px"
        w="100%"
        minW="170px"
        bg={pathname === link ? "#F5F5F5" : ""}
        _hover={{ bg: "#F5F5F5" }}
        gap="15px"
        alignItems="center"
        borderRadius="20px"
        transition="all 0.3s ease"
      >
        <Box flexShrink="0" bg="#EBEBEB" borderRadius="12px" padding="10px">
          <Image asChild>
            <NextImage
              width={20}
              height={20}
              src={icon}
              alt={`${title} icon`}
            />
          </Image>
        </Box>
        {/* Render the title only when not collapsed */}
        {!isCollapsed && (
          <Text fontSize="13px" md={{ fontSize: "16px" }} color={textColor}>
            {title}
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default SidebarMenu;
