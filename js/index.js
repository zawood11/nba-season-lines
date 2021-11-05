const listTeams = () => document.getElementById("teams");

const renderTeam = (team) => {
    //create teamDiv container
    const div = document.createElement("div");
    div.id = `team ${team.teamId}`;
    div.className = 'team-div';

    //create teamname H2
    const teamName = document.createElement("h2");
    teamName.textContent = team.fullName;
    //create teamLogo Image

    const teamLogo = document.createElement("img");
    teamLogo.src = team.logo;

    //create buttonOver with initial text
    const buttonOver = document.createElement("button");
    buttonOver.id = `team-${team.teamId}-over`;
    buttonOver.className = 'team-line-over';
    buttonOver.innerHTML = 'OVER<br>';

    //create buttonUnder with intitial text
    const buttonUnder = document.createElement("button");
    buttonUnder.id = `team-${team.teamId}-under`;
    buttonUnder.className = 'team-line-under';
    buttonUnder.innerHTML = 'UNDER<br>';

    //add elements to div container
    div.append(teamName, teamLogo, buttonUnder, buttonOver);
    listTeams().appendChild(div);
   
    //console.log(team);
}

//add data from JSON server and event listeners & other actions moving forward
const renderTeamLine = (team) => {
    //grab elements
    const grabTeamDiv = () => document.getElementById(`team ${team.teamId}`);
    const grabButtonOver = () => document.getElementById(`team-${team.teamId}-over`);
    const grabButtonUnder = () => document.getElementById(`team-${team.teamId}-under`);

    //create teamLine element
    const teamLine = document.createElement("p");
    teamLine.id = `teamLine-${team.teamId}`;
    teamLine.className = 'teamLine';
    teamLine.textContent = team.teamLine;

    //insert teamLine between Over/Under buttons
    const insertAfter = (referenceNode, newNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    insertAfter(grabButtonUnder(`team-${team.teamId}-under`), teamLine);

    //add over/unders odds to button text
    grabButtonOver(`team-${team.teamId}-over`).innerHTML += `${team.oddsOver}`;
    grabButtonUnder(`team-${team.teamId}-under`).innerHTML += `${team.oddsUnder}`;

    //counter functions to increase counts on button click
    const plusOver = () => alert('clicked!');//team.countOver.value = parseInt(team.countOver.value) + 1;
    const plusUnder = () => alert('clicked!');

    //add eventlisteners to over/under buttons
    grabButtonOver(`team-${team.teamId}-over`).addEventListener('click', plusOver)
    grabButtonUnder(`team-${team.teamId}-under`).addEventListener('click', plusUnder)

    
    
}

//iterate over API team data and pass to renderTeam
const displayTeams = (teams) => {
    teams.forEach(team => renderTeam(team));
}

//iterate over JSON data and pass to renderTeamLine
const displayTeamLineInfo = (teamLineInfo) => {
    teamLineInfo.forEach(team => renderTeamLine(team))
    //console.log(teamLineInfo);
}

//fetch API & JSON data
const fetchTeams = () => {
    fetch("https://api-nba-v1.p.rapidapi.com/teams/league/standard", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"x-rapidapi-key": "eea0f00af2msh1d7263f0e338362p1c74e0jsn3f1c0b5b1925"
	}
})
.then(res => res.json())
.then(data => {
    const teams = data.api.teams.filter(team => team.nbaFranchise === "1" & team.allStar === "0")
    displayTeams(teams);
})
.then(() => fetch("http://localhost:3000/teamData"))
    .then(res => res.json())
    .then(data => {
        const teamLineInfo = data;
        //debugger
        displayTeamLineInfo(teamLineInfo)
        })
.catch(err => {
	console.error(err);
})
};

//Run fetch on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchTeams);