import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import AddConference from "../conference/addConference";


const Reviewer =  async () => {

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewer</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
          <div className="mt-4">
            <AddConference />
          </div>
          <table className="table-auto min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2">Reviewer Name</th>
                <th className="py-2">Institution</th>
                <th className="py-2">Email</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700">
                <td className="py-2">Prof. Deva Kerti Wijaya</td>
                <td className="py-2">Universitas Pendidikan Ganesha</td>
                <td className="py-2">deva.kerti@undiksha.ac.id</td>
                <td className="py-2">
                    Delete
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default Reviewer