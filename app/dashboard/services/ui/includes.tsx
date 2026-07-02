import AddService from "./addService";
import ListOfServices from "./listOfServices";
import styles from "../index.module.scss";
import { IncludesServicesProps } from "@/types/services/includesService.type";



const IncludesServices = ({ 
    services, 
    handleDelete, 
    setFormData, 
    handleAdd, 
    formData 
}: IncludesServicesProps) => {
    return (
        <section id="services">
            <div className={styles["services"]}>
                <ListOfServices services={services} handleDelete={handleDelete} />
                <AddService setFormData={setFormData} handleAdd={handleAdd} formData={formData} />
            </div>
        </section>
    )
}

export default IncludesServices;