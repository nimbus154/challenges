/*
 * Given a JSON list of objects with the properties { id, name, parentId },
 * print an HTML tree hierarchy.
 * INPUT: 
 * [
 *   { id: 1, name: 'inbox', parentId: 0 },
 *   { id: 2, name: 'important', parentId: 1 },
 *   { id: 3, name: 'todo', parentId: 1 },
 *   { id: 4, name: 'archive', parentId: 0 },
 *   { id: 5, name: 'trash', parentId: 0 },
 *   { id: 6, name: 'personal', parentId: 2 },
 *   { id: 7, name: 'work', parentId: 2 } 
 * ]
 * OUTPUT: 
 * HTML that would produce: 
 * * inbox 
 *      * important 
 *          * personal 
 *          * work 
 *      * todo 
 * * archive 
 * * trash
 */
const ROOT_ID = 0;

/**
 * Create an HTML list hierarchy from a list of nodes
 * This solution runs in O(n)
 * @param nodes - array of objects { id, name, parentId }
 *        by convention, a parent ID of 0 is the root node
 * @return HTML nested list representation of nodes
 */
module.exports = function hierarchy (nodes) {
    // create hash parent -> children
    var treeHash = groupByParents(nodes); // O(n)
    
    // traverse tree and create hierarchy
    return buildHierarchy (ROOT_ID, treeHash); // O(n)
};

/**
 * Hash groups of nodes by their parents
 * @param nodes - an array of nodes { id, name, parentId }
 * @returns a hash, keys are parent node ids, values are 
 * { name: nodeName, children: [ childIds ] }
 */
function groupByParents (nodes) {
    return nodes.reduce(function (acc, current) {
        if (!(current.id in acc)) {
            acc[current.id] = { children: [] };
        } 
        acc[current.id].name = current.name;

        if (!(current.parentId in acc)) {
            acc[current.parentId] = { children: [] };
        }
        acc[current.parentId].children.push(current.id);

        return acc;
    }, {});
}

/**
 * Create a string representation of the tree hierarchy
 * @param currentId - id of current node
 * @param treeHash - hash of tree data, keyed by node ID
 * @returns string representation of hierarchy
 */
function buildHierarchy (currentId, treeHash) {
    // in-order, depth-first traversal
    return '<ul>' + treeHash[currentId].children.reduce(function (acc, childId) {
        var child = treeHash[childId];
        var grandChildren = child.children.length > 0 ?
                buildHierarchy(childId, treeHash) : '';
        return acc + '<li>' + child.name + '</li>' + grandChildren;
    }, '') + '</ul>';
}
