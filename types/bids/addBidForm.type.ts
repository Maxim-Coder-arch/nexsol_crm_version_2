export interface AddBidFormProps {
    onAddBid: (bid: {
        username: string;
        useremail: string;
        usecontact: string;
        comment: string;
    }) => void;
}