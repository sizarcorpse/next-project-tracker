"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParam =
  | "sort"
  | "order"
  | "type"
  | "priority"
  | "stage"
  | "status"
  | "si"
  | "page"
  | "search"
  | "limit";

const useHandleProjectsQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleProjectsQuery = useCallback(
    (queryParam: QueryParam, value: string | null, append: boolean = false) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(queryParam);
      } else if (append) {
        if (params.getAll(queryParam).includes(value)) {
          params.delete(queryParam, value);
        } else {
          params.append(queryParam, value);
        }
      } else {
        params.set(queryParam, value);
      }

      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return handleProjectsQuery;
};

export default useHandleProjectsQuery;
