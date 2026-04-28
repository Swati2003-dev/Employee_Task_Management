import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientProfileModal from "../../components/Client/ClientProfileModal";

// Icons (same look as Kuber template)
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
    <line x1="15" y1="3" x2="15" y2="21"></line>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="3" y1="15" x2="21" y2="15"></line>
  </svg>
);

const WalletIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
    <path d="M16 11h4v2h-4z"></path>
  </svg>
);

const ClipboardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="2" width="6" height="4" rx="1"></rect>
    <path d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path>
  </svg>
);

const AttachmentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24l-9.19 9.19a1 1 0 0 1-1.41-1.41l9.19-9.19"></path>
  </svg>
);

const NotesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3h18v14H10l-4 4v-4H3z"></path>
  </svg>
);

// Seed data similar to Kuber "All Clients" list
const initialClients = [
  {
    id: 1,
    clientId: "CL-0001",
    name: "Ashton Cox",
    avatar: "https://i.pravatar.cc/150?u=1",
    mobile: "1234567890",
    email: "test@email.com",
    company: "ABC Infotech",
    currency: "euro",
    billing: "Hourly User Rate",
    contactPerson: "John Doe",
    contactPhone: "1234567892",
    status: "Active",
    address: "123 Main St",
    notes: "",
  },
  {
    id: 2,
    clientId: "CL-0002",
    name: "Sarah Smith",
    avatar: "https://i.pravatar.cc/150?u=2",
    mobile: "1234567890",
    email: "test@email.com",
    company: "XYZ Software",
    currency: "euro",
    billing: "Fixed Price",
    contactPerson: "Jane Smith",
    contactPhone: "2345678901",
    status: "Inactive",
    address: "456 Elm St",
    notes: "",
  },
];

