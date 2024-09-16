import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  // Create Supabase client and get user session
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to homepage if the user is not logged in
  if (!session) {
    redirect("/");
  }

  // Fetch all user profiles from the database
  const { data: users, error } = await supabase.from("profiles").select("email, display_name, biography");

  if (error) {
    console.error("Error fetching users:", error.message);
    return <div>Error loading user profiles</div>;
  }

  const userElements = [];

  // Check if users exist
  if (users && users.length > 0) {
    for (const user of users) {
      if (user) {
        userElements.push(
          <div key={user.email} className="rounded border p-4 shadow">
            <h3 className="text-xl font-semibold">{user.display_name}</h3>
            <p className="text-sm">{user.email}</p>
            <p className="text-gray-600">{user.biography ?? "No biography available."}</p>
          </div>,
        );
      }
    }
  } else {
    // If no users are found, push a fallback message
    userElements.push(<div>No users found</div>);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <TypographyH2>All Users</TypographyH2>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4">{userElements}</div>
    </div>
  );
}
