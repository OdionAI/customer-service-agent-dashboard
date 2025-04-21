"use client";

import {
  Box,
  CloseButton,
  Container,
  Dialog,
  HStack,
  Portal,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import AddUserModal from "@/components/AddUserModal";
import { useFetchCompanyUsers, User } from "@/hooks/useCompanyUsers"; // Assumed hook for fetching users
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

// Depending on your Chakra setup, your table components might be named differently.
// The following assumes you're using a custom table component (e.g., Table.Root, etc.).
import { Table } from "@chakra-ui/react";

function UserAccess() {
  // Replace this with your actual company ID (from context or props)
  const router = useRouter();
  const { user } = useUserContext();
  const companyId = user?.company?.id as string;

  // Fetch users using a custom React Query hook.
  const { data: users, isLoading, error } = useFetchCompanyUsers(companyId);

  return (
    <Container pt="100px">
      <Box
        onClick={() => router.back()}
        padding={"10px"}
        cursor={"pointer"}
        mb={"30px"}
      >
        <FaArrowLeft size={30} />
      </Box>
      <HStack>
        <FiUsers size="30" />
        <Text color="#000000" mr="40px" fontSize="32px">
          Users
        </Text>
      </HStack>
      <Box>
        <Dialog.Root
          size="sm"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <Dialog.Trigger asChild>
            <Flex
              cursor="pointer"
              color="#007AFF"
              alignItems="center"
              mt="20px"
              mb="20px"
            >
              <BiPlus />
              <Text ml="2">Invite user</Text>
            </Flex>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Invite User</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body w="400px" mx="auto">
                  <AddUserModal />
                </Dialog.Body>
                <Dialog.CloseTrigger
                  pos="absolute"
                  top="10px"
                  right="10px"
                  asChild
                >
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        {/* Table of users */}
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  <Spinner size="sm" />
                </Table.Cell>
              </Table.Row>
            ) : error ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  Error loading users.
                </Table.Cell>
              </Table.Row>
            ) : users && users.length > 0 ? (
              users.map((user: User) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user?.first_name
                      ? `${user?.first_name} ${user?.last_name}`
                      : "Not signed in"}
                  </Table.Cell>
                  <Table.Cell>{user?.role}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  No users found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
}

export default UserAccess;
