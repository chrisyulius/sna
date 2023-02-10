import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nodes: [
        { id: 'A', name: 'A', type: '1' },
        { id: 'B', name: 'B', type: '1' },
        { id: 'C', name: 'C', type: '1' },
        { id: 'D', name: 'D', type: '1' },
        { id: 'E', name: 'E', type: '1' },
        { id: 'F', name: 'F', type: '1' },
        { id: 'LNC', name: 'LNC', type: '2' },
        { id: 'WPC', name: 'WPC', type: '2' },
        { id: 'ATF', name: 'ATF', type: '2' },
        { id: 'FSM', name: 'FSM', type: '2' }
    ],
    links: [
        { source: 'A', target: 'WPC', value: 8 },
        { source: 'C', target: 'WPC', value: 10 },
        { source: 'D', target: 'LNC', value: 6 },
        { source: 'B', target: 'LNC', value: 6 },
        { source: 'B', target: 'WPC', value: 6 },
        { source: 'B', target: 'ATF', value: 6 },
        { source: 'E', target: 'WPC', value: 6 },
        { source: 'E', target: 'ATF', value: 6 },
        { source: 'F', target: 'FSM', value: 16 }
    ]
};

export const network = createSlice({
    name: 'network',
    initialState,
    reducers: {
        addMember: (state, { payload }) => {
            let memberNode = { ...payload, type: '1' };
            state.nodes.push(memberNode);
        },
        deleteMember: (state, { payload }) => {
            const indexDel = state.nodes.map((e) => e.id).indexOf(payload.id);
            if (indexDel !== -1) {
                state.nodes.splice(indexDel, 1);
            }
        },
        addProject: (state, { payload }) => {
            state.nodes.push(payload);
        },
        addRelation: (state, action) => {
            state.links.push(action.payload);
        }
    }
});

export const { addMember, addProject, addRelation, deleteMember } = network.actions;

export default network.reducer;
