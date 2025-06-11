import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: nick.wyrwas@outlook.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/nwyrwas",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/nicholas-wyrwas/",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Social Media Links */}
          <nav>
            <HStack spacing={4}>
              {socials.map((social, index) => (
                <Link key={index} href={social.url} isExternal>
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </Link>
              ))}
            </HStack>
          </nav>

          {/* Internal Page Links */}
          <nav>
            <HStack spacing={8}>
              <Link href="/#projects-section" onClick={handleClick("projects")} _hover={{ textDecoration: "none", color: "gray.400" }}>
                Projects
              </Link>
              <Link href="/#contactme-section" onClick={handleClick("contactme")} _hover={{ textDecoration: "none", color: "gray.400" }}>
                Contact Me
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
