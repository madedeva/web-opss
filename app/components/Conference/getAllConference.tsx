'use client';
import { Conference, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageUrls = [
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
];

const getRandomImageUrl = () => {
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

const GetAllConference = () => {

    const getAllConference = async () => {

        // get conference only 6 lastest
        const res = await prisma.conference.findMany({
            take: 8,
        });

        return res;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {getAllConference().then((conferences) => conferences.map((conference) => (
            <a 
                key={conference.id}
                href="/conference-detail"
                className="bg-white text-black p-4 rounded block hover:bg-gray-100 transition duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                <img
                src={getRandomImageUrl()}
                alt="Conference"
                className="rounded w-full"
                />
                <h3 className="text-xl mt-4">{conference.name}</h3>
                <hr className="mt-4 mb-4"/>
                <p className="mt-2">Start Date: {new Date(conference.startDate).toLocaleDateString()} | End Date: {new Date(conference.endDate).toLocaleDateString()}</p>
                <p className="mt-2">Submission Deadline: {new Date(conference.submission_deadline).toLocaleDateString()}</p>
                <p>{conference.city}, {conference.country}</p>
            </a>
        )))}
        </div>
    )
};

export default GetAllConference;

