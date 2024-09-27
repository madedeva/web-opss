'use client';
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import HeadNav from '../components/HomePage/Head';
import Header from '../components/HomePage/Header';
import Footer from '../components/HomePage/Footer';

export default function Documentation() {
  return (
    <SessionProvider>
      <div>
        <HeadNav />
        <Header />

        <main>
          {/* Hero Section */}
          <section className="bg-blue-950 text-white text-center py-24">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-5xl font-bold mb-6">OPSS Documentation</h1>
              <p className="mb-10 text-lg">
                Discover how to get started, integrate, and fully utilize the OPSS platform. Comprehensive guides and references for users and developers.
              </p>
              <a href="#get-started" className="px-6 py-3 bg-white text-blue-950 font-bold rounded-full shadow-md hover:bg-gray-200 transition-all">
                Get Started
              </a>
            </div>
          </section>

          {/* Introduction Section */}
          <section id="get-started" className="py-20 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12">Introduction</h2>
              <p className="text-center text-lg max-w-2xl mx-auto mb-12">
                OPSS (Online Paper Submission System) is a comprehensive platform designed to streamline paper submission and conference management. In this documentation, you will find all necessary resources to help you navigate through the platform.
              </p>
            </div>
          </section>

          {/* Key Sections */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="shadow-lg p-8 rounded bg-blue-100">
                  <h3 className="text-xl font-bold mb-4">Conference Setup Guide</h3>
                  <p className="mb-6">
                    Learn how to set up your conference, including configuring key details, managing submissions, and inviting reviewers.
                  </p>
                  <a href="/conference-setup-guide.pdf" download className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Download User Guide
                  </a>
                </div>
                <div className="shadow-lg p-8 rounded bg-green-100">
                  <h3 className="text-xl font-bold mb-4">Submission Workflow</h3>
                  <p className="mb-6">
                    Get a detailed guide on optimizing the paper submission process, from submission to review and final decision.
                  </p>
                  <a href="/submission-workflow-guide.pdf" download className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Download User Guide
                  </a>
                </div>
                <div className="shadow-lg p-8 rounded bg-yellow-100">
                  <h3 className="text-xl font-bold mb-4">Reviewer Guidelines</h3>
                  <p className="mb-6">
                    Understand how to manage paper reviews, assign reviewers, and track feedback efficiently throughout the conference.
                  </p>
                  <a href="/reviewer-guidelines.pdf" download className="inline-block bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Download User Guide
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-4">
                    <img src="https://img.icons8.com/ios/452/document.png" alt="Paper Submission" className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Easy Paper Submission</h3>
                  <p>Submit your research papers quickly and efficiently using our intuitive submission interface.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-4">
                    <img src="https://img.icons8.com/ios/452/meeting-room.png" alt="Conference Management" className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Conference Management</h3>
                  <p>Manage all aspects of your conference, from reviewer assignments to paper acceptance and more.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-4">
                    <img src="https://img.icons8.com/ios/452/reviewer-female.png" alt="Paper Review" className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Comprehensive Paper Review</h3>
                  <p>Streamline the review process by easily assigning reviewers and tracking paper evaluations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section with Accordion */}
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <Accordion />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
}

// Accordion Component
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I register an account?',
      answer: 'To register, click the “Sign In” button on the homepage, provide your details, and you will be redirected to the Sign In page to log into the system.',
    },
    {
      question: 'How do I submit a paper?',
      answer: 'Once logged in, navigate to the "Available Conferences" section or click on the conference details and submit via the submit paper button or via the link. Follow the instructions and upload your research paper in the required format.',
    },
    {
      question: 'Can I assign reviewers to papers?',
      answer: 'Yes, if you are a conference manager, you can assign reviewers to submitted papers through the dashboard panel.',
    },
    {
      question: 'How can I track my submission status?',
      answer: 'After submitting your paper, you can check its status on your dashboard, where updates on reviews and decisions will be posted.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b">
          <button
            className="w-full text-left py-4 text-lg font-semibold flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            {faq.question}
            <span>{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="pl-4 pb-4 text-gray-600">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
