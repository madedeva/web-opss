'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import HeadNav from '../components/HomePage/Head';
import Header from '../components/HomePage/Header';
import Footer from '../components/HomePage/Footer';

export default function AboutUs() {
  return (
    <SessionProvider>
      <div>
        <HeadNav />

        <Header />

        <main>
          <section className="bg-blue-950 text-white text-center py-20">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold mb-6">About Us</h1>
              <p className="mb-12">
                Welcome to OPSS - Online Paper Submission System, where innovation meets simplicity.
              </p>
            </div>
          </section>

          <section className="py-20 text-center bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="mb-8 max-w-xl mx-auto">
                To streamline and enhance the conference management experience through cutting-edge technology and unparalleled support.
              </p>
            </div>
          </section>

          <section className="bg-white py-20">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="mb-8 max-w-xl mx-auto">
                To be the leading platform for conference management, known for our user-friendly interface and exceptional service.
              </p>
            </div>
          </section>

          <section className="bg-gray-100 py-20">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded shadow">
                  <img
                    src="/images/deva.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-4"
                    width="120"
                    height="120"
                  />
                  <h3 className="text-xl font-bold mb-2">I Made Deva Kerti Wijaya</h3>
                  <p>Mahasiswa Bimbingan</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                  <img
                    src="/images/user.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-4"
                    width="120"
                    height="120"
                  />
                  <h3 className="text-xl font-bold mb-2">Ida Bagus Nyoman Pascima, S.Pd., M.Cs.</h3>
                  <p>Dosen Pembimbing I</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                  <img
                    src="/images/user.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-4"
                    width="120"
                    height="120"
                  />
                  <h3 className="text-xl font-bold mb-2">I Gede Bendesa Subawa, S.Pd., M.Kom.</h3>
                  <p>Dosen Pembimbing II</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 text-center bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <ul className="list-none">
                <li className="mb-4">
                  <strong>Integrity:</strong> We uphold the highest standards of integrity in all of our actions.
                </li>
                <li className="mb-4">
                  <strong>Innovation:</strong> We strive for continuous innovation to drive growth and success.
                </li>
                <li>
                  <strong>Customer Commitment:</strong> We develop relationships that make a positive difference in our customers' lives.
                </li>
              </ul>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
}
