import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDateBr } from "../../utils";

export const Match = ({match, toggleDeleteModal, toggleEditModal}) => {

    return(
        <tr>
            <td data-label="Data">{formatDateBr(match.date)}</td>
            <td className="points" data-label="Pontos">
            {match.score}
            </td>
            <td className="action-column" data-label="#">
            <button className="action" style={{ backgroundColor: '#F6A935'}} onClick={ () => toggleEditModal(match) }>
                <FiEdit2 color="#fff" size={17} />
            </button>
            <button className="action" style={{ backgroundColor: '#B20600'}} onClick={ () => toggleDeleteModal(match) }>
                <FiTrash2 color="#fff" size={17} />
            </button>
            </td>
        </tr>
    );
}