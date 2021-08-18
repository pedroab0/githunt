import React from "react";
import { Box } from "@chakra-ui/react";
import { Feed } from "./feed";

export function App() {
    return (
        <Box width="100vw" minHeight="100vh" bg="gray.200">
            <Feed />
        </Box>
    );
}
