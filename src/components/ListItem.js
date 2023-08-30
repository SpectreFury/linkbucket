import React, { useState } from "react";
import { Flex, Text, Tag, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from '@chakra-ui/icons';
import { firestore } from '../firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

const ListItem = ({ item, setBuckets, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      await deleteDoc(doc(firestore, 'buckets', item.id))
      setBuckets((prev) => prev.filter((bucket) => bucket.id !== item.id))

    } catch (error) {
      console.log('handleDelete error', error);
    }
    setLoading(false);

  }

  return (
    <Flex
      background="gray.400"
      p="4px 10px"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ background: "gray.800", color: "#D8D9DA" }}
      onClick={() => {
        navigate("/buckets", { state: { id: item.id, email: item.author } });
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex flexDirection="column">
        <Text color="white" fontWeight="bold">
          {item.title}
        </Text>
        <Text fontSize="12px" fontWeight="semibold">
          {item.username}
        </Text>
      </Flex>
      <Flex gap={2}>
        <Tag size="sm" colorScheme="teal">
          {item.bucket.length} links
        </Tag>
        {user && user.email === item.author &&
          <IconButton size="sm" icon={<DeleteIcon />} _hover={{ color: 'red.600' }} onClick={handleDelete} isLoading={loading} />
        }

      </Flex>
    </Flex>
  );
};

export default ListItem;
