import { useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethods";
import "./WidgetLarge.css";
import { format } from "timeago.js";

export default function WidgetLarge() {
  const Button = ({ type }) => {
    return <button className={"widgetLargeButton " + type}>{type}</button>;
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await userRequest.get("orders");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="widgetLarge">
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className="widgetLargeTable">
        <thead>
          <tr className="widgetLargeTr">
            <th className="widgetLargeTh">Customer</th>
            <th className="widgetLargeTh">Date</th>
            <th className="widgetLargeTh">Amount</th>
            <th className="widgetLargeTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr className="widgetLargeTr" key={order._id}>
                <td className="widgetLargeUser">
                  {/* <img
                  src="https://images.pexels.com/photos/4929030/pexels-photo-4929030.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  alt=""
                  className="widgetLargeImage"
                /> */}
                  <span className="widgetLargeName">{order.userId}</span>
                </td>
                <td className="widgetLargeDate">{format(order.createdAt)}</td>
                <td className="widgetLargeAmount">${order.amount}</td>
                <td className="widgetLargeStatus">
                  <Button type={order.status} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
