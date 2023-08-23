import React from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";

const Navbar = () => {
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
      <Avatar name="SpectreFury" size="sm" />
    </Flex>
  );
};

export default Navbar;
