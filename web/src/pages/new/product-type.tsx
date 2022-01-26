import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Radio, Select, VStack } from "@chakra-ui/react"

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AttributeType } from "./product";
import { useRouter } from "next/router";
import Head from "next/head";
import { ProductTypeApi } from "../../../generated";


export const Index = () => {
    const router = useRouter()
    return (
        <Box>
            <Head>
                <title>New Product Type</title>
            </Head>
            <Heading size="2xl">New Product Type</Heading>
            <br />
            <Formik
                initialValues={{
                    name: '',
                    attributes: [{
                        name: '', type: AttributeType.TEXT,
                    }],
                }}
                onSubmit={async (values) => {
                    const productTypeApi = new ProductTypeApi()
                    const res = await productTypeApi.productTypeControllerCreate(values);
                    if (res.status === 201) {
                        router.push(`/product-type/${res.data.id}`)
                    }
                }}
            >
                {({ errors, touched, ...props }) => (
                    <Form>
                        <Field name='name'>
                            {({ field, form }) => (
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>name</FormLabel>
                                    <Input {...field} id='name' placeholder='name' />
                                </FormControl>
                            )}
                        </Field>
                        <br />



                        <FieldArray
                            name="attributes"
                            render={(arrayHelpers) => (
                                <Box>
                                    {
                                        props.values.attributes.map((attribute, index) => (
                                            <div>
                                                <HStack key={index}>
                                                    <Field name={`attributes.${index}.name`} as={Input} placeholder="attribute name" />
                                                    <Field name={`attributes.${index}.type`} as={Select}>
                                                        <option value={AttributeType.TEXT}>TEXT</option>
                                                        <option value={AttributeType.BOOLEAN}>BOOLEAN</option>
                                                        <option value={AttributeType.DATE}>DATE</option>
                                                    </Field>

                                                    {
                                                        index != 0 &&
                                                        <Button colorScheme={'red'} onClick={() => arrayHelpers.remove(index)}>x</Button>
                                                    }
                                                </HStack>
                                                <br />
                                            </div>
                                        ))}
                                    <HStack>
                                        <Button onClick={() => arrayHelpers.push({
                                            name: '', type: AttributeType.TEXT,
                                            // value: ''
                                        })}>+</Button>
                                    </HStack>
                                </Box>
                            )}
                        />


                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}


export default Index
