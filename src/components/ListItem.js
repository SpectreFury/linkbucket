import React, { useState } from "react";
import { Flex, Text, Tag, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from '@chakra-ui/icons';
import { firestore } from '../firebaseConfig';
import { deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { StarIcon } from '@chakra-ui/icons';

const ListItem = ({ item, setBuckets, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

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

  const handleFavorite = async (e) => {
    e.stopPropagation();
    setFavoriteLoading(true);

    try {
      if (item.favorites.includes(user.uid)) {
        await updateDoc(doc(firestore, 'buckets', item.id), {
          favorites: arrayRemove(user.uid)
        })
      }
      else {
        await updateDoc(doc(firestore, 'buckets', item.id), {
          favorites: arrayUnion(user.uid)
        })
      }

    } catch (error) {
      console.log('handleFavorite error', error);
    }

    if (item.favorites.includes(user.uid)) {
      setBuckets((prev) => prev.map((bucket) => {
        if (bucket.id === item.id) {
          return { ...bucket, favorites: bucket.favorites.filter((id) => id !== user.uid) }
        }
        return bucket;
      }))
    }
    else {
      setBuckets((prev) => prev.map((bucket) => {
        if (bucket.id === item.id) {
          return { ...bucket, favorites: [...bucket.favorites, user.uid] }
        }
        return bucket;
      }))
    }

    setFavoriteLoading(false);

  }


  return (
    <Flex
      background="gray.400"
      p="4px 10px"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ background: "gray.800", color: "#D8D9DA" }}
      onClick={() => {
        navigate("/buckets", { state: item });
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
          <IconButton size="xs" icon={<DeleteIcon />} _hover={{ color: 'red.600' }} onClick={handleDelete} isLoading={loading} />
        }
        {user &&
          <IconButton size='xs' icon={<StarIcon />} _hover={{ color: 'gold' }} onClick={handleFavorite} isLoading={favoriteLoading} color={item.favorites && item.favorites.includes(user.uid) && 'gold'} />
        }

      </Flex>
    </Flex>
  );
};

export default ListItem;
