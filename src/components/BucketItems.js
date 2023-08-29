import React from "react";
import { Stack, IconButton } from "@chakra-ui/react";
import BucketItem from "./BucketItem";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const BucketItems = ({ links }) => {
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
      {links.map((item) => (
        <BucketItem item={item} />
      ))}
    </Stack>
  );
};

export default BucketItems;
