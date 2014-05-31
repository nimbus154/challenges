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
