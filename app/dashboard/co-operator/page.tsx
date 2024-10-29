'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import 'react-toastify/dist/ReactToastify.css';
import AddCoOperator from "./addCoOperator";

type UserConferenceProps = {
  userId: number;
}

const CoOperator: React.FC<UserConferenceProps> = ({userId}) => {
  
  return (
    <DashboardLayout>
      <AddCoOperator userId={userId}/>
    </DashboardLayout>
  );
};

export default CoOperator;
