/*global chrome*/

import React, { useState, useEffect } from "react";
import BucketItems from "../components/BucketItems";
import { useLocation } from "react-router-dom";
import { firestore } from "../firebaseConfig";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Flex, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Buckets = ({ user }) => {
  const location = useLocation();
  const [links, setLinks] = useState([]);
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCurrent = async () => {
    const duplicateLink = links.find((item) => item.link === tab.url);
    if (duplicateLink) {
      return;
    }

    setLoading(true);
    try {
      const data = {
        title: tab.title,
        link: tab.url,
      };

      await updateDoc(doc(firestore, "buckets", location.state.id), {
        bucket: arrayUnion(data),
      });
      setLinks((prev) => [...prev, data]);
    } catch (error) {
      console.log("handleAddCurrent error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    //   console.log(tabs);
    //   const url = tabs[0].url;
    //   console.log(url);
    //   if (tabs.length > 0) {
    //     setTab(tabs[0]);
    //   }
    // });

    const fetchLinks = async () => {
      setInitialLoading(true);
      try {
        const docSnap = await getDoc(
          doc(firestore, "buckets", location.state.id)
        );

        const data = docSnap.data();
        if (data.bucket.length > 0) {
          setLinks(data.bucket);
        }
      } catch (error) {
        console.log("fetchLinks error", error);
      }
      setInitialLoading(false);
    };
    fetchLinks();
  }, []);

  return (
    <React.Fragment>
      <Flex justifyContent="space-between" mx={2} my={2}>
        <Tooltip label="Go back">
          <IconButton
            size="sm"
            icon={<ArrowBackIcon />}
            rounded="full"
            _hover={{ background: "gray.800", color: "white" }}
            cursor="pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </Tooltip>
        {user && (
          <React.Fragment>
            {user.email === location.state.author && (
              <Tooltip label="Add Current">
                <IconButton
                  size="sm"
                  icon={<AddIcon />}
                  rounded="full"
                  onClick={handleAddCurrent}
                  isLoading={loading}
                />
              </Tooltip>
            )}
          </React.Fragment>
        )}
      </Flex>
      <Text color='#D8D9DA' fontWeight='bold' mx={2}>{location.state.title}</Text>
      <BucketItems links={links} setLinks={setLinks} selectedBucket={location.state} user={user} />
    </React.Fragment>
  );
};

export default Buckets;
