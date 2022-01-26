import { PlusSquareIcon } from '@chakra-ui/icons';
import {
    Box,
    BoxProps,
    Button,
    Flex,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    HStack,
    Image,
} from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';

export const Navbar: React.FC<BoxProps> = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Link href="/">
                <HStack cursor="pointer">
                    <Image src="/logo.svg" h={'39px'} w={'40px'} mr={-2} />
                </HStack>
            </Link>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => {
    const { colorMode } = useColorMode();
    return (
        <svg
            width="24"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill={colorMode == 'light' ? '#4a5568' : '#f0f6fc'}
        >
            <title>Close</title>
            <path d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z" />
        </svg>
    );
};

const MenuIcon = () => {
    const { colorMode } = useColorMode();

    return (
        <svg
            width="24px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill={colorMode == 'light' ? '#4a5568' : '#f0f6fc'}
        >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
    );
};

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};


const MenuLinks = ({ isOpen }) => {

    return (
        <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                direction={['column', 'row', 'row', 'row']}
                pt={[4, 4, 0, 0]}
            >
                <Link href={'/product-type'}>
                    <Text cursor="pointer" as="span" _hover={{
                        color: "blue.500"
                    }}>All Product Types</Text>
                </Link>
                <Link href="/new/product">
                    <Button size="sm" leftIcon={<PlusSquareIcon />}>
                        New Product
                    </Button>
                </Link>
                <Link href="/new/product-type">
                    <Button size="sm" leftIcon={<PlusSquareIcon />}>
                        New Product Type
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Box>
            <Flex
                top="0"
                as="header"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                px={4}
                py={1}
                zIndex="999"
                boxShadow={'sm'}
                {...props}
                css={{
                    backdropFilter: 'saturate(180%) blur(5px)',

                    background: useColorModeValue(
                        'rgb(251 247 239 / 0.68)',
                        'rgb(36 41 46 / 68%)',
                    ),
                }}
            >
                {children}
            </Flex>
        </Box>
    );
};

