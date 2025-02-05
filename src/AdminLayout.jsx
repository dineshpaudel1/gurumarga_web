import React from "react";
import MasterAdmin from "./admin/Pages/MasterAdmin";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 flex flex-col">
        {/* Dashboard Header */}

        <div className="shadow-md bg-white">
          <MasterAdmin children={undefined} />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
