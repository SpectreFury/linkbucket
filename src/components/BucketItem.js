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
      flexDirection="column"
    >
      <Text color="white" fontWeight="bold">
        {item.title}
      </Text>
      <Link
        color="gray.600"
        href={item.link}
        _hover={{ color: "blue.400" }}
        isExternal
      >
        {item.link}
      </Link>
    </Flex>
  );
};

export default BucketItem;
