import React from "react";

import {
    Container,
    Profile,
    Avatar,
    UserData,
    Icons,
    SettingsIcon,
} from "./styles";

const UserInfo: React.FC = () => {
    return (
        <Container>
            <Profile>
                <Avatar />
                <UserData>
                    <strong>Gabriel Fernandes</strong>
                    <span>#5059</span>
                </UserData>
            </Profile>

            <Icons>
                <SettingsIcon />
            </Icons>
        </Container>
    );
};

export default UserInfo;
