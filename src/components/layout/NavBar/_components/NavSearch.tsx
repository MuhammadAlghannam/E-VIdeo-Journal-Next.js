"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchSchema } from "@/lib/schema/navSearch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NavBarSearchList from "./NavBarSearchList";

export default function NavSearch() {
  // State
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Form
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: { search: "" },
  });

  const searchValue = form.watch("search");

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchValue?.trim() ?? "");
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => { })}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NavBarSearchList
                  debouncedTerm={debouncedTerm}
                  onItemSelect={() => form.reset()}
                  trigger={(
                    <div className="relative">
                      <Search
                        className="w-5 h-5 text-text-gray-dark pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        strokeWidth={1.5}
                      />
                      <Input
                        placeholder="Search..."
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
