import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
    return (
        <>
            <p className="info">Client Information</p>
            <ul className="client-info">
                <li><span><FaIdBadge /></span> {client.name}</li>
                <li><span><FaEnvelope /></span> {client.email}</li>
                <li><span><FaPhone /></span> {client.phone}</li>
            </ul>
        </>
    );
}

export default ClientInfo;