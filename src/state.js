/**

*/
function State( buildState ) {
    this.actual = buildState;
}


State.prototype.exec = function ( config ) {
    this.actual( config );
};


module.exports = State;
