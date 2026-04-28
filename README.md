# Employee Task Management (ETM) System

A comprehensive, multi-role management platform designed to streamline task allocation, attendance tracking, and project oversight for organizations.

## 🚀 Technologies Used
- **Frontend**: React (v19), Vite
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM (v7)

---

## 👥 User Roles & Flow Analysis

The system is architected around four distinct user roles, each with a tailored dashboard and set of capabilities.

### 👑 Super Admin (`/super-admin`)
The platform's highest administrative level, providing bird's-eye oversight.
- **Dashboard**: Global metrics including earnings, inquiries, and new customer acquisition.
- **Client Management**: Full control over onboarding and managing client organizations.
- **Admin Management**: Managing organizational administrators.
- **Project Oversight**: Monitoring all active projects across the entire platform.
- **Security**: Managing platform-wide security and access protocols.

### 🏛️ Admin (`/admin`)
Focuses on organization-level operations, HR, and project management.
- **HR & Operations**:
    - **Attendance**: Real-time tracking (Today's Attendance) and historical records (Attendance Sheets).
    - **Leaves**: Managing leave requests from both HR and Managerial perspectives, including balance tracking and policy setup.
    - **Employee Directory**: Full management of employee profiles and details.
- **Training**: Overseeing the training ecosystem (Trainers, Trainees, and Course Types).
- **Organization**: Structuring company departments and defining leadership roles.
- **Communication**: Managing company-wide notices and holiday calendars.

### 🧑‍💻 Employee (`/employee`)
The operational layer for daily work execution and reporting.
- **Work Management**:
    - **My Tasks**: Personal task list and status tracking.
    - **Project Management**: Tools for Project Managers to oversee specific projects.
    - **Team Leadership**: Capabilities for Team Leaders to add and assign tasks.
- **Support**: Integrated Issue Tracker for resolving technical or operational blockers.
- **Financial Reporting**: Managing client payments and reporting business-related expenses.
- **Personal**: Applying for leaves and tracking personal performance via the dashboard.

### 🤝 Client (`/client`)
The external stakeholder portal for monitoring and collaboration.
- **Project Monitoring**: Real-time access to project details, progress, and milestones.
- **Support**: Dedicated module to raise support tickets and communicate with the project team.
- **Billing**: Comprehensive view of invoices, billing history, and payment status.
- **Team**: Viewing the profiles of employees assigned to their specific projects.

---

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── components/       # Role-specific components (Admin, Client, Employee, SuperAdmin)
│   ├── layout/           # Shared layouts with role-based sidebars and navbars
│   ├── pages/            # Role-specific page views
│   ├── assets/           # Static images and styles
│   └── App.jsx           # Main routing logic
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Default Navigation
For development/demo purposes, the `/signin` page provides direct access links to the different user dashboards.
- **Super Admin**: Accessed via `http://localhost:5173/super-admin`
- **Admin**: Accessible via `/admin`
- **Employee**: Accessible via `/employee`
- **Client**: Accessible via `/client`