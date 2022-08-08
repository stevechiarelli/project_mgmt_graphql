import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQuery";
import { GET_CLIENTS } from "../queries/clientQuery";
import Loading from "./Loading";

const ProjectModal = ({ modal, handleClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] =  useState('');
    const [status, setStatus] =  useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    // Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const handleSave = (e) => {
        e.preventDefault();
        
        if (name === '' || description === '' || status === '') {
            return alert("Please fill in all fields");
        }

        addProject(name, description, clientId, status);
        handleClose();

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    }

    if (loading) {
        return <Loading />
    }
    else if (error) {
        return <p>An error occured when loading this page.</p>
    }

    return (
        <div className="modal project-modal" style={modal === true ? {display: "block"} : {display: "none"}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>New Project</h3>
                    <span className="close" onClick={() => handleClose()}>&times;</span>
                </div>
                <div className="modal-body">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="description">description</label>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <label htmlFor="status">status</label>
                    <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">not started</option>
                        <option value="progress">in progress</option>
                        <option value="complete">completed</option>
                    </select>

                    <label htmlFor="client">client</label>
                    <select name="client" id="client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select client...</option>
                        {data.clients.map(client => {
                            return <option key={client.id} value={client.id}>{client.name}</option>
                        })}
                    </select>

                    <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;