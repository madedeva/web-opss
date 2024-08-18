'use client';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import HeadNav from '../../components/HomePage/Head';
import Header from '../../components/HomePage/Header';
import Footer from '../../components/HomePage/Footer';
import { Conference } from '@prisma/client';

const ConferenceDetail = ({params}: {params: {slug: string}}) => {

  const [loading, setLoading ] = useState(false);
  const [conference, setConference] = useState<Conference>();

    const fetchPapers = async () => {
        try {
            const response = await fetch(`/api/slug-conferences/${params.slug}`);
            if (response.ok) {
                const data = await response.json();
                setConference(data);
            } else {
                console.error('Failed to fetch papers:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    useEffect(() => {
    
        fetchPapers();
    }, []);

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
    <SessionProvider>
      <div>
        <HeadNav />

        <Header />

        <main>
        {/* https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D */}
          <section className="bg-cover bg-center text-center py-32" style={{
            backgroundImage: `url("${conference?.banner}")`,
          }}>
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold text-white">Manage Your Conference with Online Paper Submission System (OPSS)</h1>
              <p className="text-white mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Conference Description</h2>
              <hr className="w-1/5 mx-auto my-4" />
              {conference?.description}
              {/* <p className="mb-4 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="mb-4 max-w-2xl mx-auto">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
            </div>
          </section>

          <section className="py-20 bg-white text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Organizer Information</h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p>City/Country: {conference?.city}</p>
              <p>Institution: {conference?.institution}</p>
              <p>Venue: {conference?.venue}</p>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Important Dates</h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p>Conference Date Start: {conference?.startDate.toString()}</p>
              <p>Conference Date End: {conference?.endDate.toString()}</p>
              <p>Submission Deadline: {conference?.submission_deadlineEnd.toString()}</p>
            </div>
          </section>

          <section className="py-20 bg-white text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Available Topics</h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p>Topics: {conference?.topic}</p>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Payment Information</h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p className="max-w-2xl mx-auto">{conference?.payment_info}</p>
            </div>
          </section>

          <section className="py-20 bg-white text-gray-700">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p>Email: {conference?.email}</p>
              <p>Address: {conference?.address}</p>
              <p>Paper Template: <a download href={"/uploads/paper_template/" + conference?.paper_template} className="text-blue-950 hover:underline">Download paper template</a></p>
              <p>Register Conference: <a href="/dashboard/" className="text-blue-950 hover:underline">Click to register</a></p>
            </div>
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
    </SessionProvider>
  );
};

export default ConferenceDetail;
