import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";

const Users = () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="mt-4">
            <h1 className="text-lg font-semibold text-gray-800">Users Page</h1>
        </div>
    </DashboardLayout>
    )
};

export default Users