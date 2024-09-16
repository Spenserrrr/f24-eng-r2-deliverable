import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SearchSpecies from "./searchSpecies";

export default async function SpeciesList({ searchParams }: { searchParams: { search?: string } }) {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
  const sessionId = session.user.id;

  const searchQuery = searchParams.search ?? "";

  const { data: species } = await supabase.from("species").select("*").order("id", { ascending: false });

  if (!species || species.length === 0) {
    return (
      <>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <TypographyH2>Species List</TypographyH2>
          <AddSpeciesDialog userId={sessionId} />
        </div>
        <Separator className="my-4" />
        <p>No species found.</p>
      </>
    );
  }

  const filteredSpecies = species.filter((s) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      s.scientific_name.toLowerCase().includes(searchLower) ??
      (s.common_name && s.common_name.toLowerCase().includes(searchLower)) ??
      (s.description && s.description.toLowerCase().includes(searchLower))
    );
  });

  const speciesToDisplay = searchQuery ? filteredSpecies : species;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>
      <Separator className="my-4" />
      <SearchSpecies species={speciesToDisplay} searchQuery={searchQuery} userId={sessionId} />
    </>
  );
}
