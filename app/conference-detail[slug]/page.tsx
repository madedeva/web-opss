
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const prisma = new PrismaClient();

interface ConferenceDetailProps {
    conference: {
        name: string;
        banner: string | null;
        startDate: string;
        submission_deadlineEnd: string;
        city: string;
        country: string;
        description: string;
    };
}

const getFormattedDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
};

const ConferenceDetail = ({ conference }: ConferenceDetailProps) => {
    if (!conference) {
        return <p>Conference not found</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{conference.name}</h1>
            {conference.banner && (
                <Image 
                    src={`/uploads/banner/${conference.banner}`} 
                    alt={conference.name} 
                    width={1200} 
                    height={600}
                    className="rounded w-full"
                />
            )}
            <p className="text-gray-500 mt-4">{conference.description}</p>
            <div className="mt-6">
                <p><strong>Start Date:</strong> {getFormattedDate(conference.startDate)}</p>
                <p><strong>Submission Deadline:</strong> {getFormattedDate(conference.submission_deadlineEnd)}</p>
                <p><strong>Location:</strong> {conference.city}, {conference.country}</p>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;
    const conference = await prisma.conference.findUnique({
        where: {
            slug: String(slug),
        },
    });

    return {
        props: {
            conference: conference || null,
        },
    };
};

export default ConferenceDetail;
