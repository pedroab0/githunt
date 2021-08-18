import React from "react";
import { Stack, Select, Button, Menu, MenuButton, MenuList, MenuItem, Box } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import languages from "../data/languages.json";
import { FaTable, FaList } from "react-icons/fa";

export function Filters(props) {
    const { viewType, onViewChange, onDateJumpChange, dateJump, language, onLanguageChange } = props;

    return (
        <Stack isInline mt={["15px", "15px", "15px", 0]}>
            <Select bg="whiteAlpha" value={language} onChange={(e) => onLanguageChange(e.target.value)}>
                {languages.map((language) => (
                    <option value={language.value}>{language.label}</option>
                ))}
            </Select>

            <Menu>
                <MenuButton
                    as={Button}
                    bg="white"
                    _hover={{ bg: "gray.50" }}
                    _expanded={{ bg: "gray.50" }}
                    fontWeight="400"
                    borderWidth={1}
                    px="30px"
                    minWidth="auto"
                    leftIcon={<CalendarIcon />}
                >
                    <Box as="span" textTransform="capitalize">
                        {dateJump}
                    </Box>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => onDateJumpChange("day")}>Daily</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange("week")}>Weekly</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange("month")}>Monthly</MenuItem>
                    <MenuItem onClick={() => onDateJumpChange("year")}>Yearly</MenuItem>
                </MenuList>
            </Menu>

            <Stack d={["none", "none", "none", "flex"]} isInline spacing={0} borderWidth={1} bg="white" rounded="5px" align="center" ml="10px">
                <Button
                    h="100%"
                    onClick={() => onViewChange("grid")}
                    fontWeight={400}
                    roundedRight={0}
                    leftIcon={<FaTable />}
                    bg={viewType === "grid" ? "gray.100" : "white"}
                    _hover={{ bg: "gray.50" }}
                >
                    Grid
                </Button>
                <Button
                    h="100%"
                    onClick={() => onViewChange("list")}
                    fontWeight={400}
                    roundedLeft={0}
                    leftIcon={<FaList />}
                    bg={viewType === "list" ? "gray.100" : "white"}
                    _hover={{ bg: "gray.50" }}
                >
                    List
                </Button>
            </Stack>
        </Stack>
    );
}
