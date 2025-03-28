"use client";

import {
  Container,
  HStack,
  Text,
  Button,
  Image,
  Box,
  Table,
  Drawer,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextImage from "next/image";
import { BiMessageAdd } from "react-icons/bi";

function Conversations() {
  const items = [
    {
      id: 1,
      name: "Laptop",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 2,
      name: "Coffee Maker",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 3,
      name: "Desk Chair",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 4,
      name: "Smartphone",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 5,
      name: "Headphones",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 6,
      name: "Desk Chair",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 7,
      name: "Smartphone",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 8,
      name: "Headphones",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 9,
      name: "Desk Chair",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 10,
      name: "Smartphone",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 11,
      name: "Headphones",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 12,
      name: "Desk Chair",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 13,
      name: "Smartphone",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 14,
      name: "Headphones",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 15,
      name: "Smartphone",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
    {
      id: 16,
      name: "Headphones",
      date: "12-03-25",
      user: "meneworon4@gmail.com",
      rating: "5 stars",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Container ml={"30px"} mt={"100px"}>
      <HStack alignItems={"center"}>
        <Box mr={"5px"}>
          <BiMessageAdd size={30} />
        </Box>

        {/* <Image alt="settings icon" mr={"5px"} asChild>
          <NextImage
            width={25}
            height={25}
            src="/icons/settings_icon.svg"
            alt={`settings icon`}
          />
        </Image> */}
        <Text color={"#000000"} mr={"40px"} fontSize={"32px"}>
          Conversations
        </Text>
      </HStack>
      <Box mx={"20px"} mt={"25px"}>
        <Table.ScrollArea borderWidth="1px" rounded="md" height="600px">
          <Table.Root size="sm" interactive stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Conversation ID</Table.ColumnHeader>
                <Table.ColumnHeader>User</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>

                <Table.ColumnHeader textAlign="end">Rating</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item) => (
                <Table.Row
                  onClick={() => setOpen(true)}
                  cursor={"pointer"}
                  key={item.id}
                >
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.user}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>

                  <Table.Cell textAlign="end">{item.rating}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        {/* Drawer */}
        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          size={"md"}
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Chat</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body></Drawer.Body>
                {/* <Drawer.Footer>
                      <Drawer.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Drawer.ActionTrigger>
                      <Button>Save</Button>
                    </Drawer.Footer> */}
                <Drawer.CloseTrigger
                  pos={"absolute"}
                  top={"10px"}
                  right={"10px"}
                  asChild
                >
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>
    </Container>
  );
}

export default Conversations;
