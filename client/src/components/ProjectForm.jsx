import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQuery";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const ProjectForm = ({ project }) => {
    const navigate = useNavigate();

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] =  useState('');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status},
        onCompleted: () => navigate("/demo"),
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    });

    const handleSave = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert("Please fill in all fields");
        }

        updateProject(name, description, status);
    }

    return (
        <>
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

            <div className="btn-group">
                <button className="btn-primary" aria-label="save" onClick={handleSave}>Save</button>
                <Link to="/demo" aria-label="cancel" className="btn-primary">Cancel</Link>
            </div>
        </>
    );
}

export default ProjectForm;