var crudConst = function(){
this.TEAM_TABLE = "FTSCP::Team";
this.PLAYER_TABLE = "FTSCP::Player";
this.SEQUENCE_TEAM = "FTSCP::teamId";
this.SEQUENCE_PLAYER = "FTSCP::pId";
this.UNDEFINED = "Object value(s) is undefined";
this.UNDEFINED_ID = "Id is not defined";
this.NOT_EXIST_TEAM = "Team with this ID is not exist";
this.GENERATE_ID_TEAM = `select "FTSCP::teamId".NEXTVAL as "ID" from dummy`;
};
