import React from "react";
import { FaGithub, FaChrome, FaTwitter } from "react-icons/fa";
import { Button, Stack, Spacer, Flex } from "@chakra-ui/react";
import { Brand } from "./Brand";

export function PageHeader() {
    return (
        <Flex justify="space-around" align="center" pt="15px">
            <Brand />
            <Spacer />
            <Stack isInline d={["none", "none", "flex", "flex"]}>
                <Button
                    as="a"
                    href="https://github.com/kamranahmedse/githunt"
                    target="_blank"
                    leftIcon={<FaGithub />}
                    bg="gray.700"
                    color="white"
                    _hover={{ bg: "gray.900" }}
                >
                    View Source
                </Button>
                <Button
                    as="a"
                    href="https://chrome.google.com/webstore/detail/githunt/khpcnaokfebphakjgdgpinmglconplhp"
                    target="_blank"
                    leftIcon={<FaChrome />}
                    colorScheme="red"
                >
                    Use Extension
                </Button>
                <Button
                    as="a"
                    href="https://twitter.com/intent/tweet?text=GitHunt%20%E2%80%93%20Most%20starred%20projects%20on%20Github%20by%20@kamranahmedse%20https://github.com/kamranahmedse/githunt"
                    target="_blank"
                    leftIcon={<FaTwitter />}
                    colorScheme="twitter"
                >
                    Tweet
                </Button>
            </Stack>
        </Flex>
    );
}
