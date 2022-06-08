import {Flex, Icon} from "@chakra-ui/react";
import * as React from "react";
import { MdBuild , MdCall } from "react-icons/md"
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";

const NavBarItem = (iconProp: any) => {
    const { icon, children, ...rest } = iconProp;
    const navigate = useNavigate();
    return (
        <Flex
            align="center"
            px="4"
            mx="2"
            rounded="md"
            py="3"
            color="whiteAlpha.700"
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            <Button onClick={() => navigate(`${children.toLowerCase()}`)} leftIcon={<MdBuild />} colorScheme="whiteAlpha" variant="ghost" mr="2">
                {children}
            </Button>
        </Flex>
    );
};

export default NavBarItem;

/*
            {icon && (
                <Icon
                    mr="2"
                    boxSize="4"
                    _groupHover={{
                        color: "gray.300",
                    }}
                    as={icon}
                />
            )}
            {children}
 */