import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import RegisterConference from "./RegisterConference";

const MyConferences = () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Conferences</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-2">
          <RegisterConference conferences={[]}/>
          </div>
          <hr className="mt-2"/>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default MyConferences