import { Box, Heading, Text, } from "@chakra-ui/react"

import React from 'react';

import Link from "next/link";
import { ProductApi } from "../../generated";


export const Index = ({ products }) => {
  return (
    <Box>
      <Heading>Products</Heading>
      {products.length > 0 ?
        products.map((product, index) => (
          <Box p={2}>
            <Link href={`/products/` + product.id}>
              <a><Text color="blue.500">{product.name}</Text></a>
            </Link>
          </Box>
        ))
        : <Text>No products</Text>
      }
    </Box>
  )
}

export async function getServerSideProps(context) {

  const productApi = new ProductApi();
  const res = await productApi.productControllerFindAll();

  return {
    props: { products: res.data }, // will be passed to the page component as props
  }

}

export default Index
