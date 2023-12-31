"use client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
  Container,
  Collapse,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { TbBooks } from "react-icons/tb";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Context from "../Context";
import NavLink from "./NavLink";
import { getUser } from "../utils";

const Navigation = () => {
  const { user, setUser } = useContext(Context);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const token = localStorage.getItem("token");

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate(0);
  };

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, navigate, setUser]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const search = () => {
    navigate(`/books?search=${searchInput}`);
  };

  const links = [
    {
      text: "Libros",
      href: "/books",
    },
    {
      text: "Buscar",
      href: "/search",
    },
    {
      text: "Comunidad",
      href: "/community",
    },
  ];

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={0}>
        <Container maxW={"container.xl"} px={0}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={onToggle}
            />

            <HStack spacing={10}>
              <NavLink href="/" id="logo">
                <TbBooks fontSize="26" /> ReadConnect
              </NavLink>
              <HStack display={{ base: "none", md: "flex" }}>
                {links.map((link, index) => {
                  return (
                    <NavLink key={index} href={link.href}>
                      {link.text}
                    </NavLink>
                  );
                })}
              </HStack>
            </HStack>

            <Flex alignItems={"center"}>
              <HStack spacing={2}>
                <InputGroup display={{ base: "none", md: "flex" }}>
                  <Input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") search();
                    }}
                    name="search"
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="Búsqueda rápida"
                  />
                  <InputRightElement cursor="pointer" onClick={search}>
                    <Search2Icon color="green.500" />
                  </InputRightElement>
                </InputGroup>

                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                {user ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{user.name}</p>
                      </Center>
                      <br />
                      {user ? (
                        <>
                          <MenuDivider />
                          <MenuItem onClick={() => navigate("/profile")}>
                            Mi perfil
                          </MenuItem>
                          <MenuDivider />
                          <MenuItem onClick={logout}>Salir</MenuItem>
                        </>
                      ) : (
                        ""
                      )}
                    </MenuList>
                  </Menu>
                ) : (
                  <NavLink href={"/login"}>Acceder</NavLink>
                )}
              </HStack>
            </Flex>
          </Flex>
        </Container>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <InputGroup>
                <Input
                  name="search"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Búsqueda rápida"
                />
                <InputRightElement cursor="pointer" onClick={search}>
                  <Search2Icon color="green.500" />
                </InputRightElement>
              </InputGroup>
              {links.map((link, index) => {
                return (
                  <NavLink key={index} href={link.href}>
                    {link.text}
                  </NavLink>
                );
              })}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default Navigation;
