import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";

const ClientModal = ({ modal, handleClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] =  useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        refetchQueries: [{ query: GET_CLIENTS }],
    });

    const handleSave = (e) => {
        e.preventDefault();
        
        if (name === '' || email === '' || phone === '') {
            return alert("Please fill in all fields");
        }

        addClient(name, email, phone);
        handleClose();

        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <div className="modal client-modal" style={modal === true ? {display: "block"} : {display: "none"}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>New Client</h3>
                    <span className="close" onClick={() => handleClose()}>&times;</span>
                </div>
                <div className="modal-body">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="phone">phone</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ClientModal;