import styled from "styled-components";
import MicNoneIcon from '@mui/icons-material/MicNone';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';

export const Container = styled.div`
    grid-area: UI;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
    background-color: var(--quaternary);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;

    background-color: var(--gray);
`;

export const UserData = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;

    > strong {
        color: var(--white);
        font-size: 13px;
        display: block;
    }

    > span {
        color: var(--gray);
        font-size: 13px;
    }
`;

export const Icons = styled.div`
    display: flex;
    align-items: center;

    justify-content: space-between;
`;

export const MicIcon = styled(MicNoneIcon)`
    height: 20px;
    width: 20px;

    color: var(--white);
    opacity: 0.7;
    cursor: pointer;

    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

export const HeadphoneIcon = styled(HeadsetIcon)`
    height: 20px;
    width: 20px;

    color: var(--white);
    opacity: 0.7;
    cursor: pointer;

    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

export const SettingsIcon2 = styled(SettingsIcon)`
    height: 20px;
    width: 20px;

    color: var(--white);
    opacity: 0.7;
    cursor: pointer;

    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;
