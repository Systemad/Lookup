import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Flex, Spacer } from '@chakra-ui/react'
import {Container, Avatar, Message, Header, Content, LookupActionsContainer, LookupAction } from "./styles";
export interface Props {
    author?: string;
    date?: string;
    content?: string | React.ReactElement | React.ReactNode;
}

const ChannelMessage: React.FC<Props> = ({
    author,
    date,
    content,
}) => {
    return (
        <Container>
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
        </Container>
    );
};

export default ChannelMessage;
