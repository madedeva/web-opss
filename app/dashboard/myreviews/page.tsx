import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";

const MyReviews = () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Reviews</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default MyReviews