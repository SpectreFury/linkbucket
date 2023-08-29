import React, { useState, useEffect } from "react";
import { Flex, Text, Avatar, Button, Spinner } from "@chakra-ui/react";

const Navbar = ({ user, userLoading, onOpen }) => {
  return (
    <Flex
      background="#FAF0E6"
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
            <Avatar name={user.email} size="sm" />
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
