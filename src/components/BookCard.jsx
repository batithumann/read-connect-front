import {
  Box,
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const BookCard = ({ book }) => {
  console.log(book);
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my={10}
    >
      <Image
        objectFit="contain"
        objectPosition="top"
        minW="160px"
        maxW="160px"
        src={
          book.thumbnail_url ||
          "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
        }
        alt={book.title}
      />

      <Stack w="100%">
        <CardBody w="100%">
          <Heading size="md">
            {book.title}
            {Array.isArray(book.author) ? (
              book.author.map((author, index) => {
                return (
                  <Box
                    key={index}
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {author}
                  </Box>
                );
              })
            ) : (
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {[book.author]}
              </Box>
            )}
          </Heading>

          <Text py="2">{book.short_description}</Text>
        </CardBody>

        <CardFooter>
          <Flex w="100%" justifyContent="space-between">
            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < book.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {book.reviewCount || 0} reviews
              </Box>
            </Box>
            <Box>{book.page_count} páginas</Box>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

// export default BookCard;

export default BookCard;
