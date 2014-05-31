var hierarchy = require('./hierarchy');

var folders = [
	{ id: 1, name: 'inbox', parentId: 0 },
	{ id: 2, name: 'important', parentId: 1 },
	{ id: 3, name: 'todo', parentId: 1 },
	{ id: 4, name: 'archive', parentId: 0 },
	{ id: 5, name: 'trash', parentId: 0 },
	{ id: 6, name: 'personal', parentId: 2 },
	{ id: 7, name: 'work', parentId: 2 },
];
console.log(hierarchy(folders));
