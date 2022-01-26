import { Box } from '@chakra-ui/layout';
import Head from 'next/head';
import { Centre } from '../components/Centre';
import { Navbar } from '../components/Navbar';
import NavProgress from '../components/nprogress';


const DefaultLayout: React.FC = ({ children }): JSX.Element => {

    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/logo.svg" />

            </Head>
            <NavProgress />
            <Navbar />
            <Centre>
                <Box maxW={'1200px'} p={2}>{children}</Box>
            </Centre>
        </>
    );
};

export default DefaultLayout;
