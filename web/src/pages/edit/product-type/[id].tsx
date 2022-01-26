import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Select } from "@chakra-ui/react"

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from "axios";
import { useRouter } from "next/router";
import { AttributeType } from "../../new/product";
import Head from "next/head";


export const Index = ({ productType }) => {
    const router = useRouter();
    return (
        <Box>
            <Heading>Product Type</Heading>
            <Head>
                <title>Edit Product Type - {productType.name}</title>
            </Head>
            <Formik
                initialValues={productType}
                onSubmit={async (values) => {
                    const res = await axios.patch(`http://localhost:8080/v1/product-type/${productType.id}`, values);
                    if (res.status === 200) {
                        router.push(`/product-type/${productType.id}`);
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
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`http://localhost:8080/v1/product-type/${context.params.id}`);
        return {
            props: { productType: res.data }, // will be passed to the page component as props
        }
    } catch {
        return {
            notFound: true,
        }
    }
}

export default Index
