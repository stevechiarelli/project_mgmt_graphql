import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";
import { FaTrash } from "react-icons/fa";

const ClientData = ({ client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    });

    return (
        <tr>
            <td>{ client.name }</td>
            <td>{ client.email }</td>
            <td>{ client.phone }</td>
            <td>
                <button className="btn-primary btn-small" aria-label="delete" onClick={deleteClient}><FaTrash /></button>
            </td>
        </tr>
    );
}

export default ClientData;