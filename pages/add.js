import { Box, Heading, Container, Image, VStack, Text, Input, Textarea, Button, Spinner } from '@chakra-ui/react'
import { AppLayout } from '../components/AppLayout'
import { Hero } from '../components/Hero'
import { CarsList } from '../components/CarsList'
import { EndSection } from '../components/EndSection'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import { useRouter } from "next/router"
import CarApi from "../services/car-be.service"

export default function Add() {
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [year, setYear] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [hasChosenImage, setHasChosenImage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        console.log(name);
        console.log(brand);
        console.log(year);
        console.log(description);
    }, [name, brand, year, description])

    const listCar = () => {
        if (brand !== "") {
            const data = {
                name: name,
                brand: brand,
                year: year,
                description: description,
                image: image
            }
    
            CarApi.listCar(data)
                .then((result) => {
                    console.log(result.data)
                    Swal.fire(
                        'Success!',
                        'Data is added succesfully!',
                        'success'
                    ).then(() => router.push("/"))
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const safeParseFloat = (str) => {
        const value = Number.parseFloat(str)
        return Number.isNaN(value) ? 0 : value
    }

    const onChangeImage = async (e) => {
        setHasChosenImage(true);

        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'listycars');

        const data = await fetch('https://api.cloudinary.com/v1_1/draaoierp/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(responseData => {
          return responseData;
        })
        .catch(err => {
            console.log(err)
        });
        
        setImage(data.secure_url)
    }

    return (
        <AppLayout>
            <Container mt={16} maxW="container.xl">
                <Box pos="relative" mb={16}>
                    <Image pos="relative" src="../images/cars-add-page.jpg" />
                    <Heading size={{ base: '2xl', md: '3xl' }} color="white" pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">List a Car</Heading>
                </Box>    
                <Text mb={2} fontWeight="bold">Car Name</Text>
                <Input 
                    placeholder="Enter car name"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setName(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Car Brand</Text>
                <Input 
                    placeholder="Enter car brand"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setBrand(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Year bought</Text>
                <Input 
                    placeholder="Enter year bought"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setYear(safeParseFloat(e.target.value))}
                    min="1970"
                    max="2022"
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Description</Text>
                <Textarea  
                    placeholder="Enter description"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setDescription(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Upload Image</Text>
                <Input
                    type="file"
                    onChange={onChangeImage}
                    mb={6} />
                {
                    (image === "" && hasChosenImage === true) ? 
                    <VStack justify="center" height={200}>
                        <Spinner size='xl' color='yellow.500' />
                    </VStack> : null
                }
                {
                    image &&
                        <Image src={image} crossOrigin="anonymous" w="full" mb={6} />
                }
                <Button
                    size="md"
                    rounded="full"
                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                    bg="yellow.500"
                    color="white"
                    onClick={listCar}
                    mb={8}>
                    List Car
                </Button>
            </Container>  
        </AppLayout>  
    )
}
