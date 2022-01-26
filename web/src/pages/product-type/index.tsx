import { Box, Heading, Text } from "@chakra-ui/react"
import React from 'react';
import Link from "next/link";
import Head from "next/head";
import { ProductTypeApi } from "../../../generated";

export const Index = ({ productsTypes }) => {
    return (
        <Box>
            <Head>
                <title>All Product Types</title>
            </Head>
            <Heading>Product Types</Heading>
            {productsTypes.length == 0 && <Text>No Product Types</Text>}
            {productsTypes.map((productType, index) => (
                <Box p={2}>
                    <Link href={`/product-type/` + productType.id}>
                        <a><Text color="blue.500">{productType.name}</Text></a>
                    </Link>
                </Box>
            ))}
        </Box>
    )
}

export async function getServerSideProps(context) {
    const productTypeApi = new ProductTypeApi();
    const res = await productTypeApi.productTypeControllerFindAll();
    return {
        props: { productsTypes: res.data },
    }
}

export default Index
