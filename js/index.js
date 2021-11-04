// const renderTeam = (team) => {
//     const div = document.createElement("div");
//     div.id = `team ${team.teamId}`;
//     div.className = 'team-div';

//     const teamName = document.createElement("h2");
//     teamName.textContent = team.
// }

const displayTeams = (teams) => {
    //teams.forEach(team => renderTeam(team));
    console.log(teams);
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
}

fetchTeams();
