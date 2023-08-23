import React from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";

const DUMMY_LIST = [
  {
    title: "Self study math for beginners",
    bucket: [],
    upvotes: 20,
    author: "danielradcliff",
  },
  {
    title: "Craziest videos of the week",
    bucket: [],
    upvotes: 20,
    author: "jasonmomoa",
  },
];

const BucketList = () => {
  return (
    <Stack mt={4} mx={2}>
      {DUMMY_LIST.map((item) => (
        <ListItem item={item} />
      ))}
    </Stack>
  );
};

export default BucketList;
