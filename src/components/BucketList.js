import React, { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";

const BucketList = ({ buckets, setBuckets, user }) => {
  return (
    <Stack mt={4} mx={2} maxHeight="400px" overflowY="scroll" pr={2}>
      {buckets.map((item) => (
        <ListItem item={item} setBuckets={setBuckets} user={user}/>
      ))}
    </Stack>
  );
};

export default BucketList;
