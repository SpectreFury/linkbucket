import React from "react";
import { Stack, IconButton } from "@chakra-ui/react";
import BucketItem from "./BucketItem";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const DUMMY_ITEMS = [
  {
    title: "Introduction to linear algebra",
    link: "https://www.youtube.com/watch?v=7UJ4CFRGd-U&list=PL221E2BBF13BECF6C",
  },
  {
    title: "Basics of math playlist",
    link: "https://www.youtube.com/watch?v=04MWqyhD61g&list=PLMcpDl1Pr-viA25VUkHNmcUkWx9usPgyb",
  },
];

const BucketItems = () => {
  const navigate = useNavigate();

  return (
    <Stack mt={4} mx={2}>
      <IconButton
        size="sm"
        icon={<ArrowBackIcon />}
        rounded="full"
        alignSelf="flex-start"
        _hover={{ background: "gray.800", color: "white" }}
        cursor="pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      {DUMMY_ITEMS.map((item) => (
        <BucketItem item={item} />
      ))}
    </Stack>
  );
};

export default BucketItems;
