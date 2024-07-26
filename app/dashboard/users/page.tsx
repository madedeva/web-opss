import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import AddConference from "../conference/addConference";

const Users = () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Conferences</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Create Conference</button>
          </div>
          <table className="table-auto min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2">Conference Name</th>
                <th className="py-2">Conference Date</th>
                <th className="py-2">Submission Deadline</th>
                <th className="py-2">Statistic</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700">
                <td className="py-2">Conference 1</td>
                <td className="py-2">
                  <p>Date Start: February 26, 2024</p>
                  <p>Date End: April 26, 2024</p>
                </td>
                <td className="py-2">
                    <p>Full Paper Submission</p>
                    <p>January 26, 2024</p>
                </td>
                <td className="py-2">
                  <p><a className="underline" href="#">Author Registered Authors - 10</a></p>
                  <p><a className="underline" href="#">Paper Submitted Paper - 10</a></p>
                </td>
                <td className="py-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Actions</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default Users