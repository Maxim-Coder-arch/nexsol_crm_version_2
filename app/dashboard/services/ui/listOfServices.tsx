import { IListOfServicesProps } from "@/types/services/listOfServices.type";
import styles from "../index.module.scss";
import CloseIcon from "@/public/global/close";

const ListOfServices = ({ services, handleDelete }: IListOfServicesProps) => {
    return (
        <div className={styles["services__list"]}>
            <div className={styles["services__list__header"]}>
                <h2>Сервисы</h2>
                <span>{services.length}</span>
            </div>
            <ul>
                {services.map(service => {
                    return (
                        <li className={styles["services__list__item"]} key={service._id}>
                            <div className={styles["services__list__item__content"]}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href={service.url} target="_blank" rel="noopener noreferrer">
                                    {service.url}
                                </a>
                            </div>
                            <button 
                                className={styles["services__list__item__delete"]}
                                onClick={() => handleDelete(service._id)}
                            >
                                <CloseIcon />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListOfServices;