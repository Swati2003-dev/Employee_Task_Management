import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Users,
    ChevronDown,
    ChevronUp,
    Filter,
    X,
    Upload,
    ArrowLeft,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Building,
    CreditCard,
    Briefcase,
    Save,
    Pencil,
    Trash2,
    CheckCircle,
    PieChart,
    Thermometer,
    Coffee,
    Star
} from "lucide-react";
import { useLocation } from "react-router-dom";

// --- Mock Data (Shared) ---
const mockUsers = [
    {
        firstName: "Susmita",
        lastName: "Parida",
        email: "parida7326@gmail.com",
        mobile: "07325817333",
        role: "Software Engineer",
        dept: "Engineering",
        dob: "1995-05-15",
        gender: "Female",
        streetAddress: "123 Tech Park",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        employeeId: "EMP001",
        joiningDate: "2023-01-10",
        bankName: "HDFC",
        accountNumber: "1234567890",
        employeeType: "Full Time"
    },
    {
        firstName: "Lokesh",
        lastName: "Bhat",
        email: "lokeshbhat.85@gmail.com",
        mobile: "9876543210",
        role: "Product Manager",
        dept: "Product",
        dob: "1990-08-20",
        gender: "Male",
        streetAddress: "456 Innovation Rd",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        employeeId: "EMP002",
        joiningDate: "2022-05-15",
        bankName: "SBI",
        accountNumber: "0987654321",
    },
    {
        firstName: "Deepa",
        lastName: "Mahajan",
        email: "deepa.mahajan@rediffmail.com",
        mobile: "8765432109",
        role: "HR Manager",
        dept: "HR",
        dob: "1988-12-10",
        gender: "Female",
        streetAddress: "789 Corporate Blvd",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110001",
        employeeId: "EMP003",
        joiningDate: "2021-11-20",
        bankName: "ICICI",
        accountNumber: "1122334455"
    }
];

// --- Components matching the Design Image ---

const CustomInput = ({ label, name, value, onChange, type = "text", placeholder, required = false, className = "", icon: Icon }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-sm font-semibold text-gray-700">
            {label} {required && "*"}
        </label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 bg-white"
            />
            {Icon && type !== "date" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon size={18} />
                </div>
            )}
        </div>
    </div>
);

const CustomSelect = ({ label, name, value, onChange, options, required = false, placeholder = "Select" }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
            {label} {required && "*"}
        </label>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 bg-white appearance-none"
            >
                <option value="">{placeholder}</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
    </div>
);

const AddEmployeeForm = ({ onClose, onSave, initialData }) => {
    const [activeTab, setActiveTab] = useState("personal");

    // Default form state to prevent crashes
    const defaultForm = {
        firstName: "", lastName: "", dob: "", gender: "", email: "", mobile: "",

        presentAddressLine: "", presentCity: "", presentState: "", presentZipCode: "",
        permanentAddressLine: "", permanentCity: "", permanentState: "", permanentZipCode: "",
        sameAsPresent: false,
        employeeId: "", dept: "", role: "", joiningDate: "", status: "Active", employeeType: "",
        bankName: "", accountNumber: "", branchName: "", ifscCode: "", bankAddress: "",
        aadharCard: "", panCard: "",
        experiences: []
    };

    const [form, setForm] = useState(initialData || defaultForm);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setForm(prev => {
            const updated = { ...prev, [name]: val };

            if (name === 'sameAsPresent' && checked) {
                updated.permanentAddressLine = updated.presentAddressLine;
                updated.permanentCity = updated.presentCity;
                updated.permanentState = updated.presentState;
                updated.permanentZipCode = updated.presentZipCode;
            }

            if (prev.sameAsPresent && name.startsWith('present')) {
                const suffix = name.replace('present', '');
                updated[`permanent${suffix}`] = val;
            }

            return updated;
        });

        if (name === "firstName") {
            if (value && value.length > 0) {
                const matches = mockUsers.filter(user =>
                    user.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
                    user.lastName.toLowerCase().startsWith(value.toLowerCase())
                );
                setSuggestions(matches);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }
    };

    const handleAddExperience = () => {
        setForm(prev => ({
            ...prev,
            experiences: [...prev.experiences, { companyName: "", designation: "", years: "", months: "" }]
        }));
    };

    const handleRemoveExperience = (index) => {
        setForm(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        setForm(prev => {
            const updated = [...prev.experiences];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, experiences: updated };
        });
    };

    const handleSelectUser = (user) => {
        setForm(prev => ({
            ...prev,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            dept: user.dept,
            dob: user.dob,
            gender: user.gender,

            presentAddressLine: user.streetAddress, // Map mock data streetAddress to presentAddress
            presentCity: user.city,
            presentState: user.state,
            presentZipCode: user.zipCode,
            permanentAddressLine: "",
            permanentCity: "",
            permanentState: "",
            permanentZipCode: "",
            sameAsPresent: false,

            employeeId: user.employeeId,
            joiningDate: user.joiningDate,
            bankName: user.bankName,
            accountNumber: user.accountNumber,
            branchName: user.branchName,
            ifscCode: user.ifscCode,
            bankAddress: user.bankAddress,
            aadharCard: user.aadharCard,
            panCard: user.panCard,
            status: "Active",
            employeeType: user.employeeType || "Full Time"
        }));
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleNext = () => {
        if (activeTab === 'personal') setActiveTab('professional');
        else if (activeTab === 'professional') setActiveTab('documents');
        else onSave(form);
    };

    const tabs = [
        { id: "personal", label: "Personal Information", icon: Users },
        { id: "professional", label: "Professional Information", icon: Briefcase },
        { id: "documents", label: "Documents & Bank", icon: Phone }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-[1200px] mx-auto space-y-6">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Employees
                </button>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm ${activeTab === tab.id
                                ? "bg-blue-100/50 text-blue-700 border border-blue-200"
                                : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
                    <div className="p-8 flex-1">
                        <div className="flex items-center gap-2 mb-8">
                            <div className={`p-2 rounded-lg ${activeTab === 'personal' ? 'text-blue-600' : 'text-gray-400'}`}>
                                {activeTab === 'personal' && <Users size={24} />}
                                {activeTab === 'professional' && <Briefcase size={24} />}
                                {activeTab === 'documents' && <Phone size={24} />}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                        </div>

                        {activeTab === 'personal' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative">
                                    <div className="relative">
                                        <CustomInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
                                        {showSuggestions && suggestions.length > 0 && (
                                            <div className="absolute z-50 left-0 right-0 top-[78px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
                                                {suggestions.map((user, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleSelectUser(user)}
                                                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-center gap-3 transition-colors"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                                            {user.firstName[0]}{user.lastName[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800 text-sm">{user.firstName} {user.lastName}</p>
                                                            <p className="text-xs text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="p-2 text-center border-t text-xs text-gray-400 bg-gray-50">
                                                    Manage addresses...
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <CustomInput label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
                                    <CustomInput label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} required type="date" placeholder="mm/dd/yyyy" icon={Calendar} />
                                    <CustomSelect label="Gender" name="gender" value={form.gender} onChange={handleChange} required options={["Male", "Female", "Other"]} placeholder="Select Gender" />
                                    <CustomInput label="Email Address" name="email" value={form.email} onChange={handleChange} required type="email" icon={Mail} />
                                    <CustomInput label="Phone Number" name="mobile" value={form.mobile} onChange={handleChange} required type="tel" icon={Phone} />
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Present Address Column */}
                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-gray-700">Present Address</h3>
                                            <CustomInput label="Address Line" name="presentAddressLine" value={form.presentAddressLine} onChange={handleChange} icon={MapPin} />
                                            <CustomInput label="City" name="presentCity" value={form.presentCity} onChange={handleChange} />
                                            <CustomInput label="State" name="presentState" value={form.presentState} onChange={handleChange} />
                                            <CustomInput label="ZIP Code" name="presentZipCode" value={form.presentZipCode} onChange={handleChange} />
                                        </div>

                                        {/* Permanent Address Column */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-700">Permanent Address</h3>
                                                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        name="sameAsPresent"
                                                        checked={form.sameAsPresent || false}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    Same as Present
                                                </label>
                                            </div>
                                            <CustomInput label="Address Line" name="permanentAddressLine" value={form.permanentAddressLine} onChange={handleChange} icon={MapPin} disabled={form.sameAsPresent} />
                                            <CustomInput label="City" name="permanentCity" value={form.permanentCity} onChange={handleChange} disabled={form.sameAsPresent} />
                                            <CustomInput label="State" name="permanentState" value={form.permanentState} onChange={handleChange} disabled={form.sameAsPresent} />
                                            <CustomInput label="ZIP Code" name="permanentZipCode" value={form.permanentZipCode} onChange={handleChange} disabled={form.sameAsPresent} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {activeTab === 'professional' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <CustomInput label="Employee ID" name="employeeId" value={form.employeeId} onChange={handleChange} required />
                                    <CustomSelect label="Department" name="dept" value={form.dept} onChange={handleChange} required options={["Engineering", "HR", "Sales"]} />
                                    <CustomInput label="Role" name="role" value={form.role} onChange={handleChange} required />
                                    <CustomInput label="Joining Date" name="joiningDate" value={form.joiningDate} onChange={handleChange} required type="date" />
                                    <CustomSelect label="Status" name="status" value={form.status} onChange={handleChange} required options={["Active", "Inactive", "On Leave"]} />
                                    <CustomSelect label="Employee Type" name="employeeType" value={form.employeeType} onChange={handleChange} required options={["Full Time", "Part Time", "Contract"]} placeholder="Select Type" />
                                </div>

                                {/* Previous Experience Section */}
                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-700">Previous Experience Information</h3>
                                        <button
                                            onClick={handleAddExperience}
                                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            <Plus size={16} />
                                            Add Experience
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {form.experiences.length === 0 ? (
                                            <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-center text-gray-500 text-sm italic">
                                                No previous experience added. Click "Add Experience" if applicable.
                                            </div>
                                        ) : (
                                            form.experiences.map((exp, idx) => (
                                                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group transition-all hover:border-blue-200 hover:shadow-sm">
                                                    <button
                                                        onClick={() => handleRemoveExperience(idx)}
                                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Remove Entry"
                                                    >
                                                        <X size={16} />
                                                    </button>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <CustomInput
                                                            label="Company Name"
                                                            name="companyName"
                                                            value={exp.companyName}
                                                            onChange={(e) => handleExperienceChange(idx, 'companyName', e.target.value)}
                                                            required
                                                        />
                                                        <CustomInput
                                                            label="Job Title / Designation"
                                                            name="designation"
                                                            value={exp.designation}
                                                            onChange={(e) => handleExperienceChange(idx, 'designation', e.target.value)}
                                                            required
                                                        />
                                                        <CustomInput
                                                            label="Years of Experience"
                                                            name="years"
                                                            value={exp.years}
                                                            onChange={(e) => handleExperienceChange(idx, 'years', e.target.value)}
                                                            type="number"
                                                            placeholder="e.g. 2"
                                                            required
                                                        />
                                                        <CustomInput
                                                            label="Months of Experience"
                                                            name="months"
                                                            value={exp.months}
                                                            onChange={(e) => handleExperienceChange(idx, 'months', e.target.value)}
                                                            type="number"
                                                            placeholder="e.g. 6"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Identity Card Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <CustomInput label="Aadhar Card" name="aadharCard" value={form.aadharCard} onChange={handleChange} />
                                        <CustomInput label="PAN Card" name="panCard" value={form.panCard} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Bank Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <CustomInput label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} />
                                        <CustomInput label="Bank Account Number" name="accountNumber" value={form.accountNumber} onChange={handleChange} />
                                        <CustomInput label="Bank Branch Name" name="branchName" value={form.branchName} onChange={handleChange} />
                                        <CustomInput label="IFSC Code" name="ifscCode" value={form.ifscCode} onChange={handleChange} />
                                        <CustomInput label="Address of Bank" name="bankAddress" value={form.bankAddress} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/30 rounded-b-xl">
                        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
                            <span className={activeTab === 'personal' ? 'text-blue-600 font-bold' : ''}>1. Personal Information</span>
                            <span className={activeTab === 'professional' ? 'text-blue-600 font-bold' : ''}>2. Professional Information</span>
                            <span className={activeTab === 'documents' ? 'text-blue-600 font-bold' : ''}>3. Documents & Bank</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-all shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-all shadow-md flex items-center gap-2"
                            >
                                {activeTab === 'documents' ? (
                                    <>
                                        <Save size={18} />
                                        Save Employee
                                    </>
                                ) : (
                                    <>
                                        Next
                                        <ArrowLeft size={18} className="rotate-180" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const EmployeeDetail = () => {
    const location = useLocation();
    const [view, setView] = useState("list");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            
            // Map backend fields to frontend format
            const mappedData = data
                .filter(u => u.role === 'EMPLOYEE' || u.role === 'HR')
                .map(u => {
                    const names = (u.name || "").split(" ");
                    return {
                        ...u,
                        id: u._id, // Map MongoDB _id to frontend id
                        firstName: names[0] || "",
                        lastName: names.slice(1).join(" ") || "",
                        employeeId: u.userId, // Map backend userId to frontend employeeId
                    };
                });

            setEmployees(mappedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState(null);
    const [hideSensitiveInfo, setHideSensitiveInfo] = useState(false);

    // Mock Data for Search Auto-fill (Removed local definition, using shared at top)

    const [searchForm, setSearchForm] = useState({
        employeeName: "",
        employeeId: "",
        status: "",
        include: "Current Employees Only",
        role: "",
        dept: "",
        type: "",
        gender: ""
    });

    useEffect(() => {
        if (location.state?.leader) {
            const l = location.state.leader;
            const names = l.name.split(' ');
            const firstName = names[0];
            const lastName = names.slice(1).join(' ') || "";

            // Parse projects string "A, B, C" to array of objects
            const projectList = l.project ? l.project.split(',').map(p => ({
                name: p.trim(),
                status: "In Progress", // Default status
                role: l.role // Default role
            })) : [];

            const mappedEmployee = {
                id: l.id,
                firstName: firstName,
                lastName: lastName,
                email: l.email,
                mobile: l.mobile,
                role: l.role,
                dept: l.department,
                projects: projectList,

                // Defaults for missing data
                employeeId: `EMP-${l.id}`,
                dob: "1990-01-01",
                gender: "Male",
                joiningDate: "2023-01-01",
                presentAddressLine: "N/A", presentCity: "N/A", presentState: "N/A", presentZipCode: "N/A",
                permanentAddressLine: "N/A", permanentCity: "N/A", permanentState: "N/A", permanentZipCode: "N/A",
                status: "Active",
                employeeType: "Full Time",
                aadharCard: "N/A",
                panCard: "N/A",
                bankName: "N/A",
                accountNumber: "N/A",
                ifscCode: "N/A",
                leaves: { total: 24, taken: 0, balance: 24, sick: 0, casual: 0, privilege: 0 },
                experiences: []
            };

            setSelectedEmployee(mappedEmployee);
            setHideSensitiveInfo(location.state.hideSensitiveInfo || false);
            setView("details");

            // Clear state so refresh doesn't get stuck (optional but good practice)
            window.history.replaceState({}, document.title);
        } else if (location.state?.status || location.state?.type || location.state?.dept) {
            const status = location.state?.status;
            const type = location.state?.type;
            const dept = location.state?.dept;

            setSearchForm(prev => ({
                ...prev,
                status: status || prev.status,
                type: type || prev.type,
                dept: dept || prev.dept
            }));

            // Apply filter immediately based on available state params
            const filtered = employees.filter(emp => {
                const matchesStatus = status ? emp.status === status : true;
                const matchesType = type ? emp.employeeType === type : true;
                const matchesDept = dept ? emp.dept === dept : true;

                return matchesStatus && matchesType && matchesDept;
            });
            setFilteredEmployees(filtered);

            window.history.replaceState({}, document.title)
        }
    }, [location.state, employees]);

    const [filterSuggestions, setFilterSuggestions] = useState([]);
    const [showFilterSuggestions, setShowFilterSuggestions] = useState(false);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({ ...prev, [name]: value }));

        if (name === "employeeName") {
            if (value.length > 0) {
                const matches = mockUsers.filter(user =>
                    user.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
                    user.lastName.toLowerCase().startsWith(value.toLowerCase())
                );
                setFilterSuggestions(matches);
                setShowFilterSuggestions(true);
            } else {
                setFilterSuggestions([]);
                setShowFilterSuggestions(false);
            }
        }
    };

    const handleSelectFilterUser = (user) => {
        setSearchForm({
            ...searchForm,
            employeeName: `${user.firstName} ${user.lastName}`,
            employeeId: user.employeeId,
            role: user.role,
            dept: user.dept,
            status: user.status,
            gender: user.gender,
        });
        setFilterSuggestions([]);
        setShowFilterSuggestions(false);
    };

    const handleSearch = () => {
        const filtered = employees.filter(emp => {
            const matchesName = searchForm.employeeName ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchForm.employeeName.toLowerCase()) : true;
            const matchesId = searchForm.employeeId ? emp.employeeId.toLowerCase().includes(searchForm.employeeId.toLowerCase()) : true;
            const matchesStatus = searchForm.status ? emp.status === searchForm.status : true;
            const matchesRole = searchForm.role ? emp.role === searchForm.role : true;
            const matchesDept = searchForm.dept ? emp.dept === searchForm.dept : true;
            const matchesType = searchForm.type ? emp.employeeType === searchForm.type : true;
            const matchesGender = searchForm.gender ? emp.gender === searchForm.gender : true;

            // Logic for "Include" - assuming "Current" means Active
            const matchesInclude = searchForm.include === "Current Employees Only" ? emp.status === "Active" : true;

            return matchesName && matchesId && matchesStatus && matchesRole && matchesDept && matchesInclude && matchesType && matchesGender;
        });
        setFilteredEmployees(filtered);
    };

    const handleReset = () => {
        setSearchForm({
            employeeName: "",
            employeeId: "",
            status: "",
            include: "Current Employees Only",
            role: "",
            dept: "",
            type: "",
            gender: ""
        });
        setFilteredEmployees(null);
    };

    const handleSave = async (data) => {
        try {
            if (selectedEmployee) {
                // Update logic (to be implemented on backend)
                setEmployees(prev => prev.map(e => e._id === selectedEmployee._id ? { ...data, _id: e._id } : e));
            } else {
                // Create New Employee via API
                const response = await fetch("http://localhost:3000/api/users/create-employee", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        userId: data.employeeId,
                        role: "EMPLOYEE"
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Employee created successfully! Email with credentials simulated in console.");
                    fetchEmployees(); // Refresh list
                } else {
                    alert(result.message || "Failed to create employee");
                }
            }
            setView("list");
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Error saving employee");
        }
    };

    if (view === "details" && selectedEmployee) {
        return (
            <EmployeeProfile
                employee={selectedEmployee}
                hideSensitiveInfo={hideSensitiveInfo}
                onClose={() => { setView("list"); setSelectedEmployee(null); setHideSensitiveInfo(false); }}
            />
        );
    }

    if (view === "add" || view === "edit") {
        return (
            <AddEmployeeForm
                onClose={() => { setView("list"); setSelectedEmployee(null); }}
                onSave={handleSave}
                initialData={selectedEmployee}
            />
        );
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
                    <button
                        onClick={() => { setSelectedEmployee(null); setView("add"); }}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> Add Employee
                    </button>
                </div>

                {/* Search Filter Panel */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800">Employee Information</h2>
                        <ChevronUp className="text-gray-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-semibold text-gray-700">Employee Name</label>
                            <input
                                type="text"
                                name="employeeName"
                                value={searchForm.employeeName}
                                onChange={handleSearchChange}
                                placeholder="Type..."
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                            />
                            {showFilterSuggestions && filterSuggestions.length > 0 && (
                                <div className="absolute z-50 left-0 right-0 top-[75px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                                    {filterSuggestions.map((user, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleSelectFilterUser(user)}
                                            className="p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-center gap-2"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{user.firstName} {user.lastName}</p>
                                                <p className="text-[10px] text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Employee Id</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={searchForm.employeeId}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Employment Status</label>
                            <select
                                name="status"
                                value={searchForm.status}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                            >
                                <option value="">-- Select --</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Include</label>
                            <select
                                name="include"
                                value={searchForm.include}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                            >
                                <option>Current Employees Only</option>
                                <option>All Employees</option>
                            </select>
                        </div>

                        {/* Supervisor Name removed */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Role</label>
                            <select
                                name="role"
                                value={searchForm.role}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                            >
                                <option value="">-- Select --</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="HR Manager">HR Manager</option>
                                <option value="UX Designer">UX Designer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Marketing Specialist">Marketing Specialist</option>
                                <option value="Sales Executive">Sales Executive</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <select
                                name="dept"
                                value={searchForm.dept}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                            >
                                <option value="">-- Select --</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Product">Product</option>
                                <option value="HR">HR</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={searchForm.gender}
                                onChange={handleSearchChange}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                            >
                                <option value="">-- Select --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            onClick={handleReset}
                            className="px-8 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSearch}
                            className="px-8 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-md transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Employee Table Section */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#EBFDFD] text-gray-700 font-bold">
                                <tr>
                                    <th className="px-4 py-3"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></th>
                                    <th className="px-4 py-3">Employee Name</th>
                                    <th className="px-4 py-3">Employee ID</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Dept</th>

                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Gender</th>

                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(filteredEmployees || employees).map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                onClick={() => { setSelectedEmployee(emp); setView("details"); }}
                                                className="font-semibold text-teal-600 whitespace-nowrap cursor-pointer hover:underline"
                                            >
                                                {emp.firstName} {emp.lastName}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 font-medium cursor-pointer hover:underline" onClick={() => { setSelectedEmployee(emp); setView("details"); }}>
                                            {emp.employeeId}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="truncate max-w-[120px] text-gray-600" title={emp.role}>{emp.role}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700 whitespace-nowrap">
                                                {emp.dept}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                emp.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${emp.employeeType === 'Contract'
                                                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                                                }`}>
                                                {emp.employeeType || "Full Time"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                {emp.gender || "Male"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => { setSelectedEmployee(emp); setView("edit"); }}
                                                    className="p-1.5 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setEmployees(employees.filter(e => e.id !== emp.id))}
                                                    className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(filteredEmployees || employees).map((emp) => (
                        <div key={emp.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3" onClick={() => { setSelectedEmployee(emp); setView("details"); }}>
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                        {emp.firstName[0]}{emp.lastName[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">{emp.firstName} {emp.lastName}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{emp.employeeId}</p>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    emp.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {emp.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase">Role</span>
                                    <span className="font-medium text-gray-800">{emp.role}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase">Dept</span>
                                    <span className="font-medium text-gray-800">{emp.dept}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase">Type</span>
                                    <span className="font-medium text-gray-800">{emp.employeeType || "Full Time"}</span>
                                </div>
                                <div className="flex gap-2 items-center mt-2 col-span-2 justify-end">
                                    <button
                                        onClick={() => { setSelectedEmployee(emp); setView("edit"); }}
                                        className="p-2 rounded-lg bg-blue-50 text-blue-600 transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => setEmployees(employees.filter(e => e.id !== emp.id))}
                                        className="p-2 rounded-lg bg-red-50 text-red-600 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Employee Profile Component ---
const EmployeeProfile = ({ employee, onClose, hideSensitiveInfo }) => {
    const [activeTab, setActiveTab] = useState("personal");

    const tabs = [
        { id: "personal", label: "Personal Information", icon: Users },
        { id: "professional", label: "Professional Information", icon: Briefcase },
        { id: "documents", label: "Documents & Bank", icon: Phone },
        { id: "projects", label: "Project Details", icon: Building },
        { id: "leaves", label: "Leave Details", icon: Calendar }
    ].filter(tab => !hideSensitiveInfo || (tab.id !== 'documents' && tab.id !== 'leaves'));

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-[1200px] mx-auto space-y-6">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Employees
                </button>

                <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm ${activeTab === tab.id
                                ? "bg-blue-100/50 text-blue-700 border border-blue-200"
                                : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <div className={`p-2 rounded-lg text-blue-600`}>
                            {activeTab === 'personal' && <Users size={24} />}
                            {activeTab === 'professional' && <Briefcase size={24} />}
                            {activeTab === 'documents' && <Phone size={24} />}
                            {activeTab === 'projects' && <Building size={24} />}
                            {activeTab === 'leaves' && <Calendar size={24} />}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                    </div>

                    {activeTab === 'personal' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <InfoField label="First Name" value={employee.firstName} />
                                <InfoField label="Last Name" value={employee.lastName} />
                                <InfoField label="Date of Birth" value={employee.dob} />
                                <InfoField label="Gender" value={employee.gender} />
                                <InfoField label="Email Address" value={employee.email} />
                                <InfoField label="Phone Number" value={employee.mobile} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-4">Present Address</h3>
                                    <div className="space-y-3">
                                        <InfoField label="Address Line" value={employee.presentAddressLine} />
                                        <InfoField label="City" value={employee.presentCity} />
                                        <InfoField label="State" value={employee.presentState} />
                                        <InfoField label="ZIP Code" value={employee.presentZipCode} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-4">Permanent Address</h3>
                                    <div className="space-y-3">
                                        <InfoField label="Address Line" value={employee.permanentAddressLine} />
                                        <InfoField label="City" value={employee.permanentCity} />
                                        <InfoField label="State" value={employee.permanentState} />
                                        <InfoField label="ZIP Code" value={employee.permanentZipCode} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'professional' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <InfoField label="Employee ID" value={employee.employeeId} />
                                <InfoField label="Department" value={employee.dept} />
                                <InfoField label="Role" value={employee.role} />
                                <InfoField label="Joining Date" value={employee.joiningDate} />
                                <InfoField label="Status" value={employee.status} />
                                <InfoField label="Employee Type" value={employee.employeeType || "Full Time"} />
                            </div>

                            {/* Previous Experience Section - Read Only */}
                            {employee.experiences && employee.experiences.length > 0 && (
                                <div className="pt-6 border-t border-gray-100 mt-6">
                                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                        <Briefcase size={18} className="text-gray-400" />
                                        Previous Experience
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {employee.experiences.map((exp, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <h4 className="font-bold text-gray-800">{exp.companyName}</h4>
                                                <p className="text-blue-600 font-medium text-sm mb-2">{exp.designation}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-100 w-fit">
                                                    <span className="font-semibold">Duration:</span>
                                                    {exp.years && <span>{exp.years} Years</span>}
                                                    {exp.years && exp.months && <span>•</span>}
                                                    {exp.months && <span>{exp.months} Months</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}


                    {activeTab === 'documents' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <InfoField label="Aadhar Card" value={employee.aadharCard} />
                                <InfoField label="PAN Card" value={employee.panCard} />
                            </div>
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-700 mb-4">Bank Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <InfoField label="Bank Name" value={employee.bankName} />
                                    <InfoField label="Account Number" value={employee.accountNumber} />
                                    <InfoField label="Branch Name" value={employee.branchName} />
                                    <InfoField label="IFSC Code" value={employee.ifscCode} />
                                    <InfoField label="Bank Address" value={employee.bankAddress} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {employee.projects && employee.projects.length > 0 ? (
                                employee.projects.map((proj, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                                        <h4 className="font-bold text-gray-800">{proj.name}</h4>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {proj.status}
                                            </span>
                                            <span>Role: {proj.role}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No projects assigned.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'leaves' && (
                        <div className="space-y-8">
                            {employee.leaves ? (
                                <div className="animate-fade-in">
                                    {/* Summary Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 flex flex-col items-center justify-center gap-2 shadow-sm">
                                            <div className="p-3 rounded-full bg-blue-200/50 text-blue-700 mb-1">
                                                <Calendar size={24} />
                                            </div>
                                            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Total Leaves</span>
                                            <span className="text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #1d4ed8, #3b82f6)' }}>
                                                {employee.leaves.total}
                                            </span>
                                            <span className="text-xs text-blue-500 font-medium bg-blue-100 px-2 py-0.5 rounded-md">Annual Quota</span>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 flex flex-col items-center justify-center gap-2 shadow-sm">
                                            <div className="p-3 rounded-full bg-green-200/50 text-green-700 mb-1">
                                                <CheckCircle size={24} />
                                            </div>
                                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Leaves Taken</span>
                                            <span className="text-4xl font-bold text-gray-800" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #15803d, #22c55e)' }}>
                                                {employee.leaves.taken}
                                            </span>
                                            <span className="text-xs text-green-500 font-medium bg-green-100 px-2 py-0.5 rounded-md">Used to Date</span>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 flex flex-col items-center justify-center gap-2 shadow-sm">
                                            <div className="p-3 rounded-full bg-purple-200/50 text-purple-700 mb-1">
                                                <PieChart size={24} />
                                            </div>
                                            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Leave Balance</span>
                                            <span className="text-4xl font-bold text-gray-800" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #7e22ce, #a855f7)' }}>
                                                {employee.leaves.balance}
                                            </span>
                                            <span className="text-xs text-purple-500 font-medium bg-purple-100 px-2 py-0.5 rounded-md">Remaining</span>
                                        </div>
                                    </div>

                                    {/* Breakdown Section */}
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
                                            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                                            Leave Usage Breakdown
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            <LeaveTypeCard
                                                label="Sick Leave"
                                                value={employee.leaves.sick}
                                                icon={<Thermometer size={20} />}
                                                color="text-orange-600"
                                                bg="bg-orange-50"
                                                borderColor="border-orange-100"
                                            />
                                            <LeaveTypeCard
                                                label="Casual Leave"
                                                value={employee.leaves.casual}
                                                icon={<Coffee size={20} />}
                                                color="text-teal-600"
                                                bg="bg-teal-50"
                                                borderColor="border-teal-100"
                                            />
                                            <LeaveTypeCard
                                                label="Privilege Leave"
                                                value={employee.leaves.privilege}
                                                icon={<Star size={20} />}
                                                color="text-pink-600"
                                                bg="bg-pink-50"
                                                borderColor="border-pink-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <Calendar size={48} className="mb-4 opacity-20" />
                                    <p className="italic">No leave records available for this employee.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoField = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
        <p className="font-medium text-gray-800 text-base border-b border-gray-100 pb-1">{value || "-"}</p>
    </div>
);

const LeaveTypeCard = ({ label, value, icon, color, bg, borderColor }) => (
    <div className={`p-4 rounded-xl border ${borderColor} ${bg} flex items-center gap-4 transition-transform hover:scale-[1.02] duration-200`}>
        <div className={`p-2.5 rounded-lg bg-white shadow-sm ${color}`}>
            {icon}
        </div>
        <div>
            <p className={`text-sm font-semibold ${color} opacity-90`}>{label}</p>
            <p className="text-xl font-bold text-gray-800">{value} <span className="text-xs font-normal text-gray-500">days taken</span></p>
        </div>
    </div>
);

export default EmployeeDetail;