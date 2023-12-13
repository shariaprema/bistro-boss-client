import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} =  useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments=[]} = useQuery({
        queryKey:['payments', user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data 
        }
    })
    return (
        <div>
            <h2 className="text-4xl">Total Payments:{payments.length}</h2>

            <div>
            <div className="overflow-x-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                <tr className="bg-orange-400">
                    <th>#</th>
                    <th>Email</th>
                    <th>Transaction Id</th>
                    <th>Total Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment, index)=><tr key={payment._id}
                     className="bg-base-200">
                    <th>{index+1}</th>
                    <td>{payment.email}</td>
                    <td>{payment.transactionId}</td>
                    <td>${payment.price}</td>
                    <td>{payment.status}</td>
                </tr>)}
                
                </tbody>
            </table>
            </div>
            </div>
            
        </div>
    );
};

export default PaymentHistory;