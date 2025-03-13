
import WorkflowsPanel from "@/components/dashboard/WorkflowsPanel";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Workflows = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar open={true} />
        <main className="flex-1 ml-64 p-6">
          <WorkflowsPanel />
        </main>
      </div>
    </div>
  );
};

export default Workflows;
