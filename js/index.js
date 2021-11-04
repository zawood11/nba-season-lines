const listTeams = () => document.getElementById("teams");

const renderTeam = (team) => {
    const div = document.createElement("div");
    div.id = `team ${team.teamId}`;
    div.className = 'team-div';

    const teamName = document.createElement("h2");
    teamName.textContent = team.fullName;

    const teamLogo = document.createElement("img");
    teamLogo.src = team.logo;

    const buttonOver = document.createElement("button")
    buttonOver.id = `team-${team.teamId}-over`
    buttonOver.className = 'team-line-over'
    buttonOver.textContent = 'OVER'

    const buttonUnder = document.createElement("button")
    buttonUnder.id = `team-${team.teamId}-under`
    buttonUnder.className = 'team-line-under'
    buttonUnder.textContent = 'UNDER'

    div.append(teamName, teamLogo, buttonUnder, buttonOver);
    listTeams().appendChild(div);
   
    console.log(team);
}

const displayTeams = (teams) => {
    teams.forEach(team => renderTeam(team));
    //console.log(teams);
}

const displayTeamLineInfo = (teamLineInfo) => {
    console.log(teamLineInfo);
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
.catch(err => {
	console.error(err);
});
    return fetch("http://localhost:3000/teamData")
.then(res => res.json())
.then(data => {
    const teamLineInfo = data;
    displayTeamLineInfo(teamLineInfo)
    //console.log(teamLineInfo);
    })
.catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", fetchTeams);
