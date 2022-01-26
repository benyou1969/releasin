import { Box, Button, Code, Heading, HStack, Text } from "@chakra-ui/react"
import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductTypeApi } from "../../../generated";


export const Index = ({ productType }) => {
    const router = useRouter()
    const handleDeleteProductType = async () => {
        const productTypeApi = new ProductTypeApi();
        const res = await productTypeApi.productTypeControllerRemove(productType.id);
        if (res.data.deleted) {
            router.push('/product-type');
        }
    }
    return (
        <Box p={20}>
            <Heading>Product Type: {productType.name}</Heading>
            {productType?.attributes.map((attribute, index) => (
                <div>
                    <HStack key={index}>
                        <Text>{attribute.name}</Text>  : <Code>{attribute.type}</Code>
                    </HStack>
                </div>
            ))}
            <br />
            <Link href={`/edit/product-type/${productType.id}`}><Text as="a" color="blue.500" cursor={'pointer'}>Edit</Text></Link>
            <Button mx={2} colorScheme="red" size="sm" onClick={handleDeleteProductType}>DELETE</Button>

        </Box>
    )
}

export async function getServerSideProps(context) {
    const productTypeApi = new ProductTypeApi();
    try {

        const res = await productTypeApi.productTypeControllerFindOne(context.params.id)
        return {
            props: { productType: res.data },
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Index
