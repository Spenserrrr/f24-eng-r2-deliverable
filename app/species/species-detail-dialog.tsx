"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

import { useState } from "react";
import EditSpeciesDialog from "./update-species-dialog";

export default function SpeciesDetailDialog({ species, userId }: { species: Species; userId: string }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

  const isAuthor = userId === species.author;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-3 w-full">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{species.scientific_name}</DialogTitle>
          <DialogDescription className="text-lg italic">{species.common_name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Kingdom:</strong> {species.kingdom}
          </p>
          <p>
            <strong>Total Population:</strong> {species.total_population}
          </p>
          <p>
            <strong>Description:</strong> {species.description}
          </p>
          {/* Conditionally show the Edit button if the user is the author */}
          {isAuthor && (
            <>
              <div className="mt-4">
                <EditSpeciesDialog species={species} userId={userId} />
              </div>
            </>
          )}
        </div>
        <DialogClose asChild>
          <Button variant="default">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
