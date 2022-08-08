import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQuery";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

const ProjectDelete = ({ projectId }) => {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/demo"),
        refetchQueries: [{ query: GET_PROJECTS }],
    })

    return (
        <button className="btn-primary btn-small" aria-label="delete" onClick={deleteProject}><FaTrash /></button>
    );
}

export default ProjectDelete; 