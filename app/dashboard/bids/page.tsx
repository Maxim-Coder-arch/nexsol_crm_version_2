"use client";
import { BidsStatus, columnsData } from "@/configs/bids/bids.cnf";
import IncludesBids from "./ui/includes";
import TemplateContent from "@/app/components/share/template";
import { 
    useGetBidsQuery, 
    useCreateBidMutation,
    useUpdateBidMutation,
    useDeleteBidMutation 
} from "../../../store/client-api";
import { IBid } from "@/types/bids/bid.type";
import { clientType } from "@/types/store-types/client.type";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const BidsPage = () => {
    const dispatch = useAppDispatch();
    const { data: bids = [], isLoading, error } = useGetBidsQuery(void 0) as clientType<IBid>;
    const [createBid] = useCreateBidMutation();
    const [updateBid] = useUpdateBidMutation();
    const [deleteBid] = useDeleteBidMutation();

    const handleStatusChange = async (id: string, newStatus: BidsStatus) => {
        try {
            await updateBid({ id, data: { status: newStatus } }).unwrap();
            
            const statusMap = {
                new: 'Новая',
                inProgress: 'В работе',
                finished: 'Завершена'
            };
            
            dispatch(showToast({
                type: 'success',
                title: 'Статус обновлён',
                message: `Статус заявки изменён на "${statusMap[newStatus]}"`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось обновить статус заявки',
                duration: 4000,
            }));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBid(id).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Заявка успешно удалена',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить заявку',
                duration: 4000,
            }));
        }
    };

    const handleAddBid = async (newBid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => {
        if (!newBid.username.trim()) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Имя обязательно для заполнения',
                duration: 3000,
            }));
            return;
        }

        if (!newBid.useremail.trim()) {
            dispatch(showToast({
                type: 'warning',
                title: 'Заполните поле',
                message: 'Email обязателен для заполнения',
                duration: 3000,
            }));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newBid.useremail)) {
            dispatch(showToast({
                type: 'warning',
                title: 'Неверный формат',
                message: 'Пожалуйста, введите корректный email',
                duration: 3000,
            }));
            return;
        }

        try {
            await createBid({
                name: newBid.username.trim(),
                email: newBid.useremail.trim(),
                contact: newBid.usecontact?.trim() || '',
                message: newBid.comment?.trim() || '',
            }).unwrap();

            dispatch(showToast({
                type: 'success',
                title: 'Заявка добавлена!',
                message: `Заявка от ${newBid.username} успешно создана`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось создать заявку. Попробуйте позже',
                duration: 4000,
            }));
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    
    if (error) {
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить список заявок',
            duration: 4000,
        }));
        return <div>Ошибка загрузки</div>;
    }

    return (
        <TemplateContent>
            <IncludesBids
                bids={bids}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                handleAddBid={handleAddBid}
                columnsData={columnsData}
            />
        </TemplateContent>
    );
};

export default BidsPage;