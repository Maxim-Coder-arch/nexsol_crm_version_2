import { IService } from "../page";
import AddService from "./addService";
import ListOfServices from "./listOfServices";
import styles from "../index.module.scss";

interface IncludesServicesProps {
    services: IService[];
    handleDelete: (id: string) => void;
    setFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        url: string;
    }>>;
    handleAdd: () => void;
    formData: {
        title: string;
        description: string;
        url: string;
    };
}

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