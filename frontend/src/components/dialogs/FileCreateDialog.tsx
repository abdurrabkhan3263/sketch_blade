"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "../ui/label";
import { XIcon, SearchIcon, PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AnimatePresence, motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  file_name: z
    .string()
    .min(3, "File name must be at least 3 characters long")
    .max(50, "File name must not exceed 50 characters")
    .nonempty("File name is required")
    .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
      message:
        "File name can only contain letters, numbers, underscores, and hyphens",
    }),
});

type CollaboratorType = {
  _id: string;
  full_name: string;
  profile_url: string;
};

type CollaboratorData = {
  user: string;
  full_name: string;
  profile_url: string;
  actions: "view" | "edit";
};

export function FileCreateDialog() {
  const [selectedColl, setSelectedColl] = useState<CollaboratorData[]>([]);
  const [listColl, setListColl] = useState<CollaboratorType[]>([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<"edit" | "view">("view");
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<CollaboratorType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_name: "",
    },
  });

  const handleSearchCollaborator = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);

    // Simulating API call with setTimeout
    setTimeout(() => {
      setListColl(
        [
          {
            _id: "1",
            full_name: "John Doe",
            profile_url: "https://randomuser.me/api/portraits/men/1.jpg",
          },
          {
            _id: "2",
            full_name: "Jane Doe",
            profile_url: "https://randomuser.me/api/portraits/women/1.jpg",
          },
          {
            _id: "3",
            full_name: "Alice Smith",
            profile_url: "https://randomuser.me/api/portraits/women/2.jpg",
          },
          {
            _id: "4",
            full_name: "Bob Johnson",
            profile_url: "https://randomuser.me/api/portraits/men/2.jpg",
          },
          {
            _id: "5",
            full_name: "Alice Smith",
            profile_url: "https://randomuser.me/api/portraits/women/2.jpg",
          },
          {
            _id: "6",
            full_name: "Alice Smith",
            profile_url: "https://randomuser.me/api/portraits/women/2.jpg",
          },
          {
            _id: "7",
            full_name: "Bob Johnson",
            profile_url: "https://randomuser.me/api/portraits/men/2.jpg",
          },
          {
            _id: "8",
            full_name: "Alice Smith",
            profile_url: "https://randomuser.me/api/portraits/women/2.jpg",
          },
        ].filter((collab) =>
          collab.full_name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    }, 300);
  };

  const handleSelectCollaborator = (collaboratorData: CollaboratorData) => {
    const isAlreadySelected = selectedColl.some(
      (coll) => coll.user === collaboratorData.user,
    );

    if (isAlreadySelected) return;

    setSelectedColl((prevColl) => [...prevColl, collaboratorData]);

    setListColl([]);
    setInputSearch("");
  };

  const handleChangeRole = (_id: string, role: "edit" | "view") => {
    setSelectedColl((prevColl) =>
      prevColl.map((coll) =>
        coll.user === _id ? { ...coll, actions: role } : coll,
      ),
    );
    setSelectedCollaborator(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setListColl([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Selected collaborators:", selectedColl);
  }, [selectedColl]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    console.log("Selected collaborators:", selectedColl);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("Selected Role is:", selectedRole);
  }, [selectedRole]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-tertiary/90 bg-tertiary">
          Create File
          <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark-container sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Enter file details and add collaborators.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter file name"
                      {...field}
                      className="dark-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="collaborator-search">Add Collaborators</Label>
              <div
                className={"relative flex items-start justify-between gap-x-2"}
              >
                <div className="flex-1">
                  <div
                    className={cn(
                      "min-h-10 rounded-md border border-zinc-200 bg-secondary pl-2 transition-all focus-within:border-2",
                      selectedColl.length > 0 && "pt-2",
                    )}
                  >
                    <AnimatePresence>
                      {selectedColl.length > -1 && (
                        <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                          {selectedColl.map((collaborator) => (
                            <motion.div
                              key={collaborator.user}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="flex items-center justify-center gap-x-2.5 rounded-full border border-zinc-200 bg-primary px-2 py-1 text-white focus:border-2"
                              onClick={() =>
                                setSelectedCollaborator(collaborator)
                              }
                            >
                              <img
                                src={collaborator.profile_url}
                                alt={collaborator.full_name}
                                className="h-6 w-5 rounded-full"
                              />
                              <p>{collaborator.full_name}</p>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedColl((prevColl) =>
                                    prevColl.filter(
                                      (coll) => coll.user !== collaborator.user,
                                    ),
                                  )
                                }
                              >
                                <XIcon className="h-5 w-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                    <div className={"flex items-center gap-x-1.5"}>
                      <SearchIcon className="h-5 w-5" />
                      <Input
                        className={cn(
                          "border-0 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                          "dark-input bg-gray-100 dark:bg-gray-800",
                          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        )}
                        placeholder={"Search for collaborators"}
                        value={inputSearch}
                        onChange={handleSearchCollaborator}
                      />
                    </div>
                  </div>
                </div>
                <div className={"w-fit"}>
                  <Select
                    defaultValue={"view"}
                    value={selectedRole}
                    onValueChange={(value) => {
                      if (selectedCollaborator) {
                        handleChangeRole(
                          selectedCollaborator._id,
                          value as "edit" | "view",
                        );
                      } else {
                        setSelectedRole(value as "edit" | "view");
                      }
                    }}
                  >
                    <SelectTrigger className="dark-container">
                      <SelectValue placeholder="Choose it" />
                    </SelectTrigger>
                    <SelectContent className={"dark-container"}>
                      <SelectGroup>
                        <SelectLabel>Choose option</SelectLabel>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="view">View</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <AnimatePresence>
                  {listColl.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute top-[120%] max-h-40 w-full overflow-y-auto rounded-md border border-zinc-200 bg-tertiary p-2"
                    >
                      <div
                        className={"flex flex-col gap-y-2"}
                        ref={dropdownRef}
                      >
                        {listColl.map((collaborator) => (
                          <TooltipProvider key={collaborator._id}>
                            <Tooltip>
                              <TooltipTrigger
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSelectCollaborator({
                                    user: collaborator._id,
                                    actions: selectedRole,
                                    full_name: collaborator.full_name,
                                    profile_url: collaborator.profile_url,
                                  });
                                }}
                              >
                                <div className="relative flex w-full items-center rounded-md bg-secondary px-1.5 py-2">
                                  <img
                                    src={collaborator.profile_url}
                                    alt={collaborator.full_name}
                                    className="h-8 w-8 rounded-full"
                                  />
                                  <p className="ml-4">
                                    {collaborator.full_name}
                                  </p>
                                  <TooltipContent>
                                    <p>
                                      Click to add {collaborator.full_name} as a
                                      collaborator
                                    </p>
                                  </TooltipContent>
                                </div>
                              </TooltipTrigger>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant={"app"} className={"w-full"}>
                Create File
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
