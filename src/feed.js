import React, { useState, useEffect } from "react";
import { Box, Flex, SimpleGrid, Button } from "@chakra-ui/react";
import { PageHeader } from "./components/PageHeader";
import { GroupTitle } from "./components/GroupTitle";
import { Filters } from "./components/Filters";
import { Repo } from "./components/Repo";
import { PageLoader } from "./components/PageLoader";
import moment from "moment";
import useFetch from "use-http";

function transformFilters({ language, startDate, endDate }) {
    const transformedFilters = {};

    const languageQuery = language ? `language:${language} ` : "";
    const dateQuery = `created:${startDate}..${endDate}`;

    transformedFilters.q = languageQuery + dateQuery;
    transformedFilters.sort = "stars";
    transformedFilters.order = "desc";

    return transformedFilters;
}

export function Feed() {
    const { loading, get } = useFetch("https://api.github.com");

    const [viewType, setViewType] = useState("grid");
    const [dateJump, setDateJump] = useState("day");
    const [language, setLanguage] = useState();

    const [repositories, setRepositories] = useState([]);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState(moment().subtract(1, "day").format());

    useEffect(() => {
        const endDate = moment().subtract(1, "day").format();
        const startDate = moment(endDate).subtract(1, dateJump).format();

        setEndDate(endDate);
        setStartDate(startDate);

        setRepositories([]);
    }, [dateJump, language]);

    useEffect(() => {
        if (!startDate) {
            return;
        }

        const filters = transformFilters({ language, startDate, endDate });
        const filtersQuery = new URLSearchParams(filters).toString();

        get(`/search/repositories?${filtersQuery}`).then((data) => {
            setRepositories([
                ...repositories,
                {
                    startDate,
                    endDate,
                    items: data.items,
                },
            ]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, language, get]);

    return (
        <Box maxW="1200px" mx="auto" px="18px">
            <PageHeader />

            {repositories.length === 0 && loading && <PageLoader />}

            <Flex align="center" justify="space-between" my="25px" flexDirection={["column", "column", "column", "row"]}>
                <GroupTitle startDate={repositories?.[0]?.startDate} endDate={repositories?.[0]?.endDate} />
                <Box>
                    <Filters
                        viewType={viewType}
                        onViewChange={setViewType}
                        dateJump={dateJump}
                        onDateJumpChange={setDateJump}
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                </Box>
            </Flex>

            {repositories.map((repoGroup, counter) => {
                const groupTitle = counter > 0 && (
                    <Flex alignItems="center" justifyContent="center" my="25px">
                        <GroupTitle startDate={repoGroup.startDate} endDate={repoGroup.endDate} />
                    </Flex>
                );
                return (
                    <Box>
                        {groupTitle}
                        <SimpleGrid columns={viewType === "list" ? 1 : [1, 1, 2, 3, 3]} spacing={3}>
                            {repoGroup.items.map((repo) => (
                                <Repo isListView={viewType === "list"} repo={repo} />
                            ))}
                        </SimpleGrid>
                    </Box>
                );
            })}

            <Flex align="center" justify="center" py="20px">
                <Button
                    isLoading={loading}
                    onClick={() => {
                        setEndDate(startDate);
                        setStartDate(moment(startDate).subtract(1, dateJump).format());
                    }}
                    colorScheme="blue"
                >
                    Load next group
                </Button>
            </Flex>
        </Box>
    );
}
