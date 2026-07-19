// ==========================================
// ABOUT PAGE - ALUMNI NETWORK TREE
// ==========================================

// Each alumnus is a node. Set parentId to the id of the "big" who brought
// them into the chapter to draw a connecting line; omit parentId (or point
// to an id that doesn't exist) to make them a root of the tree.
const ALUMNI_DATA = [
    { id: 'a1', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Fall 2010 Pledge Class', position: 'Software Engineer', company: 'Example Corp', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 'a2', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Spring 2012 Pledge Class', position: 'Product Manager', company: 'Example Inc.', quote: 'Sed do eiusmod tempor incididunt ut labore et dolore.', parentId: 'a1' },
    { id: 'a3', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Fall 2014 Pledge Class', position: 'Data Scientist', company: 'Example Analytics', quote: 'Ut enim ad minim veniam, quis nostrud exercitation.', parentId: 'a2' },
    { id: 'a4', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Spring 2016 Pledge Class', position: 'Hardware Engineer', company: 'Example Systems', quote: 'Duis aute irure dolor in reprehenderit in voluptate.', parentId: 'a2' },
    { id: 'a5', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Fall 2018 Pledge Class', position: 'Consultant', company: 'Example Group', quote: 'Excepteur sint occaecat cupidatat non proident, sunt.', parentId: 'a1' },
    { id: 'a6', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Spring 2020 Pledge Class', position: 'Founder', company: 'Example Startup', quote: 'Sed ut perspiciatis unde omnis iste natus error sit.', parentId: 'a5' },
    { id: 'a7', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Fall 2022 Pledge Class', position: 'Research Engineer', company: 'Example Labs', quote: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur.', parentId: 'a6' },
    { id: 'a8', name: 'Alumni Name', img: 'assets/img/rick-cropped.png', pledge: 'Spring 2024 Pledge Class', position: 'Analyst', company: 'Example Financial', quote: 'At vero eos et accusamus et iusto odio dignissimos.', parentId: 'a5' }
];

document.addEventListener('DOMContentLoaded', function () {
    renderAlumniTree(ALUMNI_DATA);
});

function renderAlumniTree(data) {
    const container = document.getElementById('alumniTree');
    if (!container) return;

    const NODE_GAP = 170;
    const LEVEL_HEIGHT = 190;
    const SIDE_PADDING = 110;
    const NODE_RADIUS = 52;

    const byId = new Map(data.map(item => [item.id, Object.assign({}, item, { children: [] })]));
    const roots = [];
    byId.forEach(node => {
        const parent = node.parentId && byId.get(node.parentId);
        if (parent) {
            parent.children.push(node);
        } else {
            roots.push(node);
        }
    });

    function countLeaves(node) {
        node.leafCount = node.children.length
            ? node.children.reduce((sum, child) => sum + countLeaves(child), 0)
            : 1;
        return node.leafCount;
    }

    function assignPosition(node, xStart, xEnd, depth) {
        node.depth = depth;
        node.x = (xStart + xEnd) / 2;
        let cursor = xStart;
        node.children.forEach(child => {
            const span = (xEnd - xStart) * (child.leafCount / node.leafCount);
            assignPosition(child, cursor, cursor + span, depth + 1);
            cursor += span;
        });
    }

    const allNodes = [];
    let maxDepth = 0;
    let rootCursor = 0;

    roots.forEach(root => {
        countLeaves(root);
        assignPosition(root, rootCursor, rootCursor + root.leafCount, 0);
        rootCursor += root.leafCount;
    });

    function collect(node) {
        allNodes.push(node);
        maxDepth = Math.max(maxDepth, node.depth);
        node.children.forEach(collect);
    }
    roots.forEach(collect);

    const totalLeaves = rootCursor;
    const width = totalLeaves * NODE_GAP + SIDE_PADDING;
    const height = SIDE_PADDING * 2 + maxDepth * LEVEL_HEIGHT + NODE_RADIUS * 2;

    allNodes.forEach(node => {
        node.px = SIDE_PADDING / 2 + node.x * NODE_GAP;
        node.py = SIDE_PADDING + node.depth * LEVEL_HEIGHT;
    });

    let linksMarkup = '';
    allNodes.forEach(node => {
        const parent = node.parentId && byId.get(node.parentId);
        if (!parent) return;
        const startY = parent.py + NODE_RADIUS;
        const endY = node.py - NODE_RADIUS;
        const midY = (startY + endY) / 2;
        linksMarkup += `<path d="M ${parent.px} ${startY} C ${parent.px} ${midY}, ${node.px} ${midY}, ${node.px} ${endY}" class="alumni-link" />`;
    });

    let nodesMarkup = '';
    allNodes.forEach(node => {
        nodesMarkup += `
            <div class="alumni-node" style="left:${node.px}px; top:${node.py}px;">
                <div class="alumni-face" style="width:${NODE_RADIUS * 2}px; height:${NODE_RADIUS * 2}px;">
                    <img src="${node.img}" alt="${node.name}">
                </div>
                <div class="alumni-node-name" style="left:${NODE_RADIUS + 12}px;">${node.name}</div>
                <div class="alumni-popup">
                    <p class="alumni-pledge mb-1">${node.pledge}</p>
                    <p class="alumni-position mb-1">${node.position}, ${node.company}</p>
                    <p class="alumni-quote mb-0">"${node.quote}"</p>
                </div>
            </div>`;
    });

    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.innerHTML = `<svg class="alumni-links" width="${width}" height="${height}">${linksMarkup}</svg>${nodesMarkup}`;
}
