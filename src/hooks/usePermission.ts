"use client";
import { useEffect, useState } from "react";

const usePermission = (
  userPermissions: string[] | undefined | null,
  requiredPermissions: string[]
): boolean => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const checkPermission = () => {
      const permission = requiredPermissions.every((permission) =>
        userPermissions?.includes(permission)
      );
      setHasPermission(permission);
    };

    checkPermission();
  }, [userPermissions, requiredPermissions]);

  return hasPermission;
};

export default usePermission;
