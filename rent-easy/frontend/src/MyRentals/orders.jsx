import React from "react";
import TabBar from "./tabBar";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

const STATUS_STEPS = ["confirmed", "processing", "shipped", "out_for_delivery"];

const STATUS_META = {
  confirmed: { label: "Order Confirmed", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-100" },
  processing: { label: "Processing", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100" },
  shipped: { label: "Shipped", icon: Package, color: "text-orange-500", bg: "bg-orange-100" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "text-green-500", bg: "bg-green-100" },
};

export default function Orders({ orders = [] }) {
  return (
    <>
      <TabBar />
      <div className="p-4 w-full max-w-4xl mx-auto space-y-4">
        {orders.length === 0 ? (
          <div className="text-center text-gray-400 py-16">No active orders</div>
        ) : (
          orders.map((order, i) => <OrderCard key={i} order={order} />)
        )}
      </div>
    </>
  );
}

function OrderCard({ order }) {
  const meta = STATUS_META[order.status] || STATUS_META.confirmed;
  const currentStep = STATUS_STEPS.indexOf(order.status);
  const Icon = meta.icon;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={order.product?.img || order.product?.imgs?.[0]}
            alt={order.product?.title}
            className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-gray-800 text-base">{order.product?.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{order.tenure} months · ₹{order.totalRent}</p>
            {order.deliveryDate && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <MapPin size={11} /> Expected: {new Date(order.deliveryDate).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>
        </div>

        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.color} flex-shrink-0`}>
          <Icon size={13} />
          {meta.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          {STATUS_STEPS.map((step, i) => {
            const done = i <= currentStep;
            const StepIcon = STATUS_META[step].icon;
            return (
              <div key={step} className="flex flex-col items-center gap-1 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300"} transition-all`}>
                  <StepIcon size={15} />
                </div>
                <span className={`text-[10px] text-center ${done ? "text-green-600 font-medium" : "text-gray-400"}`}>
                  {STATUS_META[step].label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connector line */}
        <div className="flex items-center px-4 -mt-6 mb-2">
          {STATUS_STEPS.map((_, i) =>
            i < STATUS_STEPS.length - 1 ? (
              <div
                key={i}
                className={`flex-1 h-0.5 mx-1 rounded ${i < currentStep ? "bg-green-400" : "bg-gray-200"}`}
              />
            ) : null
          )}
        </div>
      </div>

      {/* Address */}
      {order.address && (
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="font-semibold text-gray-700">Delivering to: </span>
          {order.address.fullname}, {order.address.addressline1}, {order.address.city} - {order.address.pincode}
        </div>
      )}
    </div>
  );
}