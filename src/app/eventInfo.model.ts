export class eventInfo {
	constructor(private player: String,
				private team: String, 
				private author: String, 
				private useDb: Boolean,
				private player_team_op: String,
				private team_author_op: String,
				private count: Number,
				private stream: String){

	}
}