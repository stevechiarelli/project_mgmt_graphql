import Loading from "./Loading";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuery";
import ProjectCard from "./ProjectCard";

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        return <Loading />
    }
    else if (error) {
        return <p>An error occured when loading this page.</p>
    } 

    return (
        <div className="projects">
            {data.projects.length > 0 ? (
                data.projects.map(project => {
                    return <ProjectCard key={project.id} project={project} />
                })
            ) : (
                <p>No projects found</p>
            )}
        </div>        
    );
}

export default Projects;