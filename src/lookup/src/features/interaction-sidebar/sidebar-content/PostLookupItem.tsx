import {CreateLookupModel, useLookupPostLookupMutation} from "../../redux/webApi";
import {
    Button,
    Flex,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Textarea,
    useDisclosure
} from "@chakra-ui/react";
import * as React from "react";

type Props = {
    children: string
}

const PostLookupItem = ({children} : Props) => {

    const [sendLookup] = useLookupPostLookupMutation();
    const {isOpen, onOpen, onClose} = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    let [value, setValue] = React.useState('')

    let handleInputChange = (e: any) => {
        e.preventDefault();
        let inputValue = e.target.value;
        setValue(inputValue)
    }

    const SubmitLookup = async () => {
        const isMessageProvided = value && value !== '';
        if(isMessageProvided){
            let newMsg = {
                content: value
            } as CreateLookupModel;
            await sendLookup({createLookupModel: newMsg})
            setValue('');
            onClose();
        }
    }

    return (
        <Flex
            align="center"
            px="2"
            mx="1"
            rounded="xs"
            py="3"
            cursor="pointer"
            color="whiteAlpha.700"
            role="group"
            fontWeight="semibold"
        >
            <Button width="200px" colorScheme='yellow' size='md' onClick={onOpen}>
                {children}
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Post Lookup</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder='Enter your Lookup content'
                            size='sm'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='yellow' onClick={SubmitLookup}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default PostLookupItem;