import React, { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";

const BucketList = ({ buckets }) => {
  return (
    <Stack mt={4} mx={2}>
      {buckets.map((item) => (
        <ListItem item={item} />
      ))}
    </Stack>
  );
};

export default BucketList;
