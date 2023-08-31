import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Avatar,
  Button,
  Spinner,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { auth } from "../firebaseConfig";
import { useSignOut } from "react-firebase-hooks/auth";

const Navbar = ({ user, userLoading, onOpen }) => {
  const [signOut] = useSignOut(auth);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Flex
      background="#D8D9DA"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={2}
    >
      <Text fontWeight="bold" fontSize="20px">
        linkbucket
      </Text>
      {userLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {user ? (
            <Menu>
              <MenuButton
                padding="4px"
                borderRadius="4px"
                fontWeight="semibold"
                _hover={{ background: "#1A202C", color: "white" }}
              >
                <Flex alignItems="center" gap={2}>
                  <Avatar name={user.email} size="sm" />
                  <Text fontSize="12px">{user.displayName}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleSignOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button variant="link" onClick={() => onOpen()}>
              Log In
            </Button>
          )}
        </React.Fragment>
      )}
    </Flex>
  );
};

export default Navbar;
