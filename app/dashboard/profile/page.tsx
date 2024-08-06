import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";

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
          <form>
            <h2 className="text-xl font-semibold mb-4 mt-4">Profile Information</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input type="text" className="block w-full p-2 border bg-white rounded" value=""/>
                </div>
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input type="email" className="block w-full p-2 border bg-white rounded" value=""/>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">Current Password<p className="text-red-600">*</p></label>
                    <input type="password" className="block w-full p-2 border bg-white rounded"/>
                </div>
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">New Password<p className="text-red-600">*</p></label>
                    <input type="password" className="block w-full p-2 border bg-white rounded"/>
                </div>
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">Confirm Password<p className="text-red-600">*</p></label>
                    <input type="password" className="block w-full p-2 border bg-white rounded"/>
                </div>
            </div>
            <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
