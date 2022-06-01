import styled from "styled-components";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export const Container = styled.div`
    grid-area: CD;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    background-color: var(--primary);
`;

export const Lookups = styled.div`
    padding: 20px 0;

    display: flex;
    flex-direction: column;

    // TODO: 50%, potential two side columns
    // When user clicks on tweet, make this width 50%, and open tweet + retweets in next side
    max-width: 50%;
    max-height: calc(100vh - 46px);
    // Remove scroll, make right bar permanent like left?  
    overflow-y: scroll;
  
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--tertiary);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
        background-color: var(--secondary);
    }
`;

export const InputWrapper = styled.div`
    width: 100%;

    padding: 0 16px;
`;

export const Input = styled.input`
    width: 100%;
    height: 44px;

    padding: 0 10px 0 57px;
    border-radius: 7px;

    color: var(--white);
    background-color: var(--chat-input);

    position: relative;

    &::placeholder {
        color: var(--gray);
    }

    ~ svg {
        position: relative;
        top: -50%;
        left: 14px;
        transition: 180ms ease-in-out;
    }
`;

export const InputIcon = styled(AlternateEmailIcon)`
    width: 24px;
    height: 24px;

    color: var(--gray);
`;

export const Mention = styled.span`
    color: var(--link);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
