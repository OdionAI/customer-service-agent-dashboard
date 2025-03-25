import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Image } from "@chakra-ui/react";

import NextImage from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const bgColor = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#000000", "#FFFFFF");

  return (
    <Flex
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      bg={bgColor}
      //   py={12}
      //   px={4}
    >
      <Container maxW="md">
        <VStack
          //   bg={cardBgColor}
          rounded="lg"
          shadow="base"
          p={8}
          //   borderWidth="1px"
          //   borderColor={borderColor}
        >
          <Image alt="odion logo" asChild>
            <NextImage
              width={30}
              height={30}
              src="/icons/odion_logo2.svg"
              alt="odion logo"
            />
          </Image>
          <Heading
            color={textColor}
            as="h1"
            fontSize={"18px"}
            textAlign="center"
            mb={2}
          >
            {title}
          </Heading>

          {children}
        </VStack>
      </Container>
    </Flex>
  );
}