const Client = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Fetch Clients from Backend
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Filter only CLIENTS for this page
        const mappedData = data
          .filter(u => u && u.role === 'CLIENT')
          .map(u => ({
            ...u,
            id: u._id,
            clientId: u.userId
          }));
        setClients(mappedData);
      } else {
        console.error("Backend did not return an array:", data);
        setClients([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchClients();
  }, []);
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    mobile: "",
    email: "",
    company: "",
    currency: "",
    billing: "",
    contactPerson: "",
    contactPhone: "",
    status: "Active",
    address: "",
    notes: "",
    contractDocuments: "",
  });

  const itemsPerPage = 10;

  const filteredClients = clients.filter(
    (client) =>
      (client.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.company?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (client.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((client) => client.id !== id));
    }
  };

  const openEdit = (client) => {
    setEditingClient(client);
    setFormData({
      clientId: client.clientId,
      name: client.name,
      mobile: client.mobile,
      email: client.email,
      company: client.company,
      currency: client.currency,
      billing: client.billing,
      contactPerson: client.contactPerson,
      contactPhone: client.contactPhone,
      status: client.status,
      address: client.address,
      notes: client.notes || "",
      contractDocument: client.contractDocument || "",
    });
    setShowModal(true);
  };

  const openAdd = () => {
    const nextId = Math.max(0, ...clients.map((c) => c.id)) + 1;
    const nextClientId = `CL-${String(nextId).padStart(4, "0")}`;
    setEditingClient(null);
    setFormData({
      clientId: nextClientId,
      name: "",
      mobile: "",
      email: "",
      company: "",
      currency: "",
      billing: "",
      contactPerson: "",
      contactPhone: "",
      status: "Active",
      address: "",
      notes: "",
      contractDocument: "",
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // const openProfileModal = (client) => {
  //   setSelectedClientProfile(client);
  //   setShowProfileModal(true);
  // };

  // const closeProfileModal = () => setShowProfileModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      contractDocument: {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      },
    }));
  };


  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.clientId) {
      alert("Name, Email and Client ID are required");
      return;
    }

    try {
      if (editingClient) {
        // Update logic (to be implemented on backend)
        setClients((prev) =>
          prev.map((c) =>
            c._id === editingClient._id ? { ...c, ...formData } : c
          )
        );
      } else {
        // Create New Client via API
        const response = await fetch("http://localhost:3000/api/users/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            userId: formData.clientId,
            role: "CLIENT"
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Client created successfully! Email with credentials simulated in console.");
          fetchClients(); // Refresh list
        } else {
          alert(data.message || "Failed to create client");
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving client:", error);
      alert("Error saving client");
    }
  };

  const handleViewDocument = (doc) => {
    if (!doc) {
      alert("No contract document uploaded");
      return;
    }
    if (typeof doc === "string") {
      window.open(doc, "_blank");
    } else {
      const url = URL.createObjectURL(doc);
      window.open(url, "_blank");
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4 py-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page heading */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
            All Clients
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Manage and track all of your client records
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 overflow-hidden border border-slate-200/60">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-slate-800 text-base">
                Clients
              </span>

              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 w-full sm:w-72 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <span className="text-slate-400 mr-2">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Search by name, company, email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition"
                title="Add Client"
                onClick={openAdd}
              >
                <PlusIcon />
                <span className="hidden sm:inline">Add Client</span>
              </button>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 hover:shadow-sm transition"
                title="Refresh"
                onClick={() => window.location.reload()}
              >
                <RefreshIcon />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[1100px] w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-3 text-left">Client ID</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                  <th className="px-4 py-3 text-left">Mobile</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Currency</th>
                  <th className="px-4 py-3 text-left">Billing</th>
                  <th className="px-4 py-3 text-left">Contact Person</th>
                  <th className="px-4 py-3 text-left">Contact Phone</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Contract</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={14} className="px-4 py-8 text-center text-slate-500 italic">
                      Loading clients...
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => navigate(`/super-admin/client/${client.id}`, { state: { clientData: client } })}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {client.clientId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
                          >
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="text-indigo-500">
                            <PhoneIcon />
                          </span>
                          {client.mobile}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="text-indigo-500">
                            <MailIcon />
                          </span>
                          {client.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {client.company}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {client.currency}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {client.billing}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {client.contactPerson}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {client.contactPhone}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${client.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        {client.contractDocument ? (
                          <button
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 text-emerald-700 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-200 transition"
                            onClick={() => handleViewDocument(client.contractDocument.file)}
                          >
                            <FileTextIcon />
                            View
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">No File</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="text-indigo-500">
                            <MapPinIcon />
                          </span>
                          {client.address && client.address.length > 18
                            ? client.address.substring(0, 15) + "..."
                            : client.address || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition shadow-sm"
                            title="Edit"
                            onClick={() => openEdit(client)}
                          >
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition shadow-sm"
                            title="Delete"
                            onClick={() => handleDelete(client.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={14}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-200 bg-slate-50">
            <div className="text-xs sm:text-sm text-slate-500">
              Showing {indexOfFirstItem + 1}–
              {Math.min(indexOfLastItem, filteredClients.length)} of{" "}
              {filteredClients.length} clients
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg border ${currentPage === page
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-white border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
                      }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-amber-50">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
                <div className="flex-1 font-semibold text-slate-800">
                  {editingClient ? "Edit Client" : "New Client"}
                </div>
                <button
                  className="text-slate-500 hover:text-slate-700 text-xl"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client ID */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <ClipboardIcon />
                      Client ID
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <UserIcon />
                      Name
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <PhoneIcon />
                      Mobile
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <MailIcon />
                      Email
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <BuildingIcon />
                      Company Name
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <WalletIcon />
                      Currency
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800 bg-transparent"
                      >
                        <option value="">Select</option>
                        <option value="euro">euro</option>
                        <option value="rupee">rupee</option>
                        <option value="dollar">dollar</option>
                        <option value="pound">pound</option>
                        <option value="ruble">ruble</option>
                      </select>
                    </div>
                  </div>

                  {/* Billing */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <ClipboardIcon />
                      Billing Method
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <select
                        name="billing"
                        value={formData.billing}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800 bg-transparent"
                      >
                        <option value="">Select</option>
                        <option value="Hourly User Rate">
                          Hourly User Rate
                        </option>
                        <option value="Hourly Job Rate">Hourly Job Rate</option>
                        <option value="Fixed Price">Fixed Price</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <UserIcon />
                      Contact Person
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <PhoneIcon />
                      Contact Phone
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <ClipboardIcon />
                      Status
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800 bg-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Contract Document */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <AttachmentIcon />
                      Contract Document
                    </label>
                    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <input
                        type="file"
                        name="contractDocument"
                        onChange={handleFileChange}
                        className="w-full text-sm text-slate-800"
                      />
                    </div>
                    {formData.contractDocument &&
                      typeof formData.contractDocument !== "string" && (
                        <p className="text-xs text-slate-500 mt-1">
                          {formData.contractDocument.name}
                        </p>
                      )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <NotesIcon />
                      Notes
                    </label>
                    <div className="flex items-start gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800 resize-y"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <MapPinIcon />
                      Address
                    </label>
                    <div className="flex items-start gap-2 border-2 border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                      <textarea
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full outline-none text-sm text-slate-800 resize-y"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button
                  className="inline-flex items-center rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50"
                  onClick={handleSave}
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.company ||
                    !formData.mobile
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;