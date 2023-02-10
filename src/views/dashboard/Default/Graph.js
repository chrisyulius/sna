/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';

const Graph = ({ isLoading, nodes, links }) => {
    const forceRef = useRef(null);
    let dataGraph = { nodes, links };
    function nodePaint({ id, x, y }, color, ctx) {
        ctx.fillStyle = color;
    }

    return (
        <>
            {!isLoading && nodes && (
                <MainCard title="Network">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <ForceGraph2D
                                graphData={JSON.parse(JSON.stringify(dataGraph))}
                                nodeLabel="id"
                                linkDirectionalArrowLength={3.5}
                                linkDirectionalArrowRelPos={1}
                                linkCurvature={0.25}
                                enablePointerInteraction={true}
                                linkDirectionalParticleWidth={1}
                                nodeCanvasObjectMode={() => 'after'}
                                nodePointerAreaPaint={nodePaint}
                                nodeCanvasObject={(node, ctx) => {
                                    const label = node.name;
                                    ctx.fillText(label, node.x, node.y + 15);
                                    ctx.textAlign = 'right';
                                    ctx.textBaseline = 'right';
                                    ctx.fillStyle = '#ff0000';
                                }}
                                ref={forceRef}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

Graph.propTypes = {
    isLoading: PropTypes.bool,
    nodes: PropTypes.any,
    links: PropTypes.any
};

export default Graph;
