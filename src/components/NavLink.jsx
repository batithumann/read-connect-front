import { Flex, useColorModeValue } from "@chakra-ui/react";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Flex
      id={props.id}
      alignItems="center"
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={props.href}
    >
      {children}
    </Flex>
  );
};

export default NavLink;
