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

export default function SpeciesDetailDialog({ species }: { species: Species }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

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
        <div className="mb-4 space-y-2">
          <p className="text-lg">
            <strong>Kingdom:</strong> {species.kingdom}
          </p>
          <p>
            <strong>Total Population:</strong> {species.total_population}
          </p>
          <p>
            <strong>Description:</strong> {species.description}
          </p>
        </div>
        <DialogClose asChild>
          <Button variant="default">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
