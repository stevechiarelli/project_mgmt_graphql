import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQuery";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ClientInfo from "../components/ClientInfo";
import ProjectDelete from "../components/ProjectDelete";
import ProjectForm from "../components/ProjectForm";

const Project = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: {id } });

    if (loading) {
        return <Loading />
    }
    else if (error) {
        return <p>An error occured when loading this page.</p>
    } 

    return (
        <div className="container">
            <Navbar page="demo" />
            <section className="project">
                <div className="project-header">
                    <div className="content">
                        <h1>{data.project.name}</h1>
                        <p>{data.project.description}</p>
                    </div>
                    <div className="btn-group">
                        <ProjectDelete projectId={data.project.id} />
                        <Link to="/demo" aria-label="delete" className="btn-primary btn-small"><FaArrowLeft /></Link>
                    </div>
                </div>

                <p className="status">Project status: <span>{data.project.status}</span></p>
                
                <ClientInfo client={data.project.client} />

                <h2>Update Project Details</h2>

                <ProjectForm project={data.project} />
            </section>
        </div>
    );
}

export default Project;