"use client";

import SidebarMenu from "@/components/SidebarMenu";
import { useColorModeValue } from "@/components/ui/color-mode";
import { supportNavigationItems } from "@/utils/constants";
import { Box, Flex, VStack, Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { useParams } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const params = useParams();
  const agentId = params.agentId as string;

  return (
    <Flex bg={bg}>
      <Box
        minH="100vh"
        transition="width 0.3s ease"
        // Adjust width based on collapse state (e.g. 60px when collapsed, 250px when expanded)
        w={"250px"}
      >
        <VStack p="10px" alignItems="start" gap="10px">
          {/* Toggle button for sidebar */}
          {/* <IconButton
            aria-label="Toggle sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="sm"
            variant="ghost"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </IconButton> */}
          {/* Optionally show logo only when expanded */}

          <Image alt="odion logo" mb="20px" asChild>
            <NextImage
              width={150}
              height={30}
              src="/icons/dash_logo.svg"
              alt="odion logo"
            />
          </Image>

          {/* Pass the collapsed state down to each menu item */}
          {supportNavigationItems.map((item) => (
            <SidebarMenu
              key={item.title}
              title={item.title}
              link={`/agents/${agentId}/${item.link}`}
              icon={item.icon}
              // isCollapsed={isCollapsed}
            />
          ))}
        </VStack>
      </Box>
      {/* Let the content area fill the remaining space */}
      <Box flex="1" paddingBottom="100px" overflow="auto" h="100vh">
        {children}
      </Box>
    </Flex>
  );
}
