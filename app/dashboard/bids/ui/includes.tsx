import AddBidForm from "./addBidForm";
import BidsColumn from "./bidsColumn";
import ConversionStats from "./conversionStats";
import { IIncludesBidsProps } from "@/types/bids/includesBids.type";
import styles from "../index.module.scss";

const IncludesBids = ({ 
    bids, 
    handleStatusChange, 
    handleDelete, 
    columnsData,
    handleSubmit, 
    handleChange, 
    isOpen, 
    setIsOpen, 
    formData,
 }: IIncludesBidsProps) => {
    return (
        <section id="bids">
            <div className={styles["root-bids"]}>
                <ConversionStats bids={bids} />
                <AddBidForm 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    formData={formData}
                 />
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
                
            </div>
        </section>
    )
}

export default IncludesBids;