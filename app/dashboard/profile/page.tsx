import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";
import Form from "./form";

const Profile = () => {
  return (
    <DashboardLayout>
      <WelcomeCard />

      <div className="bg-white p-6 rounded-lg mt-4 shadow-md">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2" />
          <Form />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
