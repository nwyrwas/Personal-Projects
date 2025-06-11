import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.3s ease-in-out"
    >
      {/* Image */}
      <Image src={imageSrc} alt={title} width="100%" height="200px" objectFit="cover" />

      {/* Card Content */}
      <VStack p={4} align="start" spacing={2}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        {/* Read More Button */}
        <HStack spacing={2} color="blue.500" cursor="pointer">
          <Text fontWeight="bold">See More</Text>
          <FontAwesomeIcon icon={faArrowRight} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;
