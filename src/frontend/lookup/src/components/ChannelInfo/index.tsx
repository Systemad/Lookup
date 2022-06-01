import React from "react";

import {
    Container,
    HashtagIcon,
    Title,
    Separator,
    Description,
} from "./styles";

const ChannelInfo: React.FC = () => {
    return (
        <Container>
            <HashtagIcon />
            <Title>Lookup</Title>
            <Separator />
            <Description>Home</Description>
        </Container>
    );
};

export default ChannelInfo;
