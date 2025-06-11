import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Nick!";
const bio1 = "A Full Stack Software Engineer";
const bio2 = "Certified Front and Back End Developer";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={4}>
      {/* Avatar */}
      <Avatar size="2xl" name="Nick" src="/nick.jpeg" />

      {/* Greeting */}
      <Heading as="h1" size="xl" color="white">
        {greeting}
      </Heading>

      {/* Bio */}
      <Heading as="h2" size="md" color="gray.300">
        {bio1}
      </Heading>
      <Heading as="h2" size="md" color="gray.300">
        {bio2}
      </Heading>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
