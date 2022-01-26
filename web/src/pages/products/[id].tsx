import { Box, Button, Code, FormControl, FormLabel, Heading, HStack, Input, Radio, Select, Text, VStack } from "@chakra-ui/react"

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductApi } from "../../../generated";



export const Index = ({ product }) => {
    const router = useRouter()
    const handleDeleteProduct = async () => {
        const productApi = new ProductApi()

        const res = await productApi.productControllerRemove(product.id)
        if (res.data.deleted) {
            router.push('/products');
        }
    }
    return (
        <Box>
            <Heading>Product: {product.name}</Heading>
            <br />
            {product.attributes.map((attribute, index) => (
                <HStack key={index}>
                    <Text>{attribute.name}</Text>  : <Code>{attribute.value}</Code>
                </HStack>
            ))}
            <br />
            <Link href={`/edit/product/${product.id}`}><Text as="a" color="blue.500" cursor={'pointer'}>Edit</Text></Link>
            <Button mx={2} colorScheme="red" size="sm" onClick={handleDeleteProduct}>DELETE</Button>
        </Box>
    )
}

export async function getServerSideProps(context) {
    try {
        const productApi = new ProductApi()
        const res = await productApi.productControllerFindOne(context.params.id)
        return {
            props: { product: res.data }, // will be passed to the page component as props
        }
    } catch {
        return {
            notFound: true,
        }
    }
}

export default Index
