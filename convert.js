const fs = require('fs');
const projects = require('./projects.json');
const moment = require('moment');
const users = require('./users.json');
const newUsers = require('./new-users.json');

const newProjects = projects.map(project => {
    const newProject = {};
    Object.keys(project).map(key => {
        const newKey = key.replace(/ \(S\)/, '').replace(/ \(BOOL\)/, '').replace(/ \(N\)/, '');
        if (project[key] && key.match(/ \(S\)/)) {
          newProject[newKey] = project[key];
        }
        if (project[key] && key.match(/ \(BOOL\)/)) {
          newProject[newKey] = project[key] == "true" ? true : false;
        }
        if (project[key] && key.match(/ \(N\)/)) {
          newProject[newKey] = parseInt(project[key]);
        }
    });

    newProject.timestamp = moment(newProject.createdAt).unix();

    // Find matching user
    const oldUser = users.find(user => user["id (S)"] === newProject.userId);
    if(!oldUser) return;
    const newUser = newUsers.find(user => user['name (S)'] === oldUser['name (S)']);
    if(!newUser) return console.error('New User not found.', oldUser);

    newProject.userId = newUser['id (S)'];

    return newProject;
}).filter(project => project);

fs.writeFileSync('new-prod-projects.json', JSON.stringify(newProjects, null, 2));