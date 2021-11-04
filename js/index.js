const listTeams = () => document.getElementById("teams");

const renderTeam = (team) => {
    const div = document.createElement("div");
    div.id = `team ${team.teamId}`;
    div.className = 'team-div';

    const teamName = document.createElement("h2");
    teamName.textContent = team.fullName;

    const teamLogo = document.createElement("img");
    teamLogo.src = team.logo;

    const buttonOver = document.createElement("button");
    buttonOver.id = `team-${team.teamId}-over`;
    buttonOver.className = 'team-line-over';
    buttonOver.innerHTML = 'OVER<br>';

    const buttonUnder = document.createElement("button");
    buttonUnder.id = `team-${team.teamId}-under`;
    buttonUnder.className = 'team-line-under';
    buttonUnder.innerHTML = 'UNDER<br>';

    div.append(teamName, teamLogo, buttonUnder, buttonOver);
    listTeams().appendChild(div);
   
    console.log(team);
}

const renderTeamLine = (team) => {

    const teamLine = document.createElement("p");
    teamLine.id = `teamLine-${team.teamId}`;
    teamLine.className = 'teamLine';
    teamLine.textContent = team.teamLine;

    const grabTeamDiv = () => document.getElementById(`team ${team.teamId}`);
    grabTeamDiv(`team ${team.teamId}`).appendChild(teamLine);

    const grabButtonOver = () => document.getElementById(`team-${team.teamId}-over`);
    grabButtonOver(`team-${team.teamId}-over`).innerHTML += `${team.oddsOver}`;

    const grabButtonUnder = () => document.getElementById(`team-${team.teamId}-under`);
    grabButtonUnder(`team-${team.teamId}-under`).innerHTML += `${team.oddsUnder}`;
}

const displayTeams = (teams) => {
    teams.forEach(team => renderTeam(team));
}

const displayTeamLineInfo = (teamLineInfo) => {
    teamLineInfo.forEach(team => renderTeamLine(team))
    //console.log(teamLineInfo);
}

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

document.addEventListener("DOMContentLoaded", fetchTeams);