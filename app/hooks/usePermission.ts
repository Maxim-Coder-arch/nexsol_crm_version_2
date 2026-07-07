import { useUser } from "./useUser"

const usePermission = () => {
    const { user } = useUser();
    return user?.role;
}

export default usePermission;