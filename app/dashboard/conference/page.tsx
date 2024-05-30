import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";

const Conference = () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="mt-4">
            <h1 className="text-lg font-semibold text-gray-800">Conference Page</h1>
        </div>
    </DashboardLayout>
    )
};

export default Conference