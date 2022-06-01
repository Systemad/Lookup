import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';

import {Container, Avatar, Message, Header, Content, LookupActionsContainer, LookupAction } from "./styles";
export interface Props {
    author: string;
    date: string;
    content: string | React.ReactElement | React.ReactNode;
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
                    <FavoriteIcon color="primary"/>
                </LookupAction>
                <LookupAction>
                    <RepeatIcon/>
                </LookupAction>
            </LookupActionsContainer>
        </Container>
    );
};

export default ChannelMessage;
