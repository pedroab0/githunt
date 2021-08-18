import React from "react";
import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react";

export function Brand() {
    return (
        <Flex>
            <Image src="/logo.svg" />
            <Box ml="10px">
                <Heading fontSize="24px">GitHunt</Heading>
                <Text color="gray.600">Most starred projects on Github</Text>
            </Box>
        </Flex>
    );
}
