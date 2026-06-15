import AddBidForm from "./addBidForm";
import BidsColumn from "./bidsColumn";
import ConversionStats from "./conversionStats";
import styles from "../index.module.scss";

const IncludesBids = ({ bids, handleStatusChange, handleDelete, handleAddBid, columnsData }: any) => {
    return (
        <section id="bids">
            <div className={styles["root-bids"]}>
                <ConversionStats bids={bids} />
                
                <div className={styles["columns-container"]}>
                    {columnsData.map((column, index) => (
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