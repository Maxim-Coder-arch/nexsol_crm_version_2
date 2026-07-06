"use client";
import { BidsStatus, columnsData } from "@/config-and-data/bids.cnf";
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

const BidsPage = () => {
    const { data: bids = [], isLoading, error } = useGetBidsQuery(void 0) as clientType<IBid>
    const [createBid] = useCreateBidMutation();
    const [updateBid] = useUpdateBidMutation();
    const [deleteBid] = useDeleteBidMutation();

    const handleStatusChange = async (id: string, newStatus: BidsStatus) => {
        try {
            await updateBid({ id, data: { status: newStatus } }).unwrap();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Удалить заявку?')) return;
        try {
            await deleteBid(id).unwrap();
        } catch (error) {
            console.error('Failed to delete bid:', error);
        }
    };

    const handleAddBid = async (newBid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => {
        try {
            await createBid({
                name: newBid.username,
                email: newBid.useremail,
                contact: newBid.usecontact,
                message: newBid.comment,
            }).unwrap();
        } catch (error) {
            console.error('Failed to add bid:', error);
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки</div>;

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