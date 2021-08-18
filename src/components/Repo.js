import React from "react";
import moment from "moment";
import { Flex, Box, Heading, Text, Stack, Image, Button, Link } from "@chakra-ui/react";
import { GoStar, GoRepoForked, GoIssueOpened } from "react-icons/go";

export function Repo(props) {
    const { isListView = false, repo } = props;

    return (
        <Flex borderWidth={1} bg="white" p="15px" rounded="8px" alignItems="flex-start">
            <Flex flex={1} flexDir="column">
                {!isListView && (
                    <Flex mb="20px" as="a" href={repo.owner.html_url}>
                        <Image src={repo.owner.avatar_url} width={"35px"} height={"35px"} rounded="8px" />
                        <Box ml="10px">
                            <Heading fontSize="16px">{repo.owner.login}</Heading>
                            <Text fontSize="13px">View Profile</Text>
                        </Box>
                    </Flex>
                )}

                <Box mb="20px" flex={1}>
                    <Box mb="10px">
                        <Flex fontSize="19px" fontWeight={700} color="purple.700" mb="3px">
                            {isListView && (
                                <>
                                    <Text as="a" href={repo.owner.html_url} target="_blank">
                                        {repo.owner.login}
                                    </Text>
                                    &nbsp;/&nbsp;
                                </>
                            )}
                            <Text as="a" href={repo.html_url} target="_blank">
                                {repo.name}
                            </Text>
                        </Flex>
                        {/* <Heading fontSize="19px" as="a" href={repo.html_url} target="_blank" color="purple.700">
                            {repo.name}
                        </Heading> */}
                        <Text color="gray.600">
                            <Box as={"span"} d={["none", "none", "inline", "inline"]}>
                                Built by &middot;{" "}
                                <Link fontWeight={600} href={repo.owner.html_url} target="_blank">
                                    {repo.owner.login}
                                </Link>{" "}
                                &middot;
                            </Box>{" "}
                            {moment(repo.created_at).format("MMMM D, YYYY")}
                        </Text>
                    </Box>
                    <Text fontSize="14px" color="gray.900">
                        {repo.description}
                    </Text>
                </Box>

                <Stack isInline spacing="10px">
                    <Button
                        as="a"
                        href={`${repo.html_url}/stargazers`}
                        target="_blank"
                        fontSize="14px"
                        cursor="pointer"
                        leftIcon={<GoStar />}
                        variant="link"
                        iconSpacing="4px"
                        _hover={{ textDecoration: "none" }}
                    >
                        {repo.stargazers_count}
                    </Button>
                    <Button
                        as="a"
                        href={`${repo.html_url}/network/members`}
                        target="_blank"
                        fontSize="14px"
                        cursor="pointer"
                        leftIcon={<GoRepoForked />}
                        variant="link"
                        iconSpacing="4px"
                        _hover={{ textDecoration: "none" }}
                    >
                        {repo.forks}
                    </Button>
                    <Button
                        as="a"
                        href={`${repo.html_url}/network/members`}
                        target="_blank"
                        fontSize="14px"
                        cursor="pointer"
                        leftIcon={<GoIssueOpened />}
                        variant="link"
                        iconSpacing="4px"
                        _hover={{ textDecoration: "none" }}
                    >
                        {repo.open_issues_count}
                    </Button>
                </Stack>
            </Flex>

            {isListView && <Image src={repo.owner.avatar_url} w={"105px"} h={"105px"} rounded="100%" />}
        </Flex>
    );
}
