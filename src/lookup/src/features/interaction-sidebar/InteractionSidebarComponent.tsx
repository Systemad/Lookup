import * as React from 'react';
import {
    Box,
    useColorModeValue,
} from '@chakra-ui/react'
import BaseBar from "./sidebar-content/BaseBar";

export const InteractionSidebarComponent = () => {

    return (
        <>
            <Box
                as="section"
                bg={useColorModeValue("gray.50", "gray.700")}
                minH="100vh"
                width="200px"
            >
                <BaseBar />
            </Box>
        </>
    )
}

export default InteractionSidebarComponent;