import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Flex, Spacer } from '@chakra-ui/react'
import {Container, Avatar, Message, Header, Content, LookupActionsContainer, LookupAction } from "./styles";
export interface Props {
    author?: string;
    date?: string;
    content?: string | React.ReactElement | React.ReactNode;
}


/*
    display: flex;
    align-items: center;

    padding: 4px 16px;
    margin-right: 4px;

    background-color: transparent;

    &.mention {
        background-color: var(--mention-message);

        border-left: 2px solid var(--mention-detail);
        padding-left: 14px;
    }

    &:hover {
      background-color: darksalmon;
      opacity: 1;
    }

    & + div {
        margin-top: 13px;
    }
 */

const ChannelMessage: React.FC<Props> = ({
    author,
    date,
    content,
}) => {
    return (
        <Flex alignItems="center" p="4px 16px" backgroundColor="transparent" mr="px">
            <Avatar />

            <Message>
                <Header>
                    <strong>{author}</strong>

                    <time>{date}</time>
                </Header>
                <Content>{content}</Content>
            </Message>
            <LookupActionsContainer>
                <LookupAction>
                    <MdFavorite color="primary"/>
                </LookupAction>
                <LookupAction>
                    <TbRepeat/>
                </LookupAction>
            </LookupActionsContainer>
        </Flex>
    );
};

export default ChannelMessage;
