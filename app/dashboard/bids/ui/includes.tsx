import AddBidForm from "./addBidForm";
import BidsColumn from "./bidsColumn";
import ConversionStats from "./conversionStats";
import styles from "../index.module.scss";
import { IIncludesBidsProps } from "@/types/bids/includesBids.type";

const IncludesBids = ({ 
    bids, 
    handleStatusChange, 
    handleDelete, 
    handleAddBid, 
    columnsData
 }: IIncludesBidsProps) => {
    return (
        <section id="bids">
            <div className={styles["root-bids"]}>
                <ConversionStats bids={bids} />
                
                <div className={styles["columns-container"]}>
                    {columnsData.map((column: any, index: number) => (
                        <BidsColumn
                            key={index}
                            title={column.title}
                            type={column.type}
                            bids={bids}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
                
                <AddBidForm onAddBid={handleAddBid} />
            </div>
        </section>
    )
}

export default IncludesBids;