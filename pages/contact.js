import Head from 'next/head';
import { Navbar } from '@/Components/Navbar';

import { motion } from 'framer-motion';

import Container from '@mui/material/Container';
const Contact = () => {
    return (
        <main className='bg-gray-100 min-h-screen'>
            <Head>
                <title>Coming Soon</title>
            </Head>
            <Navbar />
            <Container maxWidth="md" className="text-center p-8">
                <motion.div
                    className='font-semibold text-2xl'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >COMING SOON</motion.div>
            </Container>
        </main>
    )
}
export default Contact;