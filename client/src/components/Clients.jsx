import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQuery";
import ClientData from "./ClientData";
import Loading from "./Loading";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return <Loading />
    }
    else if (error) {
        return <p>An error occured when loading this section.</p>
    } 

    return (
        <div className="clients">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map(client => {
                        return <ClientData key={client.id} client={client} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Clients;