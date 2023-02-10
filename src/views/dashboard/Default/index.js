import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import MemberCard from './MemberCard';
import ProjectCard from './ProjectCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Graph from './Graph';
import { useSelector } from 'react-redux';
import LinkCard from './LinkCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const data = useSelector((state) => state.network);

    useEffect(() => {
        setLoading(false);
    }, []);

    const [node, setNode] = useState(0);
    const [project, setProject] = useState(0);
    const [link, setLink] = useState(0);

    useEffect(() => {
        const userData = [...data.nodes];
        const links = [...data.links];
        setNode(userData.filter((user) => user.type == '1').length);
        setProject(userData.filter((user) => user.type == '2').length);
        setLink(links.length);
    }, [data]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <MemberCard isLoading={isLoading} node={node} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ProjectCard isLoading={isLoading} project={project} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <LinkCard isLoading={isLoading} link={link} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Graph isLoading={isLoading} {...data} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
