import React from "react";
import { Flex, Text, Link } from "@chakra-ui/react";

const BucketItem = ({ item }) => {
  return (
    <Flex
      background="gray.400"
      p="4px 10px"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ background: "gray.800" }}
      alignItems="center"
      gap={4}
    >
      <Flex></Flex>
      <Flex flexDirection="column">
        <Text color="white" fontWeight="bold" fontSize="14px">
          {item.title}
        </Text>
        <Link
          color="gray.600"
          href={item.link}
          _hover={{ color: "blue.400" }}
          isExternal
          fontSize="14px"
        >
          {item.link}
        </Link>
      </Flex>
    </Flex>
  );
};

export default BucketItem;
