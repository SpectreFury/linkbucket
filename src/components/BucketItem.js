import React, { useState } from "react";
import { Flex, Text, Link, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { firestore } from '../firebaseConfig';
import { updateDoc, doc, arrayRemove } from 'firebase/firestore';

const BucketItem = ({ item, setLinks, selectedBucket, user }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      await updateDoc(doc(firestore, 'buckets', selectedBucket.id), {
        bucket: arrayRemove(item)
      })
      setLinks((prev) => prev.filter((link) => link.title !== item.title))

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
      _hover={{ background: "gray.800" }}
      alignItems="center"
      gap={4}
      justifyContent='space-between'
    >
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
      <Flex>
        {user && user.email === selectedBucket.author &&
          <IconButton size='xs' icon={<DeleteIcon />} _hover={{ color: 'red.600' }} onClick={handleDelete} isLoading={loading} />
        }
      </Flex>
    </Flex>
  );
};

export default BucketItem;
