import UserIcon from "@/public/icons/menu/user";
import { IModalUserButton } from "@/types/menu/modalUserButton.type";

const ModalUserButton = ({ user, handleOpenModalUser }: IModalUserButton) => {
    return (
        <button onClick={handleOpenModalUser}>
            <UserIcon />
            <p>{user?.name}</p>
        </button>
    )
}

export default ModalUserButton;