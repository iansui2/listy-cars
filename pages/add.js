import { Box, Heading, Container, Image, VStack, Text, Input, Textarea, Button, Spinner, Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react'
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
    const [missingFields, setMissingFields] = useState([])
    const [hasChosenImage, setHasChosenImage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        checkMissingFields();
    }, [name, brand, year, description, image])

    const listCar = () => {
        if (name !== "" && brand !== "" && year !== "" && description !== "" && image !== "") {
            let data = new FormData();
            data.append('name', name);
            data.append('brand', brand);
            data.append('year', year);
            data.append('description', description);
            data.append('image', image);

            fetch(`${process.env.NEXT_PUBLIC_REACT_APP_CARS_URL}/listCar`, {
                method: "POST",
                body: data
            })
            .then((result) => {
                console.log(result);
                Swal.fire(
                    'Success!',
                    'Car is listed succesfully!',
                    'success'
                ).then(() => router.push("/"))
            })
            .catch((error) => {
                console.log(error);
                console.error(error.stack);
            });
        } else {
            Swal.fire(
                '',
                `Please fill up the form!`,
                'error'
            )
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

    const checkMissingFields = () => {
        let missing = [];
        if (name === "") {
            missing.push("Name");
        }
        if (brand === "") {
            missing.push("Brand");
        }
        if (year === 0) {
            missing.push("Year");
        }
        if (description === "") {
            missing.push("Description");
        }
        if (image === "") {
            missing.push("Image");
        }
        setMissingFields(missing);
    }

    return (
        <AppLayout>
            <Container mt={16} maxW="container.xl">
                <Box pos="relative" mb={8}>
                    <Image pos="relative" src="../images/cars-add-page.jpg" alt="Add Page" />
                    <Heading size={{ base: '2xl', md: '3xl' }} color="white" pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">List a Car</Heading>
                </Box>    
                {
                    missingFields.length > 0 &&
                        <Alert status='error' mb={8}>
                            <AlertIcon />
                            <AlertTitle>The following fields are required, please fill them up!</AlertTitle>
                            <AlertDescription>{missingFields.join(", ")}</AlertDescription>
                        </Alert>
                }
                <Text mb={2} fontWeight="bold">Car Name <span style={{ color: 'red' }}>*</span></Text>
                <Input 
                    placeholder="Enter car name"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setName(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Car Brand <span style={{ color: 'red' }}>*</span></Text>
                <Input 
                    placeholder="Enter car brand"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setBrand(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Year Bought <span style={{ color: 'red' }}>*</span></Text>
                <Input 
                    placeholder="Enter Year Bought"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setYear(safeParseFloat(e.target.value))}
                    type="number"
                    min="1970"
                    max="2022"
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Description <span style={{ color: 'red' }}>*</span></Text>
                <Textarea  
                    placeholder="Enter description"
                    focusBorderColor="yellow.500"
                    onChange={(e) => setDescription(e.target.value)}
                    mb={6}
                />
                <Text mb={2} fontWeight="bold">Upload Image <span style={{ color: 'red' }}>*</span></Text>
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
                        <Image src={image} alt="Car" crossOrigin="anonymous" w="full" mb={6} />
                }
                <Button
                    size="md"
                    rounded="full"
                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                    bg="yellow.500"
                    color="white"
                    disabled={
                        name === "" || brand === "" || year === 0 || description === "" || image === ""
                    }
                    onClick={listCar}
                    mb={8}>
                    List Car
                </Button>
            </Container>  
        </AppLayout>  
    )
}
