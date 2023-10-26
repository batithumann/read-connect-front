"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Badge,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookDetailsById } from "../utils";
import Loading from "../components/Loading";

const BookDetails = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookDetailsById(book_id)
      .then((response) => {
        setBook(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [book_id]);
  return (
    <Container maxW={"7xl"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={book.thumbnail_url}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {book.title}
                </Heading>
                {book.categories.map((category, index) => {
                  return (
                    <Badge
                      key={index}
                      ml="2"
                      variant="solid"
                      colorScheme="purple"
                    >
                      <Link href={`/books/search?category=${category.name}`}>
                        {category.name}
                      </Link>
                    </Badge>
                  );
                })}
                {book.authors.map((author, index) => {
                  return (
                    <Text key={index} fontWeight={300} fontSize={"2xl"}>
                      <Link href={`/books/search?author=${author.name}`}>
                        {author.name}
                      </Link>
                    </Text>
                  );
                })}
                <Flex
                  flexDirection="column"
                  textAlign="left"
                  minW="90px"
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  <Text>
                    {book.published_date &&
                      "Fecha de publicación: " +
                        new Date(book.published_date).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                  </Text>
                  <Text>{book.page_count} páginas</Text>
                </Flex>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>{book.long_description}</Text>
                </VStack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default BookDetails;
