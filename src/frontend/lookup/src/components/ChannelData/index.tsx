import React, { useRef, useEffect } from "react";

import ChannelMessage from "../ChannelMessage";

import { Container, Lookups, InputWrapper, Input, InputIcon, Mention } from "./styles";

const ChannelData = () => {
    const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const div = messagesRef.current;

        if (div) {
            div.scrollTop = div.scrollHeight;
        }
    }, [messagesRef]);

    return (
        <Container>
            <Lookups ref={messagesRef}>
                {Array.from(Array(15).keys()).map((n) => (
                    <ChannelMessage
                        author="Gabriel Shelby"
                        date="18/08/2020"
                        content="Bora jogar The Escapists"
                    />
                ))}

                <ChannelMessage
                    author="Monteiro Shelby"
                    date="18/08/2020"
                    content={
                        <>
                            <Mention>@Gabriel Shelby</Mention>,
                            terminando de
                            comer aqui, já vou
                        </>
                    }
                />
            </Lookups>
        </Container>
    );
};

export default ChannelData;
