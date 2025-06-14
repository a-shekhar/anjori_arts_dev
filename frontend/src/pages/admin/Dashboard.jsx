import UniqueUsersCard from "../../components/dashboard/UniqueUsersCard";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <UniqueUsersCard />
        </div>
      </div>
    </div>
  );
}
