import React from 'react';
import{ useState } from "react";
import { useMsal } from "@azure/msal-react";
import {loginRequest} from "../utils/authConfig";
import {Button} from "@chakra-ui/react";

export const SignOutButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogout = (logoutType: string) => {
        setAnchorEl(null);

        if (logoutType === "popup") {
            instance.logoutPopup({
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect();
        }
    }

    return (
        <div>
            <Button onClick={() => handleLogout("popup")} key="logoutPopup">Logout using Popup</Button>
            <Button onClick={() => handleLogout("redirect")} key="logoutRedirect">Logout using Redirect</Button>
        </div>
    )
};