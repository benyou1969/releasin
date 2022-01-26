import { Heading, } from "@chakra-ui/react"
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Centre } from "../../components/Centre";


export const Index = ({ products }) => {
    return (
        <Centre>
            <Heading>Products</Heading>
        </Centre>
    )
}

export async function getServerSideProps(context) {
    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {},
    }
}

export default Index
