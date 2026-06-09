"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pricingPlans } from "@/app/services/web-design/_config/pricing";

const STATUS_OPTIONS = ["PENDING", "REVIEWED", "IN_PROGRESS", "COMPLETED"];

const STATUS_BADGE_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
};

const PACKAGE_PRICES = pricingPlans.reduce((prices, plan) => {
  prices[plan.id] = Number(plan.price.replace(/\D/g, ""));
  return prices;
}, {});

const formatStatusLabel = (status) => status.replace("_", " ");

const normalizeWhatsAppNumber = (number = "") => {
  const digits = number.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [deletingOrderId, setDeletingOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    try {
      setError("");
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Could not load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, [fetchOrders]);

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const completed = orders.filter((o) => o.status === "COMPLETED").length;
    const totalRevenue = orders.reduce((sum, order) => {
      if (order.status !== "COMPLETED") {
        return sum;
      }

      return sum + (PACKAGE_PRICES[order.paket] || 0);
    }, 0);

    return {
      total: orders.length,
      pending,
      completed,
      totalRevenue,
    };
  }, [orders]);

  const updateStatus = async (orderId, status) => {
    if (!STATUS_OPTIONS.includes(status)) {
      alert("Invalid order status");
      return;
    }

    try {
      setUpdatingOrderId(orderId);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (response.ok) {
        await fetchOrders();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setUpdatingOrderId("");
    }
  };

  const deleteOrder = async (order) => {
    const confirmed = window.confirm(
      `Delete order ${order.invoiceNumber}? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingOrderId(order.id);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: order.id }),
      });

      if (response.ok) {
        if (selectedOrder?.id === order.id) {
          setSelectedOrder(null);
        }
        await fetchOrders();
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order");
    } finally {
      setDeletingOrderId("");
    }
  };

  const getStatusBadgeColor = (status) => {
    return STATUS_BADGE_COLORS[status] || "bg-gray-100 text-gray-800";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage website orders</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="p-8">
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              onClick={fetchOrders}
              className="font-medium text-red-800 hover:text-red-950"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-black">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-black">
              {formatPrice(stats.totalRevenue)}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">All Orders</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm">
                        {order.invoiceNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {order.nama}
                      </div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                      <div className="text-xs text-gray-400">{order.wa}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs">
                        {order.paket}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updatingOrderId === order.id}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusBadgeColor(order.status)} border-0 focus:ring-2 focus:ring-black`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {formatStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          disabled={deletingOrderId === order.id}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                        <a
                          href={`https://wa.me/${normalizeWhatsAppNumber(order.wa)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => deleteOrder(order)}
                          disabled={deletingOrderId === order.id}
                          className="text-red-600 hover:text-red-800 disabled:text-red-300 text-sm"
                        >
                          {deletingOrderId === order.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders yet</p>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={Boolean(selectedOrder)}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.invoiceNumber || "Selected order"}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Customer</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.nama}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">
                    {formatStatusLabel(selectedOrder.status)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 break-all">
                    {selectedOrder.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">WhatsApp</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.wa}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Package</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {selectedOrder.paket}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(PACKAGE_PRICES[selectedOrder.paket] || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Style</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.style}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Pages</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.halaman}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Palette</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.palette}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Payment</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.paymentStatus || "UNPAID"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500">Mood</p>
                <p className="font-medium text-gray-900">
                  {selectedOrder.mood?.length
                    ? selectedOrder.mood.join(", ")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Notes</p>
                <p className="whitespace-pre-wrap font-medium text-gray-900">
                  {selectedOrder.referensi || "-"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
