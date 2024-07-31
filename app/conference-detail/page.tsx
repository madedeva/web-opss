'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/HomePage/Header';
import Footer from '../components/HomePage/Footer';
import HeadNav from '../components/HomePage/Head';
import GetAllConference from '../components/Conference/getAllConference';

    const ConferenceDetail = () => {

        const scrollToSection = (id: string) => {
            const element = document.getElementById(id);
            if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top: element.offsetTop,
            });
            }
        };

        const [showScroll, setShowScroll] = useState(false);

        useEffect(() => {
            if (typeof window !== 'undefined') {
              window.addEventListener('scroll', checkScrollTop);
              return () => window.removeEventListener('scroll', checkScrollTop);
            }
        }, []);

        const checkScrollTop = () => {
            if (typeof window !== 'undefined' && window.pageYOffset > 400) {
              setShowScroll(true);
            } else {
              setShowScroll(false);
            }
        };

        const scrollToTop = () => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowScroll(false);
            }
        };

        const openVideo = () => {
            const url = 'https://www.youtube.com/watch?v=J5U5of0jBog';
            if (typeof window !== 'undefined' && url) {
              window.open(url, '_blank');
            }
        };

    return (
        <div>
        
        <HeadNav />

        <Header />
        <div className="text-center bg-cover bg-center py-32" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            }}>
                <h2 className="text-4xl font-bold text-white">Manage Your Conference with Online Paper Submission System (OPSS)</h2>
                <p className="text-white mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
        </div>

        <main className="container mx-auto my-8 text-center">
            
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Conference Description</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Organizer Informations</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>City/Country: Singaraja, Indonesia</p>
                <p>Institution: Universitas Pendidikan Ganesha</p>
                <p>Venue: Universitas Pendidikan Ganesha</p>
            </section>
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Important Dates</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>Conference Date Start: January 26, 2024</p>
                <p>Conference Date End: February 26, 2024</p>
                <p>Submission Deadline: February 14, 2024</p>
            </section>
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Available Topics</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>Topic: Example Topic 1, Example Topic 2, Example Topic 3</p>
            </section>
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Payment Informations</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <section className="my-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Contact Informations</h2>
                <hr style={{ width: '40%', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid', height: '1px' }} />
                <p>Email: deva.kerti@undiksha.ac.id</p>
                <p>Address: Jl. Udayana No.11, Banjar Tegal, Singaraja, Kabupaten Buleleng, Bali 81116</p>
                <p>Paper Template: <a href="#" className="text-blue-500 hover:underline">Download paper template</a></p>
                <p>Register Conference: <a href="#" className="text-blue-500 hover:underline">Click to register</a></p>
            </section>
        </main>

            <Footer />

            {showScroll && (
                <button
                className="fixed bottom-6 right-8 bg-orange-500 opacity-50 text-white py-2 px-2 rounded flex items-center"
                onClick={scrollToTop}
                >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            )}
        </div>
        );
    }

    export default ConferenceDetail
